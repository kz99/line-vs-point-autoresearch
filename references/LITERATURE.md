# Literature and Theorem Map

This file is a navigation aid, not a substitute for the papers. Agents must cite exact theorem and lemma identifiers from the primary sources they actually use.

## Primary line-versus-point papers

### Arora--Sudan

Sanjeev Arora and Madhu Sudan, *Improved Low-Degree Testing and Its Applications*, Combinatorica 23 (2003), 365--426. DOI: [10.1007/s00493-003-0025-0](https://doi.org/10.1007/s00493-003-0025-0).

The foundational low-agreement analysis of the Rubinfeld--Sudan test. It combines a low-dimensional algebraic argument, including Hilbert irreducibility, with a dimension-bootstrapping argument. Its field-size requirement is polynomially larger than the degree/agreement parameters.

### Harsha--Kumar--Saptharishi--Sudan (HKSS)

Prahladh Harsha, Mrinal Kumar, Ramprasad Saptharishi, and Madhu Sudan, *An Improved Line-Point Low-Degree Test*, arXiv:2311.12752. [Primary preprint](https://arxiv.org/abs/2311.12752).

This work replaces the black-box use of Hilbert irreducibility with a more direct bivariate factorization/interpolation analysis and gives a simpler lift from two variables to general dimension. Kominers--Thaler--Zheng estimate the resulting low-agreement exponent as \(1/48\) for general \(m\) and \(1/7\) for \(m=2\); those numerical exponent extractions should be attributed to KTZ unless independently rederived.

### Kominers--Thaler--Zheng (KTZ)

Scott Duke Kominers, Justin Thaler, and Kai Zhe Zheng, *Improved Soundness for the Line--versus--Point Test*, ECCC TR26-147, revision 1 (2026). [Primary report](https://eccc.weizmann.ac.il/report/2026/147/).

The current benchmark proves a cubic threshold \(C(d/q)^{1/3}\) over every finite field, with global agreement at least a constant times the local agreement. The proof isolates a combinatorial mechanism and an algebraic mechanism; campaign submissions should identify exactly which step currently forces the exponent \(1/3\).

## Adjacent foundations

- Ronitt Rubinfeld and Madhu Sudan, *Robust Characterizations of Polynomials with Applications to Program Testing*, SIAM Journal on Computing 25 (1996). This is the test's foundational high-agreement setting.
- Ran Raz and Shmuel Safra, *A Sub-Constant Error-Probability Low-Degree Test, and a Sub-Constant Error-Probability PCP Characterization of NP*, STOC 1997. This is a plane-based comparison and must not be conflated with line-versus-point.
- Irit Dinur, Prahladh Harsha, Rakesh Venkat, and Henry Yuen, *Multiplayer Parallel Repetition for Expanding Games*, including the low-degree-test context where relevant. Use only exact statements that apply to the chosen test distribution.

## Questions the campaign should track

1. Which inequality in the KTZ bivariate argument creates the cubic threshold?
2. Is the loss algebraic, combinatorial, or caused by converting average line agreement into a structured set of points/directions?
3. Can multiplicity-sensitive interpolation, Hasse derivatives, or separability arguments reduce the loss?
4. Can the general-\(m\) bootstrapping preserve an improved bivariate exponent?
5. What examples show that a threshold below \(\Theta(d/q)\) is impossible?
6. Which statements fail in small characteristic, for \(d\ge q\), or when affine-line sampling is changed?

## Citation policy

- Record the paper, version/date, theorem or lemma number, hypotheses, and the exact role of every imported result.
- Mark any reconstructed exponent as a derivation rather than a quoted theorem.
- Do not cite survey prose for a decisive lemma when the primary paper is available.
- Do not include paper PDFs in Git. `scripts/fetch_references.py` can populate a local ignored cache for research use.
