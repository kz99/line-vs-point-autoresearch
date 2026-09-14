# The zero-degree endpoint is false, and the KTZ cubic loss is a sparsifier–interpolation–root-budget bottleneck

## Abstract

For the affine line-versus-point test on $F_p^2$, the literal parameter range $0≤d<p$ is unsound at $d=0$. For every integer $r≥2$ and every prime

$p≥p_0(r):=max\{30,r(r-1),8r!\}$,

there is a table $f:F_p^2→F_p$ and a constant polynomial on every line such that the local agreement $ε$ is at least $r/(130p)$, whereas every global constant agrees with $f$ on at most $2/p$ of the plane. Thus the global/local ratio is at most $260/r$, and no absolute $Ω(ε)$ conclusion holds at the zero threshold $C(0)^{1/3}$.

For the corrected regime $1≤d<p$, I find no flaw in the bivariate Kominers–Thaler–Zheng proof and no improved exponent. Its cubic loss is exact: sparsification gives $|R|=O(p/ε)$; weighted interpolation gives $D^2≈d|R|$; extension, deletion, and lifting independently require $D=O(εp)$. Hence $ε^3≳d/p$. This is my exponent reconstruction, not a separately quoted KTZ theorem.

I also prove two positive-degree obstructions. First, density and minimum degree alone may require $Ω(p/ε)$ reaching lines, so the KTZ sparsifier scale cannot be improved by a purely incidence-theoretic lemma. Second, a random interpolation construction has local agreement $Θ(d/p)$ but vanishing global/local ratio along $d≈sqrt(p/log p)$, confirming that $d/p$ is the correct long-term scale up to constants.

## Test and Notation

Fix a prime $p$, dimension $m=2$, and $0≤d<p$. Let $L$ be the set of the $p(p+1)$ geometric affine lines in $F_p^2$. Fix an affine bijection $ell_L:F_p→L$ for each line. A line table assigns $P_L∈F_p[t]$ with $deg(P_L)≤d$.

The local agreement is

$Acc(f,P):=Pr_{L∈L,\ t∈F_p}[P_L(t)=f(ell_L(t))]=:ε$.

Every line has $p$ points and every point lies on $p+1$ lines, so uniform line followed by uniform point is exactly uniform sampling from incident point-line pairs. The global agreement is

$Agr_d(f):=max_{Q∈F_p[X,Y],\ totaldeg(Q)≤d} Pr_x[Q(x)=f(x)]$.

Write $ρ=d/p$. Because $0<ρ<1$ when $d>0$, a larger threshold exponent is stronger.

## Prior Results

