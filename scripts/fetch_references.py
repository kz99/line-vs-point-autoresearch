#!/usr/bin/env python3
"""Fetch open primary-source PDFs into a local, git-ignored cache."""

from __future__ import annotations

import hashlib
import json
import shutil
import subprocess
import urllib.request
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CACHE = ROOT / ".cache" / "references"
SOURCES = {
    "arora-sudan.pdf": "https://www.cs.princeton.edu/~arora/pubs/ld.pdf",
    "hkss.pdf": "https://arxiv.org/pdf/2311.12752",
    "ktz.pdf": "https://eccc.weizmann.ac.il/report/2026/147/download/",
}


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main() -> None:
    CACHE.mkdir(parents=True, exist_ok=True)
    records = []
    for name, url in SOURCES.items():
        target = CACHE / name
        request = urllib.request.Request(url, headers={"User-Agent": "line-point-autoresearch/0.1"})
        with urllib.request.urlopen(request, timeout=60) as response:
            target.write_bytes(response.read())
        record = {"path": str(target.relative_to(ROOT)), "url": url,
                  "bytes": target.stat().st_size, "sha256": digest(target)}
        if shutil.which("pdftotext"):
            text_target = target.with_suffix(".txt")
            subprocess.run(["pdftotext", "-layout", str(target), str(text_target)], check=True)
            record["text_path"] = str(text_target.relative_to(ROOT))
        records.append(record)
    (CACHE / "manifest.json").write_text(json.dumps(records, indent=2, sort_keys=True) + "\n")
    print(CACHE / "manifest.json")


if __name__ == "__main__":
    main()
