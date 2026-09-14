# The bivariate prime-field cubic bottleneck: support sensitivity and a modal obstruction

## Abstract

For the affine line-versus-point test on `F_p²`, the KTZ cubic threshold comes from one precise chain:

`|R| = O(p/ε)`, `D = Θ(sqrt(d|R|))`, and `D = O(εp)`.

The first relation is the selected-line cost, the second is weighted interpolation, and the third is simultaneously required for identity extension, deletion of nonsimple incidences, and root lifting. Their combination is `ε³ = Ω(d/p)`.

Retaining the fraction σ of lines supporting an accepted carrier of edge mass δ gives the sharper proved relation `δ³ = Ω(dσ/p)`. In particular, σ=O(δ) gives a conditional exponent `1/2`, but not an unconditional benchmark improvement. In the prime regime, I also prove that the primitive squarefree interpolant satisfies `gcd(B,B_Z)=1`, so KTZ's generic directional derivative can be replaced by the vertical derivative.

Finally, I give a legal obstruction at ambient degree `d=101`: modal constant line labels can attain local agreement `Θ(log p/(p log log p))` while every total-degree-at-most-101 polynomial has agreement below `2/p`. Thus a uniform exact threshold `C d/p` with global agreement `Ω(ε)` is false. This obstruction remains below every fixed-η trigger `(d/p)^(1−η)`.

## Test and Notation

Fix a prime `p` and an integer `101≤d<p`; the dimension is exactly two. Let `L` range uniformly over the `p(p+1)` affine lines of `F_p²`, and then let `x` range uniformly over the `p` points of `L`. This is uniform sampling from the `p²(p+1)` incidences and is equivalent to first choosing `x` uniformly and then an incident line uniformly.

The point table is an arbitrary function `f:F_p²→F_p`. Each line has a univariate polynomial label `P_L` of degree at most `d`. All global degrees below are total degrees. Define

`ε = Pr_{L,x∈L}[P_L(x)=f(x)]`

and

`Agr_d(f) = max_{Q: total-degree(Q)≤d} Pr_x[Q(x)=f(x)]`.

An accepted carrier is any set `E*` of accepted incidences. Write

`δ = |E*|/[p²(p+1)]`,  `T = projection of E* to lines`,  `σ = |T|/[p(p+1)]`.

Necessarily `0<δ≤σ≤1`. Taking all accepted incidences gives `δ=ε`; a carrier with `δ≥ε/2` retains a constant fraction of the test acceptance.

## Prior Results

