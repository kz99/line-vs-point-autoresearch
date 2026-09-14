# Literature and Theorem Map

This file is a navigation aid, not a substitute for the papers. Agents must cite exact theorem and lemma identifiers from the primary sources they actually use.

The active campaign extracts only the \(m=2\), prime-field content of these papers. General-dimensional lifting is standard downstream machinery and is not an active research target.

## Primary line-versus-point papers

### Arora--Sudan

Sanjeev Arora and Madhu Sudan, *Improved Low-Degree Testing and Its Applications*, Combinatorica 23 (2003), 365--426. DOI: [10.1007/s00493-003-0025-0](https://doi.org/10.1007/s00493-003-0025-0).

The foundational low-agreement analysis of the Rubinfeld--Sudan test. For this campaign, isolate its bivariate algebraic argument over \(\mathbb F_p\), including the use of Hilbert irreducibility and its field-size requirement. Its separate dimension-bootstrapping argument is historical context only.

### Harsha--Kumar--Saptharishi--Sudan (HKSS)

Prahladh Harsha, Mrinal Kumar, Ramprasad Saptharishi, and Madhu Sudan, *An Improved Line-Point Low-Degree Test*, arXiv:2311.12752. [Primary preprint](https://arxiv.org/abs/2311.12752).

This work replaces the black-box use of Hilbert irreducibility with a more direct bivariate factorization/interpolation analysis. Kominers--Thaler--Zheng estimate the resulting bivariate low-agreement exponent as \(1/7\); that numerical extraction should be attributed to KTZ unless independently rederived. The later lift to general dimension is routine for present purposes and is not assigned to agents.

### Kominers--Thaler--Zheng (KTZ)

Scott Duke Kominers, Justin Thaler, and Kai Zhe Zheng, *Improved Soundness for the Line--versus--Point Test*, ECCC TR26-147, revision 1 (2026). [Primary report](https://eccc.weizmann.ac.il/report/2026/147/).

The current benchmark proves a cubic threshold \(C(d/q)^{1/3}\) over every finite field, hence in particular \(C(d/p)^{1/3}\) on \(\mathbb F_p^2\), with global agreement at least a constant times the local agreement. The campaign uses only this bivariate prime-field specialization. Submissions should identify exactly which combinatorial or algebraic step forces the exponent \(1/3\).

## Adjacent foundations

- Ronitt Rubinfeld and Madhu Sudan, *Robust Characterizations of Polynomials with Applications to Program Testing*, SIAM Journal on Computing 25 (1996). This is the test's foundational high-agreement setting.
- Ran Raz and Shmuel Safra, *A Sub-Constant Error-Probability Low-Degree Test, and a Sub-Constant Error-Probability PCP Characterization of NP*, STOC 1997. This is a plane-based comparison and must not be conflated with line-versus-point.
- Irit Dinur, Prahladh Harsha, Rakesh Venkat, and Henry Yuen, *Multiplayer Parallel Repetition for Expanding Games*, including the low-degree-test context where relevant. Use only exact statements that apply to the chosen test distribution.

## Questions the campaign should track

1. Which inequality in the KTZ bivariate argument creates the cubic threshold?
2. Is the loss algebraic, combinatorial, or caused by converting average line agreement into a structured set of points/directions?
3. Can multiplicity-sensitive interpolation, Hasse derivatives, or separability arguments reduce the loss?
4. Can a direct argument using the geometry of \(\mathbb F_p^2\) avoid a lossy intermediate lemma?
5. What examples show that a threshold below \(\Theta(d/p)\) is impossible?
6. Which statements fail in small prime characteristic, for \(d\ge p\), or when affine-line sampling is changed?

## Citation policy

- Record the paper, version/date, theorem or lemma number, hypotheses, and the exact role of every imported result.
- Mark any reconstructed exponent as a derivation rather than a quoted theorem.
- Do not cite survey prose for a decisive lemma when the primary paper is available.
- Do not include paper PDFs in Git. `scripts/fetch_references.py` can populate a local ignored cache for research use.
