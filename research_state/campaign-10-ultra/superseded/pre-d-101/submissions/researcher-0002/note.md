# An Occupancy Counterexample and a Sharp Affine-Plane Sparsification Barrier

## Abstract

The cubic benchmark is not improved. Instead, two bottlenecks are resolved negatively. First, the parameter range in the workspace, $0≤d<p$, makes the advertised theorem false at $d=0$: for all sufficiently large primes there are constant line tables with local agreement $Ω(log p/(p log log p))$ while every global constant agrees on only $O(1/p)$ of the plane. A union bound over all degree-$d$ polynomials extends this obstruction to a growing positive-degree regime and refutes a bare $C d/p$ threshold with linear global agreement, although it does not refute the fixed-$η$ target $(d/p)^{1-η}$.

Second, an explicit genuine degree-$(k-1)$ line table realizes a regular accepted-incidence graph for which every KTZ-style family that witnesses a constant fraction of the accepted incidences must contain $Ω(p/ε)$ lines. Thus the concentration size used by KTZ is optimal if the step sees only the accepted graph. Combining that unavoidable size with their interpolation degree and root budget reproduces the cubic barrier. Any exponent improvement must therefore exploit the polynomial labels before or during sparsification.

## Test and Notation

Fix dimension $m=2$ and a prime $p$. Let $L_p$ be the $p(p+1)$ affine lines of $F_p^2$. Each line has $p$ points, so there are $p^2(p+1)$ incident pairs. Sampling is exactly uniform in $L∈L_p$ and then uniform in $x∈L$.

For a point table $f:F_p^2→F_p$ and line polynomials $P_L$ of degree at most $d<p$, write

$$
a=Pr_{L,x∈L}[P_L(x)=f(x)]
$$

for actual local agreement, and

$$
δ_d(f)=max_{deg Q≤d}Pr_x[Q(x)=f(x)]
$$

for best total-degree-$d$ global agreement. No individual-degree convention is used.

For an accepted incidence graph $E$, a KTZ-style family $R$ covers an accepted edge $(x,L)$ only when there is another line $M∈R\{L}$ with $(x,M)∈E$. This exclusion of $L$ itself is the witness convention in KTZ Lemma 3.2.

## Prior Results