The source-stated result is [Kominers–Thaler–Zheng, ECCC TR26-147, Revision 1](https://eccc.weizmann.ac.il/report/2026/147/revision/1/download); the [ECCC record](https://eccc.weizmann.ac.il/report/2026/147/) dates Revision 1 to August 16, 2026. Specializing Theorem 1.1 to $q=p$ and $m=2$, it states that absolute constants $C,c>0$ exist such that

$ε≥C(d/p)^{1/3}$ implies $Agr_d(f)≥cε$.

Section 6 supplies $c=1/8000$ in the bivariate proof. Revision 1 leaves $C$ existential. The ignored local cache `.cache/references/ktz.pdf` is the earlier 17-page version, SHA-256 prefix `f8c5b145`, and must not be used to attribute its explicit $C=10^{40}$ assertion to Revision 1.

The exact dependency map is KTZ Lemma 2.1 for incidence mixing; Lemmas 2.2–2.4 for characteristic-compatible interpolation, squarefreeness, and a coprime directional derivative; Lemmas 2.5–2.7 for line counting, the resultant bound, and simple-root lifting; Lemmas 3.1–3.2 for pruning and sparsification; Lemmas 4.1–4.3 for the explainer; Lemmas 5.1–5.2 for removal of degenerate roots; and Lemmas 6.1–6.3 for lifting and propagation. KTZ's Lemma 2.7 is traced there to [HKSS, Lemma 2.10](https://arxiv.org/abs/2311.12752); Lemma 6.1 is essentially the corresponding HKSS local lifting step. No Arora–Sudan black box is used in this audit.

The corpus contains no prior mathematical submission or verifier audit: all eight leaderboard files are `[]`, neither campaign database contains submission or audit tables, and no submission or review directory exists. Thus no campaign-verified result can be imported.

## Theorem

### Theorem A — zero-degree endpoint counterexample

For every integer $r≥2$ and every prime $p≥p_0(r)$, there exist $f:F_p^2→F_p$ and constant line polynomials $P_L$ such that

$Acc(f,P)≥r/(130p)$ and $Agr_0(f)≤2/p$.

Consequently, for every proposed absolute $c>0$, choosing $r>260/c$ gives $Agr_0(f)<c Acc(f,P)$. Since $C(d/p)^{1/3}=0$ at $d=0$, the theorem requested over the literal range $0≤d<p$ is false.

### Proposition B — exact positive-degree cubic bottleneck

Assume $1≤d<p$ and let $ε=Acc(f,P)$. KTZ constructs

$k_0=floor(εp/100)$, $100p≤r:=|R|≤6400p/ε$,

$D=16(floor(sqrt(dr))+1)≤1280(sqrt(dp/ε)+1)$,

and $k_1=floor(εp/1000)$.

The three requirements $D<k_0/2$, $D/p=O(ε)$, and $D<k_1/2$ all reduce to $ε^3≳d/p$. The exceptional-line term $D^2/[p(p+1)]$ asks only $ε^2≳d/p$. Once these inequalities hold, KTZ obtains $Agr_d(f)≥ε/8000$.

### Theorem C — incidence-only reaching-set obstruction

Let $0<δ≤1/4$ and let $p$ be prime with

$δ^2p≥64 log(256ep)$.

There exists an accepted-incidence subgraph $G$ of the affine plane such that every point and line has degree at least $δp/2$, every line has degree at most $2δp$, yet no set $R$ of at most $p/(64δ)$ lines satisfies

$cov_R(L):=|\{x∈L:(L,x)∈E(G),\text{ and some }M∈R\text{ has }(M,x)∈E(G)\}|>δp/4$

for every $L$ outside $R$.

Moreover, $G$ is exactly realizable as a line-versus-point acceptance graph with $f=0$ and degree

$d_G:=max_L deg_G(L)≤2δp<p$.

If its local agreement is $α$, then $α∈[δ/2,2δ]$, and every such reaching family has size greater than $p/(128α)$.

### Proposition D — a positive-degree sharp-scale adversary

For every prime $p≥3$ and $1≤d<p$, put

$K=(d+1)(d+2)/2$, $T=ceil(4(p+K log p))$.

There exist $f$ and degree-$d$ line polynomials satisfying

$(d+1)/p≤Acc(f,P)≤4(d+2)/p$

and

$Agr_d(f)≤T/p^2$.

Along $d=floor(sqrt(p/log p))$, this gives $Agr_d(f)=O(1/p)$ and $Agr_d(f)/Acc(f,P)=O(1/d)→0$.

## Proof or Conditional Proof

**[P1 — proved] Sampling and source specialization.** There are $p(p+1)$ affine lines, $p$ points per line, and $p+1$ lines through each point. Hence both descriptions of the sampling distribution assign mass $1/[p^2(p+1)]$ to every incident pair. KTZ Theorem 1.1 therefore specializes without a sampling change.

**[P2 — proved] KTZ sparsifier scale.** KTZ Lemma 3.1 produces an accepted graph $G_0$ of edge measure at least $ε/4$ and minimum degree $k_0=floor(εp/100)$. Lemma 3.2 chooses a line family $R$ with normalized line measure between $100/p$ and $3200/(εp)$ and covers more than $k_0/2$ accepted points of every retained line. Since the line space has $p(p+1)$ elements, this gives $100p≤|R|≤6400p/ε$.

**[P3 — proved] Weighted interpolation scale.** KTZ gives $dim(V_D)≥D^3/(64d)$ for monomials of weight $(1,1,d)$. On a selected line, $A(ell_L(t),P_L(t))$ has degree at most $D$, so its formal vanishing imposes at most $D+1$ linear constraints. A nonzero interpolant therefore requires $D^3/d$ to dominate $|R|D$, or $D^2≳d|R|$. The source chooses $D=16(floor(sqrt(d|R|))+1)$, yielding the displayed bound. This coefficient count is an exponent reconstruction from KTZ's parameters.

**[P4 — proved] The cubic coupling.** Dividing the displayed upper bound by $εp$ gives

$D/(εp)≤1280(sqrt(ρ/ε^3)+1/(εp))$.

Lemma 4.3 needs $D<k_0/2$ to turn more than $D$ distinct covered roots on a line into a formal identity. Section 5 loses normalized incidence mass

$D/p+D^2/[p(p+1)]$,

whose first term must be $O(ε)$. Lemma 6.1 again needs $D<k_1/2$ to obtain more than $D$ incident line roots. Each dominant requirement therefore asks $ρ/ε^3=O(1)$, namely $ε≳ρ^{1/3}$. By contrast, the quadratic deletion term is $O(ρ/ε)$ and asks only $ρ=O(ε^2)$.

**[P5 — proved] Probability and constant-loss audit.** In the source bookkeeping, popularity averaging charges at most $ε/2$ to low-popularity incidences; the first degree pruning charges less than $ε/50$ and retains at least $ε/4$. Lemma 3.2 uses a Chernoff bound for each line's coverage, a union bound over $p(p+1)$ lines, and a second-moment/Chebyshev bound for $|R|$; its parameter lemma ensures $εp≫log p$. Section 5 charges exactly $D/p+D^2/[p(p+1)]≤ε/16$. The second pruning charges less than $ε/16$ and leaves edge measure at least $ε/8$. Lemma 2.1 is the sole incidence Cauchy–Schwarz loss, with normalized error at most $sqrt(μ(X)μ(T)/(p+1))$; the imposed $p^{-1/2}≤ε/8000$ yields component measures at least $ε/8000$. There is no additional Markov loss in KTZ. Thus no suppressed power of $ρ$ occurs after [P4].

**[P6 — proved] A good line at d=0.** Choose $f(x)$ independently and uniformly from $F_p$. On a fixed line let $N_a$ be the occupancy of color $a$ and let $Y=sum_a 1[N_a=r]$. With

$a_0=Pr[N_a=r]=binom(p,r)p^{-r}(1-1/p)^{p-r}$,

the assumptions on $p$ give

$prod_{i=0}^{r-1}(1-i/p)≥1-r(r-1)/(2p)≥1/2$

and $(1-1/p)^{p-r}≥(1-1/p)^p≥1/4$. Hence $a_0≥1/(8r!)$ and $E[Y]=pa_0≥1$. For distinct colors,

$Pr[N_a=N_b=r]≤1/(r!)^2≤64a_0^2$.

Therefore $E[Y^2]≤E[Y]+64E[Y]^2≤65E[Y]^2$. The second-moment inequality gives $Pr[Y>0]≥1/65$.

**[P7 — proved] Simultaneous global balance.** Let $g(f)$ be the fraction of lines with $Y>0$, so $E[g]≥1/65$. For a fixed color, its total occupancy in the plane is $Bin(p^2,1/p)$ with mean $p$. Chernoff and a union bound over all $p$ colors give

$Pr[max_a |f^{-1}(a)|>2p]≤p(e/4)^p≤pe^{-p/3}≤1/130$.

If $H$ is the complementary event, then $E[g1_H]≥1/65-1/130=1/130$. Thus some $f$ satisfies $H$ and $g(f)≥1/130$. On each good line choose a color occurring exactly $r$ times and use it as the constant $P_L$; label other lines arbitrarily. This gives $Acc≥r/(130p)$, while $H$ gives $Agr_0≤2/p$. Independence between different lines was never assumed.

**[P8 — refuted] Universal soundness over 0≤d<p.** If an absolute conclusion $Agr_0≥c Acc$ held, [P7] would imply $c≤260/r$ for every $r$. Choosing $r>260/c$ is a contradiction. The threshold constant $C$ cannot repair this because its threshold is identically zero at $d=0$.

**[P9 — proved] Random incidence graph.** Retain every affine point-line incidence independently with probability $δ$. Chernoff bounds and a union bound over fewer than $3p^2$ point and line vertices show, with probability greater than $3/4$ under the stated hypothesis, that every point and line has degree at least $δp/2$ and every line has degree at most $2δp$.

**[P10 — proved] No small reaching family.** Fix $R$ with $r≤r_0=floor(p/(64δ))$. Some parallel class contains at most $r/(p+1)$ lines of $R$, leaving at least $p/2$ test lines outside $R$. For such a line $L$, let $n_x$ count lines of $R$ through $x∈L$. Then $sum_x n_x≤r$. The coverage indicators at distinct $x$ are independent and

$E[cov_R(L)]≤δ sum_x[1-(1-δ)^{n_x}]≤δ^2r≤δp/64$.

Consequently

$Pr[cov_R(L)>δp/4]≤(e/16)^{δp/4}$.

For distinct parallel test lines the relevant incidence variables are disjoint, so the probability that this fixed $R$ reaches all of them is at most $exp(-δp^2/32)$. The number of sets of at most $r_0$ lines is at most

$exp((p/(64δ))log(256ep))≤exp(δp^2/4096)$.

A union bound gives probability less than $1/4$ that any small $R$ succeeds. Intersecting with [P9] proves Theorem C.

**[P11 — proved] Exact polynomial realization.** Fix the line parameterizations and let $S_L⊆F_p$ be the retained parameters on $L$. Set $f=0$ and

$P_L(t)=prod_{a∈S_L}(t-a)$.

Then $P_L(t)=f(ell_L(t))$ exactly on the retained incidences. Its degree is $|S_L|≤2δp<p$. The line-degree bounds give $α∈[δ/2,2δ]$, and $p/(64δ)≥p/(128α)$. Since the global polynomial $Q=0$ agrees everywhere, this is only an obstruction to incidence-only sparsification.

**[P12 — proved] Local agreement in the positive-degree adversary.** Before sampling $f$, fix $d+1$ points $S_L$ on every line. Sample $f$ independently and uniformly, and let $P_L$ be the unique degree-at-most-$d$ interpolant through $f|_{S_L}$. The selected points always agree. At every other point of $L$, $P_L(x)$ is determined by $f|_{S_L}$ and is independent of $f(x)$, so

$E[Acc]=(d+1)/p+(p-d-1)/p^2≤(d+2)/p$.

Every outcome has $Acc≥(d+1)/p$, while Markov gives $Pr[Acc>4(d+2)/p]≤1/4$.

**[P13 — proved] Global union bound.** There are $p^K$ formal total-degree-at-most-$d$ polynomials, where $K=(d+1)(d+2)/2$. For fixed $Q$, its number of agreements with random $f$ is $Bin(p^2,1/p)$ with mean $p$. If $T≤p^2$, Chernoff and a union bound give

$Pr[exists Q: agreements(Q)≥T]≤p^K(ep/T)^T≤p^K(e/4)^T≤p^{-(4log4-5)K}<1/4$.

If $T>p^2$, the event is empty. Thus with positive probability the Markov-good event in [P12] and this global-good event occur simultaneously, proving Proposition D.

**[P14 — proved] Sharp-scale specialization.** For $d=floor(sqrt(p/log p))$, one has $K log p=O(p)$ and hence $T=O(p)$. In fact $T≤13p$ for all sufficiently large $p$. Therefore $Agr_d≤13/p$, while $Acc≥(d+1)/p$, so the ratio is at most $13/(d+1)→0$.

**[P15 — conditional] What sparsification alone could buy.** Suppose a replacement for Lemma 3.2 gave $|R|=O(p/ε^γ)$ while retaining the same coefficient-count and root-budget steps. Then

$D^2≳dp/ε^γ$ and $D≲εp$

imply $d/p≲ε^{2+γ}$, or $ε≳ρ^{1/(2+γ)}$. Thus $|R|=O(p)$ gives exponent $1/2$, not exponent near one. Near-linear soundness needs a family near the geometric scale $Θ(εp)$ or a different interpolation/propagation mechanism. Theorem C shows that density and minimum degree alone cannot even provide $O(p)$ on all accepted graphs.

## Exponent Ledger

| Stage | Input | Loss | Output |
|---|---|---|---|
| Pruning | $ε$ | absolute constants | edge measure $≥ε/4$, $k_0=Θ(εp)$ |
| Sparsification | $k_0=Θ(εp)$ | one factor $ε^{-1}$ | $|R|=O(p/ε)$ |
| Interpolation | $dim(V_D)=Ω(D^3/d)$, $O(|R|D)$ constraints | square root | $D=O(sqrt(dp/ε)+1)$ |
| Root extension | $D<k_0/2$ | compare with $εp$ | $ε^3≳d/p$ |
| Trivial-line deletion | $D/p≤O(ε)$ | compare with $εp$ | $ε^3≳d/p$ |
| Degenerate-line deletion | $D^2/p^2≤O(ε)$ | quadratic term | $ε^2≳d/p$ only |
| Root lifting | $D<k_1/2$ | compare with $εp$ | $ε^3≳d/p$ |
| Formal-degree safety | $D<p$ | none beyond degree | $ε≳d/p$ only |
| Chernoff and mixing | $εp$, $p^{-1/2}$ | logarithmic/field-size conditions | no new $d/p$ power |
| Propagation | one $G_1$ component | factor $1/8000$ | global agreement $≥ε/8000$ |
| Hypothetical $|R|=O(p/ε^γ)$ | same algebra | architecture conversion | exponent $1/(2+γ)$ |
| Endpoint $d=0$ | threshold zero | ratio $≤260/r$ | universal linear conclusion refuted |
| Sharp-scale adversary | $ε=Θ(d/p)$ | global $O(1/p)$ | ratio $O(1/d)$ |

## Counterexample Attempts

1. **Degree zero — successful.** Theorem A is a genuine counterexample to the literal target, not merely to a proof technique.

2. **Random prescribed interpolation — scale obstruction.** Proposition D shows that agreement of order $d/p$ cannot by itself force a constant global/local ratio. Its agreement is far below $(d/p)^{1/3}$, so it does not challenge KTZ.

3. **Diffuse random incidences — proof-method obstruction.** Theorem C matches the $p/ε$ reaching-family size, but its realization has the perfect decoder $Q=0$ and $d_G=Θ(εp)$. It cannot rule out a sparsifier exploiting the stronger cubic-regime inequality $d≪εp$.

4. **Concentrated good directions — not extremal.** If about $εp$ whole direction classes are accepted, one complete parallel class of $p$ lines reaches every point. This replaces $p/ε$ by $p$ and leads to the exponent-$1/2$ ledger, so concentration is easier than the diffuse graph.

5. **Near-characteristic degree — nonvacuousness failure.** At $d=p-1$, arbitrary restrictions can be interpolated on every line. After enlarging the existential KTZ constant to $C≥1$, however, $ε≥C(d/p)^{1/3}$ is generally impossible near $d=p$, so this does not refute the published positive-degree statement.

6. **Small fields — exact checks only.** Exhaustive enumeration at $(p,d)=(2,0),(2,1),(3,0),(3,1),(3,2)$ found worst local/global ratios $4/3,4/3,7/4,3/2,9/7$, respectively. These checks expose no additional positive-degree defect and carry no asymptotic force.

## Characteristic Audit

For $1≤d<p$, the positive-degree proof is characteristic-safe. KTZ's allowed monomials omit positive $Z^k$ with $p|k$; once $D<p$, this omission is automatic because $k≤D/d<p$. The minimum-weight interpolant is squarefree. Since finite fields are perfect, an irreducible factor with all ordinary partial derivatives zero would be a nontrivial $p$-th power. Lemma 2.4 then chooses an $F_p$-directional derivative outside fewer than $p$ bad subspaces; this is where the strict $D<p$ matters.

Revision 1 uses no discriminant and assumes no absolute irreducibility. Coprimality of $B$ and its directional derivative is sufficient for the resultant count. The factorization $A=HB$ is exact; cancellation is in $F_p[t]$, not pointwise division by $H$. After derivative-degenerate incidences are removed, $B_Z(x,f(x))$ is a nonzero field element. Newton–Hensel lifting divides only by this scalar and uses no factorials. All interpolation uses ordinary coefficient constraints and distinct roots, not hidden multiplicities.

At $d=0$, by contrast, the weighted $Z$-degree is zero, Lemma 2.2's dimension bound divides by $d$, and the minimum-weight argument loses positivity. Theorem A shows that this is a genuine theorem-level defect rather than harmless notation.

## Limitations

- No exponent stronger than $1/3$ is proved for the corrected regime $1≤d<p$; therefore `benchmark_improved=false`.
- The endpoint counterexample corrects the literal campaign statement. It should not be presented as refuting KTZ if that paper's intended convention is $d≥1$.
- The reaching-set obstruction applies to arguments using only incidence density and minimum degree. Its polynomial realization has a perfect global decoder and lies at $d=Θ(εp)$, not in the cubic regime.
- Proposition D confirms the $d/p$ scale only up to constants; it does not rule out a theorem triggered at every sufficiently large constant multiple of $d/p$.
- Revision 1 does not publish an explicit valid threshold constant $C$, so this audit preserves its existential constant rather than importing the old cached value.
- Finite enumeration was used only for falsification. It cannot establish asymptotic soundness.
- No claim is made about dimensions above two, extension fields, descent, or dimension bootstrapping.