The primary benchmark is [Kominers–Thaler–Zheng, ECCC TR26-147, Revision 1](https://eccc.weizmann.ac.il/report/2026/147/revision/1/download/). Its Theorem 1.1, specialized to the present regime, states that absolute constants `C,c>0` give global agreement at least `cε` when `ε≥C(d/p)^(1/3)`. The theorem statement hides the constants. The bivariate proof in Sections 3–6 explicitly closes with recovery `ε/8000`.

The source chooses `k0=floor(εp/100)`, `k1=floor(εp/1000)`, a selected line set of size `O(p/ε)`, and

`D = 16(floor(sqrt(d|R|))+1)`.

Revision 1 uses a squarefree primitive polynomial, a generic directional derivative, and a resultant; it does not use a discriminant in the bivariate proof. The constant `10^15` below is my conservative reconstruction for a support-sensitive variant, not a constant quoted from Theorem 1.1. The older cached base report and Revision 1 must not be conflated.

The Newton step is consistent with [Harsha–Kumar–Saptharishi–Sudan, arXiv:2311.12752v1](https://arxiv.org/abs/2311.12752), especially Lemma 2.10, but the needed lifting argument is reproduced below. No Arora–Sudan theorem is used as a black box.

The active durable corpus was also audited. All eight active leaderboard files were empty, and there were no completed submissions or verifier-audit files to inherit. The [data manifest](/Users/kaizheng/Documents/ChatGPT/Line-vs-Point/research_state/DATA_MANIFEST.json) is a pre-launch snapshot relative to the live campaign state, so it was treated as provenance rather than mathematical evidence. Every directory named `superseded` was excluded.

## Theorem

**Theorem A — support-sensitive KTZ closure.** Let `p` be prime, `101≤d<p`, and let an accepted carrier have parameters `(δ,σ)`. Put `K=10^15`. If

`δ³ ≥ K dσ/p`,

then there is a polynomial `Q∈F_p[X,Y]` of total degree at most `d` with

`Pr_x[Q(x)=f(x)] ≥ δ/8000`.

Thus, if `δ≥ε/2`, the conclusion is at least `ε/16000`. With all accepted edges and σ≤1, the sufficient threshold is `ε≥10^5(d/p)^(1/3)`. Under the additional structural condition `σ≤Aδ`, it becomes the conditional square-root threshold `δ≥sqrt(10^15 A d/p)`.

**Lemma B — prime vertical derivative.** If `B∈F_p[X,Y,Z]` is squarefree, primitive as a polynomial in `Z`, and has total degree below `p`, then `gcd(B,B_Z)=1`.

**Theorem C — modal obstruction at the legal lower boundary.** Let `d=101`, `N=(d+1)(d+2)/2=5253`, and

`r=floor(log p/(4 log log p))`.

For every sufficiently large prime, explicitly every prime `p≥max{⌈e^32⌉,100N²}`, there are a point table and constant line labels, hence labels of degree at most 101, such that

`r/(130p) ≤ ε ≤ 50r/p`,  while  `Agr_101(f)<2/p`.

Consequently, for every fixed `C,c>0`, arbitrarily large primes admit `ε≥C·101/p` but `Agr_101(f)<cε`.

**Proposition D — near-p information baseline.** For every `101≤d<p` and every point table,

`Agr_d(f) ≥ (d+1)(d+2)/(2p²)`.

## Proof or Conditional Proof

**[P1] (proved) Carrier pruning.** Set `k0=floor(δp/100)`. Iteratively delete point vertices and line vertices whose current carrier degree is below `k0`. Point deletions remove at most `p²k0` edges and line deletions at most `p(p+1)k0` edges. In normalized incidence measure the loss is at most

`k0/(p+1)+k0/p < δ/50`.

Keep the weaker bound that the remaining graph `G0` has edge mass at least `δ/4`. It has minimum degree `k0`; its line set `L0` has normalized measure λ satisfying `δ/4≤λ≤σ`.

**[P2] (proved) Support-sensitive selector.** Select each line of `L0` independently with probability `θ=8/k0`. The hypothesis and `σ≥δ` imply

`δ²≥10^15 d/p`,  `δp≥sqrt(10^15dp)>3·10^9`,

so `k0≥δp/200`. For a fixed `L∈L0`, coverage indicators at distinct neighbors of `L` depend on disjoint sets of other lines. Each has success probability above `3/4`; Hoeffding therefore bounds failure to cover half the neighbors by `exp(−k0/8)`. Since `k0≥8 log(4p(p+1))`, a union bound over all affine lines costs less than `1/4`.

If `r=|R|`, then `E[r]=θ|L0|≥200(p+1)` and `Var(r)≤E[r]`. Chebyshev puts `r` between half and twice its mean with failure below `1/4`. Some deterministic selection consequently satisfies both coverage and

`100(p+1)≤r≤16|L0|/k0≤6400σp/δ`.

These are the only Hoeffding, selector union, and Chebyshev losses.

**[P3] (proved) Weighted interpolation.** Give `X,Y,Z` weights `1,1,d` and set

`D=16(floor(sqrt(dr))+1)`.

Then `D²>256dr` and KTZ's monomial count gives `dim(V_D)≥D³/(64d)>r(D+1)`. Each formal identity `A(L(t),P_L(t))=0` imposes at most `D+1` coefficient equations, so a nonzero interpolant exists. Moreover,

`D≤1280 sqrt(dσp/δ)+16≤1280δp/sqrt(10^15)+16<δp/10000`.

Thus `D<p`, `D<k0/2`, and, for `k1=floor(δp/1000)`, `D<k1/2`. Also `r>D`. A nonzero `Z`-independent polynomial of degree at most `D` cannot vanish identically on more than `D` affine lines, so `A_Z≠0`. Choosing minimum weighted degree removes repeated factors and makes `A` squarefree.

**[P4] (proved) Identity extension and formal content removal.** Every `L∈L0` has more than `k0/2>D` distinct accepted points that also lie on selected accepted lines. At each such point the two line labels equal the same value `f(x)`. Hence the degree-at-most-`D` polynomial `A(L(t),P_L(t))` has more than `D` distinct roots and is identically zero.

Write `A=H(X,Y)B(X,Y,Z)`, where `H` is the gcd of the coefficients in `Z`. At most `deg(H)≤D` base lines satisfy `H|_L=0` identically. On every other retained line, `H(L(t))B(L(t),P_L(t))=0` in the integral domain `F_p[t]`; hence `B(L(t),P_L(t))=0`. This is formal polynomial division, not division by values of `H`. No root multiplicities are counted.

**[P5] (proved) Prime vertical-derivative lemma.** Factor the squarefree primitive polynomial as `B=c∏P_i` into distinct irreducibles over `F_p`. Primitivity implies that every `P_i` genuinely depends on `Z`. Since `deg_Z(P_i)<p`, its derivative `(P_i)_Z` is nonzero, and its smaller degree implies `P_i` does not divide `(P_i)_Z`. Modulo `P_i`,

`B_Z = (P_i)_Z ∏_{j≠i}P_j ≠0`.

Thus no irreducible factor of `B` divides `B_Z`, proving `gcd(B,B_Z)=1`. No irreducibility over the algebraic closure is required. This replaces, in the prime-field regime only, KTZ's generic directional derivative.

**[P6] (proved) Degenerate-root deletion.** Apply KTZ's resultant line bound to the coprime pair `(B,B_Z)`. Delete the at most `D` content lines, at most `D(D−1)` lines on which the two graph identities degenerate together, and at most `D` zeros of `B_Z(L(t),P_L(t))` on every other line. Their total normalized edge mass is bounded by

`D/[p(p+1)] + D(D−1)/[p(p+1)] + D/p < δ/16`.

Pruning both sides at degree `k1=floor(δp/1000)` costs at most

`k1/(p+1)+k1/p<δ/500`.

The surviving graph `G1` has edge mass at least `δ/8`, minimum degree `k1`, and `B_Z(x,f(x))≠0` at every surviving point. No discriminant or Markov inequality appears.

**[P7] (proved) Hensel lifting and propagation.** At a surviving point translate the base coordinates to `(0,0)` and put `α=f(0,0)`. In `F_p[[X,Y]]`, construct a root `Φ=α+Φ_1+Φ_2+…` recursively by homogeneous degree. At stage `j`, the degree-`j` residual is canceled uniquely by division by the scalar `B_Z(0,0,α)`. Thus no factorial is inverted.

Every incident line polynomial is the same unique root after restriction to that line. There are more than `D` incident directions. Therefore every homogeneous part `Φ_j` with `d<j≤D` vanishes on more than `D≥j` projective directions and is zero. Let `Q` be the truncation through degree `d`. The polynomial `B(X,Y,Q)` has degree at most `D` and all terms through degree `D` vanish, so it is identically zero. Simple-root uniqueness propagates the same `Q` across every edge of the connected component, and `Q=f` at all of its point vertices.

**[P8] (proved) Component mixing and recovery.** For a component let `a,b,e` denote its normalized point, line, and edge measures. Put `κ=k1/p` and `u=1/sqrt(p+1)`. Minimum degree and point-line mixing give

`e≥κa/2`,  `e≥κb`,  and  `e≤ab+u sqrt(ab)`.

The theorem hypothesis gives `u<δ/8000≤κ/4`. If `a<κ/4`, the last two inequalities imply `9b≤a`, which contradicts the first inequality. If `b<κ/4`, they imply `a≤b`, which contradicts `e≥κb`. Hence `a,b≥κ/4≥δ/8000`. The polynomial from [P7] therefore has global agreement at least `δ/8000`. This is the sole incidence Cauchy–Schwarz loss.

**[P9] (proved) Exact cubic reconstruction.** The dominant scales are

`r=O(σp/δ)`,  `D=O(sqrt(dσp/δ))`,  `D=O(δp)`.

The first two give the interpolation degree; the last is independently demanded by identity extension, the `D/p` bad-incidence term, and lifting. Squaring the final comparison yields exactly `δ³=Ω(dσ/p)`. The resultant term `D²/p²` alone needs only `δ²=Ω(dσ/p)`, and mixing needs only `δ=Ω(p^−1/2)`; both are weaker here. For σ=1 this is the KTZ cubic exponent.

**[P10] (conditional) Concentrated-carrier exponent.** If additionally `σ≤Aδ`, [P9] becomes `δ²=Ω(Ad/p)`, giving exponent `1/2`. Since every carrier has `σ≥δ`, this support-sensitive interpolation balance cannot exceed exponent `1/2`. This is not an unconditional improvement of the benchmark.

**[P11] (proved) Modal occupancy lower bound.** For Theorem C choose all `p²` point values independently and uniformly. On a fixed line let `N_a` be the occupancy of value `a`, `M=max_a N_a`, and `Y=Σ_a 1[N_a=r]`. For one value,

`Pr[N_a=r] = binom(p,r)p^(−r)(1−1/p)^(p−r) ≥ 1/(8r!)`.

Here `r²≤p`, `(1−1/p)^p≥1/4`, and `r!≤r^r≤p^(1/4)`. Thus `μ=E[Y]≥p^(3/4)/8≥1`. For distinct values, the joint probability of both occupancies equaling `r` is at most `1/(r!)²`, at most 64 times the product of the lower bounds. Hence `E[Y²]≤μ+64μ²≤65μ²`. Cauchy–Schwarz, equivalently the zero-threshold Paley–Zygmund argument, gives `Pr[Y>0]≥1/65`, so `E[M]≥r/65`.

Give each line a modal constant label. By linearity of expectation across lines—no line independence is asserted—the local agreement `A` satisfies `E[A]≥r/(65p)`.

**[P12] (proved) Modal upper concentration.** A factorial-moment union bound gives

`Pr[M≥s]≤p/s!≤p(e/s)^s`.

For `s0=ceil(4 log p/log log p)`, the tail sums to less than one and `E[M]≤s0+1≤25r`; hence `E[A]≤25r/p`. Changing one point value changes the modal count on only its `p+1` incident lines and changes `A` by at most `1/p²`. McDiarmid therefore gives

`Pr[A>50r/p]≤exp(−1250r²)≤r/(520p)`.

No Markov inequality is used.

**[P13] (proved) Global union bound and deterministic instance.** There are `p^N` formal total-degree-at-most-101 polynomials, with `N=5253`. For fixed `Q`, its agreement count with random `f` is `Bin(p²,1/p)`, of mean `p`. Chernoff gives

`Pr[agreements(Q,f)≥2p]≤(e/4)^p`.

Union over all `p^N` polynomials gives `p^N(e/4)^p≤exp(−p/4)≤r/(520p)` under the stated lower bound on `p`. Let `G` be the event that all global agreements are below `2/p`, and `H={A≤50r/p}`. Since `0≤A≤1`,

`E[A·1_{G∩H}] ≥ r/(65p)−r/(520p)−r/(520p) > r/(130p)`.

Some deterministic table in `G∩H` therefore has all three bounds in Theorem C.

**[P14] (refuted) Uniform exact-linear soundness.** Suppose constants `C,c>0` made `ε≥Cd/p` imply `Agr_d(f)≥cε` uniformly. Fix the legal ambient cap `d=101` and choose a sufficiently large prime with `r≥max{130·101C,260/c}`. Theorem C then has `ε≥C·101/p` but `Agr_101(f)<2/p<cε`, a contradiction. Thus the exact-linear statement is false. On the other hand, for each fixed `η>0`,

`ε/(101/p)^(1−η) ≤ 50r/[101^(1−η)p^η] → 0`,

so this construction does not refute a fixed-η target.

**[P15] (proved) Near-p information set.** Choose distinct `a_0,…,a_d` and `b_0,…,b_d` and the triangular set `S={(a_i,b_j):i+j≤d}`. The Newton products `∏_{h<i}(X−a_h)∏_{k<j}(Y−b_k)` with `i+j≤d` form a triangular evaluation basis on `S`. Hence arbitrary prescribed values on all `|S|=(d+1)(d+2)/2` points extend to a total-degree-at-most-`d` polynomial. Applying this to `f|_S` proves Proposition D. In particular, the lower bound is `(p+1)/(2p)` at `d=p−1` and `5253/10609` at `d=101,p=103`.

**[P16] (proved) Diffuse support need not concentrate.** Fix the legal ambient `d≥101`, take `f=0`, and on every line choose a degree-`d` label with `d` distinct prescribed parameter roots. Then `ε=d/p` and every line supports acceptance, so `σ=1`; nevertheless `Q=0` agrees globally everywhere. Thus local density does not imply `σ=O(ε)`, although this example is harmless for soundness.

**[P17] (refuted as an obstruction) Concentrated good directions.** Let `f` be a product of `d+1` distinct homogeneous linear forms. In each of the corresponding `d+1` projective directions, every affine-line restriction loses its degree-`d+1` leading term and is a legal degree-`d` label. This gives local mass about `(d+1)/(p+1)`. But `Q=0` agrees on the union of the same `d+1` lines through the origin, a Θ(d/p) fraction. The attempted counterexample already contains the required global polynomial.

**[P18] (refuted safety of omitting simplicity) Branch collision.** For odd `p` and legal ambient cap `d≥101`, `B=Z²−X²` is squarefree but its two legal branches `Q=X` and `Q=−X` meet at the origin, where `B_Z=0`. Agreement at that incidence cannot select a branch. Vertical-simple-root deletion is therefore logically necessary.

**[P19] (refuted as an active obstruction) Inseparability.** A polynomial with vanishing `Z`-derivative must use positive `Z`-exponents divisible by `p`. Since the interpolant has weighted degree `D<p`, no such exponent occurs. Examples such as `Z^p−G` lie outside the interpolation space and do not obstruct the prime-field proof.

## Exponent Ledger

| Stage | Scale or loss | Consequence |
|---|---|---|
| Carrier pruning | `<δ/50`, retained as `δ/4` | Constant only |
| Selector probability | Hoeffding `e^(−k0/8)`, union over `p(p+1)` | No δ-power loss |
| Selector size | Chebyshev; `r≤6400σp/δ` | One factor `σ/δ` |
| Interpolation | `dim(V_D)≈D³/d` versus `rD` constraints | `D≈sqrt(dr)` |
| Root budget | `D≤Θ(δp)` | `δ³=Ω(dσ/p)` |
| Content/resultant deletion | `D/p + D²/p²` | Cubic plus a weaker quadratic gate |
| Second pruning | `<δ/500` | Constant only |
| Mixing | One Cauchy–Schwarz error `p^−1/2` | Weaker than cubic for `d≥101` |
| Recovery | Component point density `δ/8000` | Linear global recovery |
| Diffuse carrier | `σ=1` | Exponent `1/3` |
| Concentrated carrier | `σ≤Aδ` | Conditional exponent `1/2` |
| Modal occupancy | `r≈log p/(4 log log p)` | Local `Θ(r/p)` |
| Polynomial union | `p^5253(e/4)^p` | Global `<2/p` |
| Exact-linear claim | Ratio at most `260/r` | Tends to zero; exponent 1 with constant threshold is false |

There is no hidden Markov loss. The only probabilistic inequalities are the selector's Hoeffding, union, and Chebyshev bounds; the modal occupancy second moment, factorial union, and McDiarmid bound; and the global Chernoff union. The sole incidence Cauchy–Schwarz loss is the `p^−1/2` mixing error.

## Counterexample Attempts

The successful adversarial table is Theorem C: it is diffuse across lines and exploits the maximum occupancy among `p` symbols, not low characteristic or a small exceptional direction set. It proves that the campaign's possible sharp threshold cannot literally be a constant multiple of `d/p` with linear recovery.

The all-lines prescribed-root table [P16] shows why line-support concentration cannot be assumed. The homogeneous-direction construction [P17] fails because its zero set already supplies a global polynomial. The branch collision [P18] validates the simple-root deletion. The inseparable attempt [P19] is excluded by `D<p`. Proposition D handles `d` near `p`; it is a positive agreement baseline, not an obstruction.

## Characteristic Audit

- The field is exactly the prime field `F_p`; no extension-field descent is used.
- The ambient degree always satisfies `101≤d<p`. Constant or linear objects appearing inside examples are legal labels or branches under that ambient cap; no test with parameter `d≤100` is analyzed.
- Because `D<p`, the characteristic-pruned weighted monomial set equals the full weighted ball: every positive `Z`-exponent is strictly below `p`.
- Lemma B rules out inseparable vertical factors after content removal. Absolute irreducibility is unnecessary.
- KTZ's source proof uses a generic directional derivative. The replacement by `B_Z` is a new prime-field simplification and causes no exponent gain.
- No discriminant is used. The resultant is invoked only for the proved coprime pair `(B,B_Z)`.
- Division by `H` occurs only as an integral-domain inference on non-content lines. Hensel lifting divides only by a nonzero scalar `B_Z(x,f(x))`.
- All interpolation constraints are coefficient identities, and every later root count uses distinct points or directions rather than multiplicity.
- When `d` is near `p`, Theorem A's premise is vacuous because `σ≥δ` would force `p≥10^15d`; Proposition D supplies the appropriate direct check.

## Limitations

The general KTZ benchmark is not improved: the exponent `1/2` conclusion requires the additional hypothesis `σ=O(δ)`, and diffuse carriers can have `σ=1`. The constant `10^15` is deliberately conservative and is not claimed optimal.

The modal obstruction refutes a uniform constant-times-`d/p` trigger but not any fixed exponent `1−η`. It instead shows that an exponent-1 formulation must include a subpolynomial occupancy allowance, at least on the order of `log p/log log p` when `d=101`.

The current selector has an upper bound `O(σp/δ)`, whereas covering more than `k0/2` points on one line requires at least `Ω(δp)` distinct witness lines. Closing this gap demands a new combinatorial or algebraic idea. No computation, higher-dimensional lifting, extension field, or individual-degree substitution is used here.
