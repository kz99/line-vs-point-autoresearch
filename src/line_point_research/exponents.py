from __future__ import annotations

from fractions import Fraction


def parse_rational_exponent(value: str) -> Fraction:
    normalized = value.strip().replace(" ", "")
    if normalized in {"1-o(1)", "1−o(1)"}:
        raise ValueError("asymptotic exponent is not a fixed rational")
    return Fraction(normalized)


def is_stronger_fixed_exponent(claimed: str, benchmark: str = "1/3") -> bool:
    """For 0 < d/q < 1, a larger fixed exponent gives a lower threshold."""
    return parse_rational_exponent(claimed) > parse_rational_exponent(benchmark)