[KTZ Theorem 1.1](https://eccc.weizmann.ac.il/report/2026/147/revision/1/download) states the cubic threshold over arbitrary finite fields and arbitrary line tables. In its bivariate proof the final agreement is explicitly at least $ε/8000$. Its concentration step is Lemma 3.2: after pruning to minimum degree $k_0=Θ(εp)$, it samples a line family of size $O(p/ε)$ that reaches more than half the accepted points on every surviving line. Section 4 then takes $D=Θ(sqrt(d|R|))$, and Lemma 4.1 requires $D<Θ(εp)$.

The exponent $1/3$ is my reconstruction from those quoted lemmas, not a separately quoted KTZ statement:

$$
|R|=O(p/ε),\quad D=O(sqrt(dp/ε)),\quad D=O(εp)
$$

imply $ε^3=Ω(d/p)$. The Chernoff union bound in Lemma 3.2 only requires $εp=Ω(log p)$ and does not itself create the cubic power.

There is a scope defect at $d=0$. No positive-degree hypothesis appears before the printed theorem, but KTZ Lemma 2.2 uses $D^3/(64d)$ and its proof uses $D/(2d)$. With Z-weight zero, its monomial set is not the intended finite interpolation space. Accordingly, the KTZ theorem is safe to cite here only for $1≤d<p$.

[HKSS Theorem 4.2](https://arxiv.org/html/2311.12752v1) assumes positive $d$ and $q>C d/ε^7$, and states a bivariate polynomial with $Ω(ε^4)$ agreement. This is historical context only. The arXiv record has only v1, dated 21 November 2023; its proof contains quantitative bookkeeping issues that should be resolved before its output exponent is reused.

At the final corpus audit, 2026-09-14 06:08:39 UTC, both campaigns had empty verified, promising, rejected, and bottleneck boards, and there were no completed responses or verifier audits. Four ten-agent jobs were running. Thus there was no prior mathematical submission to import. DATA_MANIFEST described the pre-run state and was stale during this live execution.

## Theorem

**Theorem A — uniform occupancy obstruction (proved).** Let

$$
λ=log(4/e),\qquad r_p=floor(log p/(4log log p)),\qquad K_d=(d+1)(d+2)/2.
$$

For every prime $p≥e^{16}$ and every $0≤d<p$ satisfying

$$
K_d log p≤λp/2,
$$

there exist $f:F_p^2→F_p$ and a degree-at-most-$d$ line table such that

$$
a≥r_p/(4p),\qquad δ_d(f)≤2/p.
$$

Hence $δ_d(f)/a≤8/r_p=o(1)$.

In particular:

1. At $d=0$, the benchmark hypothesis $a≥C(d/p)^{1/3}$ is automatic, yet its linear global-agreement conclusion fails.
2. Taking $d_p=floor(sqrt(r_p))$ gives $d_p→∞$, $a/(d_p/p)→∞$, and $δ_{d_p}/a→0$. Thus no absolute $C,c>0$ can make the bare implication $a≥C d/p⇒δ_d≥ca$ valid over the whole positive-degree range.
3. For every fixed $η>0$, this construction has $a=o((d_p/p)^{1-η})$, so it does not refute the campaign's fixed-$η$ near-linear target.

**Theorem B — degree-zero spectral repair (proved).** For every prime $p$, every point table, and every degree-zero line table,

$$
δ_0(f)≥a-1/sqrt(p+1).
$$

Consequently, if $a≥2/sqrt(p+1)$ then some constant polynomial agrees with $f$ on at least $a/2$ of the plane.

**Theorem C — incidence-only sparsification barrier (proved).** Let $p$ be prime, $1≤k≤p$, $d=k-1$, and $0<γ≤1$. There is a genuine degree-$d$ line-versus-point table with

$$
a=ε_k=k/(p+1),\qquad δ_d=k/p,
$$

whose accepted graph is $k$-regular between all $p^2$ points and the $p^2$ finite-slope lines. If $k≥2$ and $R$ witnesses at least a $γ$ fraction of all accepted incidences—or at least $γk$ incidences on every accepted line—then

$$
|R|≥γp^2/(k-1)≥γp/ε_k.
$$

For $k=1$, no accepted edge has an alternative accepted-line witness at all.

## Proof

**[P1, proved] Modal line labels reduce the local test to occupancy.** Choose $f$ uniformly from all functions $F_p^2→F_p$, independently at every point. On each line $L$, let $M_L$ be the largest multiplicity of a field value among the $p$ values of $f|_L$. For any fixed line, these are $p$ independent uniform colors, so $M_L$ has the law of the maximum load $M_p$ when $p$ balls are thrown into $p$ bins. No independence between different lines is needed. By linearity,

$$
E_L,E_f[M_L]=E[M_p].
$$

After $f$ is fixed, choose $P_L$ to be a modal value on $L$. These are constant polynomials and hence are legal for every $d≥0$. The resulting local agreement is $(E_L M_L)/p$.

**[P2, proved] The modal load is logarithmically superconstant.** Let $N$ be Poisson with mean $p/2$ and expose one infinite sequence of independent uniform colors. Conditional on $N$, inspect the first $N$ colors. Poisson splitting makes the $p$ bin loads independent Poisson variables of mean $1/2$.

Put $r=r_p$. Since $p≥e^{16}$, $r≥1$ and

$$
r log(2r)≤(log p)/4.
$$

For $Y$ Poisson with mean $1/2$,

$$
Pr[Y≥r]≥Pr[Y=r]=e^{-1/2}/(2^r r!)≥e^{-1/2}/(2r)^r≥e^{-1/2}p^{-1/4}.
$$

Therefore the probability that all $p$ Poissonized bin loads are below $r$ is at most

$$
exp(-e^{-1/2}p^{3/4}).
$$

The Poisson Chernoff bound gives $Pr[N>p]≤(e/4)^{p/2}$. On $N≤p$, adding balls cannot decrease the maximum. Hence

$$
Pr[M_p≥r]≥1-exp(-e^{-1/2}p^{3/4})-(e/4)^{p/2}≥1/2,
$$

and $E[M_p]≥r/2$.

**[P3, proved] All degree-$d$ global polynomials can simultaneously have small agreement.** There are at most $p^{K_d}$ formal total-degree-at-most-$d$ polynomials. For any fixed $Q$, its number of agreements with random $f$ is binomial with parameters $p^2$ and $1/p$, hence mean $p$. The multiplicative Chernoff bound gives

$$
Pr[|\{x:Q(x)=f(x)\}|≥2p]≤(e/4)^p=e^{-λp}.
$$

A union bound over all $Q$ gives bad probability

$$
β≤exp(K_d log p-λp)≤e^{-λp/2}.
$$

This is the only union bound over global polynomials.

**[P4, proved] A deterministic table has both properties.** Let $Z=E_L M_L$, measured in points rather than normalized agreement. Then $0≤Z≤p$ and $E[Z]≥r/2$. On the event $G$ that every degree-$d$ polynomial has at most $2p$ agreements,

$$
E[Z1_G]≥r/2-pβ≥r/4
$$

for $p≥e^{16}$. Thus some deterministic $f∈G$ has $Z≥r/4$. Label every line by a modal constant. This gives $a=Z/p≥r/(4p)$, while membership in $G$ gives $δ_d≤2/p$. This proves Theorem A. No Markov inequality and no union bound over affine lines is used.

**[P5, proved] Consequences for the advertised thresholds.** When $d=0$, every positive power of $d/p$ is zero, while Theorem A has $δ_0/a≤8/r_p→0$. This refutes the workspace benchmark on its literal parameter range.

For the positive-degree consequence, set $d_p=floor(sqrt(r_p))$. Then $K_{d_p}log p=o(p)$, so Theorem A applies for all sufficiently large primes. Moreover,

$$
a/(d_p/p)≥r_p/(4d_p)→∞,
$$

whereas $δ_{d_p}/a≤8/r_p→0$. Given any proposed constants $C,c>0$, large enough $p$ therefore satisfies both $a≥Cd_p/p$ and $δ_{d_p}<ca$.

**[P6, proved] Spectral repair at degree zero.** For each $z∈F_p$, let $X_z=\{x:f(x)=z\}$ and let $T_z=\{L:P_L≡z\}$. Write $u_z=|X_z|/p^2$ and $v_z=|T_z|/[p(p+1)]$. These are probability vectors. KTZ Lemma 2.1 gives

$$
Pr[x∈X_z,L∈T_z]≤u_zv_z+sqrt(u_zv_z)/sqrt(p+1).
$$

Summing over $z$,

$$
a≤Σ_z u_zv_z+(1/sqrt(p+1))Σ_z sqrt(u_zv_z)
  ≤max_z u_z+1/sqrt(p+1).
$$

The last step uses Cauchy–Schwarz exactly once: $Σ_z sqrt(u_zv_z)≤1$. Since $max_z u_z=δ_0$, Theorem B follows. There is no hidden Markov or union loss.

**[P7, proved] Algebraic realization of the regular obstruction.** Fix $S⊆F_p$ of size $k$ and set $f(x,y)=x^k$. Parameterize finite-slope lines by

$$
L_{m,b}(t)=(t,mt+b).
$$

Define

$$
P_{m,b}(t)=t^k-∏_{s∈S}(t+m-s).
$$

The two displayed summands are monic of degree $k$, so their leading terms cancel and $deg P_{m,b}≤k-1=d$. On a vertical line $V_c(t)=(c,t)$, set $P_{V_c}(t)=c^k+1$, which never equals $f(c,t)=c^k$.

On a finite-slope line, $P_{m,b}(t)=f(L_{m,b}(t))$ exactly when $t+m∈S$. Thus every finite-slope line has exactly $k$ accepted points. At a point $(x,y)$, exactly the $k$ slopes $m∈S-x$ are accepted, while the vertical line is never accepted. The accepted graph between all points and finite-slope lines is therefore exactly $k$-regular. Its local agreement under the required all-line sampling is

$$
a=kp^2/[p^2(p+1)]=k/(p+1).
$$

**[P8, proved] Witness counting forces $p/ε$ lines.** Let $C_R$ be the accepted incidences covered by another accepted line in $R$. Each selected finite-slope line contains $k$ accepted points; at each such point there are exactly $k-1$ other accepted lines. Hence the number of witness triples $(x,L,M)$ with $M∈R$, $L≠M$, and both incidences accepted is at most $|R|k(k-1)$. Multiple witnesses only overcount $C_R$, so

$$
|C_R|≤|R|k(k-1).
$$

Covering a $γ$ fraction of the $kp^2$ accepted incidences requires $|C_R|≥γkp^2$. Therefore

$$
|R|≥γp^2/(k-1)≥γp/ε_k,
$$

where the last inequality uses $k≤p$. Requiring this coverage on every line is stronger and gives the same bound. If selected-line edges were instead declared automatically covered, a modified count still yields $|R|=Ω(p/ε_k)$.

**[P9, proved] The obstruction table itself remains globally sound.** For every total-degree-at-most-$(k-1)$ polynomial $Q$ and each fixed $y$, the formal polynomial $X^k-Q(X,y)$ has degree exactly $k$, so it has at most $k$ roots in $F_p$. Thus $δ_{k-1}≤k/p$. Equality is achieved by

$$
Q_S(X,Y)=X^k-∏_{s∈S}(X-s),
$$

whose leading terms cancel and whose degree is at most $k-1$. Therefore $δ_{k-1}=k/p=(1+1/p)ε_k$. The example is not a soundness counterexample; it isolates the concentration architecture.

**[P10, proved] The cubic bottleneck is reconstructed.** KTZ Lemma 3.2 gives $|R|=O(p/ε)$. Weighted interpolation has $Θ(D^3/d)$ available monomials and $O(|R|D)$ constraints, so it selects

$$
D=Θ(sqrt(d|R|))=O(sqrt(dp/ε)).
$$

Extending the line identity and surviving the second pruning require $D<k_1/2$ with $k_1=Θ(εp)$. Hence

$$
sqrt(dp/ε)=O(εp)\quad iff\quad ε^3=Ω(d/p).
$$

Theorem C proves that the $p/ε$ input to this calculation cannot be improved using only the accepted graph and the same witness requirement. It does not rule out a hybrid lemma exploiting the actual polynomial labels.

## Exponent Ledger

| Stage | Input | Loss | Output |
|---|---:|---:|---:|
| Modal occupancy | $p$ balls, $p$ colors | probability factor $1/2$ | load $r_p/2$ |
| Deterministic extraction | load $r_p/2$ | conditioning factor $1/2$ | $a≥r_p/(4p)$ |
| Global code union | $p^{K_d}$ candidates | $e^{K_d log p}$ | $δ_d≤2/p$ if $K_d log p≤λp/2$ |
| Linear conversion | $a≥r_p/(4p)$ | ratio $8/r_p$ | $δ_d=o(a)$ |
| Exact exponent 1 | $d_p=sqrt(r_p)$ | $a/(d_p/p)→∞$ | bare $Cd/p$ threshold refuted |
| Degree-zero repair | local $a$ | additive $1/sqrt(p+1)$ by Cauchy–Schwarz | $δ_0≥a-1/sqrt(p+1)$ |
| KTZ sparsification | minimum degree $Θ(εp)$ | sampling probability $Θ(1/(εp))$ | $|R|=O(p/ε)$ |
| New lower bound | regular accepted graph | witness capacity $k(k-1)$ per selected line | $|R|=Ω(p/ε)$ |
| KTZ interpolation | $|R|=Θ(p/ε)$ | $D^3/d$ versus $|R|D$ | $D=Θ(sqrt(dp/ε))$ |
| Root propagation | degree $D$ | require $D=O(εp)$ | $ε^3=Ω(d/p)$ |

All displayed exponent manipulations are included. No logarithm has been suppressed in a claimed power threshold.

## Counterexample Attempts

1. **Random modal-color table — successful.** This proves Theorem A and refutes the literal $d=0$ benchmark and a bare exact-linear threshold in a growing positive-degree regime.
2. **Regular algebraic incidence table — successful as an architectural obstruction.** Theorem C matches the KTZ $p/ε$ selector size but has global agreement $(1+1/p)ε$, so it does not refute soundness.
3. **Concentrated good directions — not worst case.** Taking $f=0$, setting $P_L=0$ on $s$ directions and $P_L=1$ elsewhere gives local agreement $s/(p+1)$. Its accepted graph can be covered at scale $Θ(p)$ rather than $Θ(p/ε)$; concentrated directions therefore do not explain the cubic bottleneck.
4. **Small primes.** Exhaustive enumeration gives ratio $4/3$ at $p=2,d=0$ and $7/4$ at $p=3,d=0$. These do not prove divergence, but they reveal no exceptional collapse.
5. **Near-maximal degree.** Theorem C permits $k=p,d=p-1$. Then $∏_{s∈F_p}(t-s)=t^p-t$ and all degree claims remain valid.

## Characteristic Audit

- The probabilistic counterexample uses only iid values in $F_p$ and constant line polynomials. It has no separability assumption.
- Theorem C uses distinct linear roots. At $k=p$, $t^p-t$ is squarefree because its derivative is $-1$. There is no hidden division by $k$, $d$, or a derivative.
- No discriminant, resultant, irreducibility claim, Hasse derivative, or interpolation multiplicity appears in the new proofs.
- KTZ's derivative and Newton-lifting machinery is not used to prove any new claim. Its division-by-$d$ monomial bound is precisely why its printed proof does not cover $d=0$.
- The only Cauchy–Schwarz loss is the explicit $1/sqrt(p+1)$ term in [P6]. The only global union loss is $p^{K_d}$. No Markov inequality is used. Poisson and Chernoff losses are displayed in [P2]–[P4].
- The line model is the full affine set, including vertical lines. Total degree is never replaced by individual degree. All auxiliary constructions obey $d<p$.
- Finite computations were used solely for falsification; the asymptotic theorem is probabilistic but rigorous.

## Limitations

This note proves no exponent greater than $1/3$ for $1≤d<p$. The occupancy construction lies below every fixed-$η$ threshold $(d/p)^{1-η}$ along the displayed growing-degree sequence, so the principal near-linear target remains open.

The degree-zero repair has a gap: the counterexample forces a floor of at least order $log p/(p log log p)$, while the spectral argument only proves linear recovery above order $p^{-1/2}$. The exact floor is undetermined.

The sparsifier lower bound applies to the KTZ witness definition, or any method based only on the accepted incidence graph. It does not preclude using polynomial coefficients, higher-order algebraic coincidences, or a simultaneous algebraic-concentration argument. Indeed, that is now the necessary next direction.

Finally, the cited HKSS source is arXiv v1 and contains unresolved internal exponent bookkeeping. No result in this note depends on resolving it.
