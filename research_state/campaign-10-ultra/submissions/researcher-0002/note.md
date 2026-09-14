# Component-sensitive line concentration and the square-root conditional regime

## Abstract

For the affine line-versus-point test on $\mathbb F_p^2$, I retain the line-support measure in the Kominers--Thaler--Zheng sparsification argument. If a connected accepted-incidence subgraph has minimum degree $k$ and its line side occupies a fraction $\tau$ of all affine lines, then a reaching family of size $O(\tau p^2/k)$ suffices. The resulting trivariate explainer has weighted degree $D=O(\sqrt{d\tau p^2/k})$. Component-local accounting shows that the proof closes under

$$
k^3\gg d\tau p^2\quad\text{and}\quad k^2\gg dp,
$$

and yields one total-degree-at-most-$d$ polynomial with agreement $\Omega(k/p)$. Thus a standard pruned component with $k=\Theta(\epsilon p)$ and $\tau=O(\epsilon)$ admits the conditional square-root threshold $\epsilon=\Omega((d/p)^{1/2})$, with global agreement $\Omega(\epsilon)$.

This does not improve the unconditional $1/3$ benchmark: no argument here forces the small-component hypothesis. Moreover, a balanced-color construction using constant line polynomials proves that a single family which covers half of every accepted line can genuinely require $\Omega(p/\epsilon)$ lines. Hence a further improvement must be a sparsify-or-decode argument, not a uniformly smaller graph-theoretic cover.

## Test and Notation

Fix a prime $p$ and an integer $100<d<p$; throughout $m=2$. There are $p(p+1)$ affine lines, each containing $p$ points, and every point lies on $p+1$ lines. Sampling a uniform line and then a uniform point on it is therefore the same as sampling a uniform incident pair.

Let $f:\mathbb F_p^2\to\mathbb F_p$, and let every affine line $L$ carry a polynomial $P_L$ of degree at most $d$. Put

$$
\epsilon=\Pr_{L,\,x\in L}[P_L(x)=f(x)].
$$

The accepted-incidence graph has an edge $(x,L)$ exactly when $x\in L$ and $P_L(x)=f(x)$. For a subgraph $G=(X,T,E)$, write $k=\operatorname{mindeg}(G)$, $t=|T|$, and

$$
\tau=\frac{t}{p(p+1)}.
$$

All graph degrees below are accepted degrees, not ambient incidence degrees.

## Prior Results

The active corpus contained no completed submission or verifier audit at the start and end of this run; every active verified, promising, rejected, and bottleneck leaderboard was `[]`. This was checked against [the durable manifest](/Users/kaizheng/Documents/ChatGPT/Line-vs-Point/research_state/DATA_MANIFEST.json) and both campaign databases, excluding every directory named `superseded`.

The quoted benchmark is Theorem 1.1 of [Kominers--Thaler--Zheng, ECCC TR26-147, revision 1](https://eccc.weizmann.ac.il/report/2026/147/revision/1/download): over every finite field, $\epsilon\ge C(d/p)^{1/3}$ implies a single total-degree-at-most-$d$ polynomial with agreement at least $c\epsilon$.

The explanation of the cubic exponent is my reconstruction from their proof, not a quoted theorem: Lemma 3.2 gives $|R|=O(p/\epsilon)$; Lemmas 4.1--4.3 give $D=O(\sqrt{d|R|})=O(\sqrt{dp/\epsilon})$; and identity extension and later lifting require $D=O(\epsilon p)$. Squaring gives $d p/\epsilon=O(\epsilon^2p^2)$, or $\epsilon^3=\Omega(d/p)$.

For context, Theorem 4.2 of [Harsha--Kumar--Saptharishi--Sudan](https://arxiv.org/abs/2311.12752v1) displays the condition $p>C d/\epsilon^7$ for its weak bivariate best-fit-oracle theorem. Calling this an exponent-$1/7$ threshold is an algebraic rewrite of that displayed condition. It is not used below.

## Theorem

**Theorem A (proved component-sensitive decoder).** Let $C_*=2^{40}$. Suppose $G=(X,T,E)$ is a connected subgraph of the accepted-incidence graph with minimum degree $k$ and line measure $\tau$. If

$$
k^2\ge C_*dp,\qquad k^3\ge C_*d\tau p^2,
$$

then there is $Q\in\mathbb F_p[X,Y]$ of total degree at most $d$ such that

$$
\Pr_x[Q(x)=f(x)]\ge \frac{k}{800p}.
$$

The constant is deliberately unoptimized.

**Corollary B (conditional exponent $1/2$).** Let $\epsilon$ be the test agreement and let $G_0$ be a pruned graph supplied by KTZ Lemma 3.1, so $k_0=\lfloor\epsilon p/100\rfloor$. Suppose some connected component of $G_0$ has line measure at most $\Lambda\epsilon$, where $\Lambda\ge1$. Define

$$
C_\Lambda=\sqrt{8{,}000{,}000\,C_*\Lambda}.
$$

If $\epsilon\ge C_\Lambda(d/p)^{1/2}$, then some total-degree-at-most-$d$ polynomial $Q$ satisfies

$$
\Pr_x[Q(x)=f(x)]\ge\frac{\epsilon}{160000}.
$$

This is conditional only in the campaign sense: the implication is proved, but the extra small-component premise is not known for every table.

**Proposition C (proved global-cover obstruction).** Let $p\ge103$ be prime and let $2\le K\le p/(100\log p)$. For every campaign degree $100<d<p$, there is a valid table using constant line polynomials for which

$$
\frac1{2K}\le\epsilon\le\frac2K,
$$

all accepted point and line degrees are within a factor two of their means, and every set $R$ which reaches at least half of the accepted points of every affine line satisfies

$$
|R|\ge\frac{Kp}{16}\ge\frac{p}{32\epsilon}.
$$

Nevertheless, one constant global polynomial agrees with $f$ on at least $\epsilon/2$ of the points.

## Proof or Conditional Proof

**[P1] (proved: component size).** Apply KTZ Lemma 2.1 to the point and line sides of $G$. Its exact mixing error is $\sqrt{\mu(X)\mu(T)}/\sqrt{p+1}$. The first hypothesis and $d>100$ imply $1/\sqrt{p+1}\le k/(4p)$. The argument of KTZ Lemma 6.2 therefore gives

$$
\mu(X),\tau\ge\frac{k}{4p}.
$$

In particular, $t\ge k(p+1)/4$.

**[P2] (proved: component-sensitive reaching family).** Select each line of $T$ independently with probability $8/k$. For $x\in N_G(L)$, at least $k-1$ other accepted lines pass through $x$, so $x$ is reached with probability at least $3/4$. For distinct points of a fixed affine line $L$, the relevant sets of other lines are disjoint: two such points have only $L$ as a common line. The reach indicators are consequently independent. Chernoff gives failure probability at most $e^{-\deg_G(L)/24}\le e^{-k/24}$ for a fixed $L$. The hypotheses imply $k\gg\log p$, so a union bound over fewer than $2p^2$ lines succeeds. A second Chernoff bound controls the sample size. Hence one choice $R$ has, with $r=|R|$,

$$
\frac{4t}{k}\le r\le\frac{16t}{k},
$$

and reaches more than half of $N_G(L)$ for every $L\in T$. By [P1], $r\ge p+1$.

**[P3] (proved: interpolation).** Set

$$
D=16\bigl(\lfloor\sqrt{dr}\rfloor+1\bigr).
$$

Then $D^2>256dr$ and

$$
D^2\le1024dr\le\frac{16384dt}{k}.
$$

Using $t=\tau p(p+1)\le2\tau p^2$ and $k^3\ge C_*d\tau p^2$ gives $D/k<1/5000$. Thus $D<k\le p$, while $re p>D$.

KTZ Lemma 2.2 supplies at least $D^3/(64d)$ eligible monomials of weighted degree at most $D$. Each identity $A(L(t),P_L(t))\equiv0$ costs at most $D+1$ homogeneous conditions, and $D^2>256dr$ makes the number of variables exceed $r(D+1)$. A nonzero interpolant exists. Because $r>D$, it cannot be independent of $Z$; the allowed $Z$-exponents make $A_Z\ne0$. Choose one of minimum weighted degree. KTZ Lemma 2.3 makes it squarefree.

**[P4] (proved: extension).** If $x$ is an accepted point of $L$ reached by $M\in R\setminus\{L\}$, then $P_L(x)=f(x)=P_M(x)$ and hence $A(x,P_L(x))=0$. More than $k/2>D$ distinct such points lie on every $L\in T$. Since $A(L(t),P_L(t))$ has degree at most $D$, it vanishes identically. No Markov loss occurs here.

**[P5] (proved: characteristic-safe cleanup).** Write $A=HB$, where $H(X,Y)$ is the gcd of the coefficients of $A$ as a polynomial in $Z$. At most $D$ lines make $H|_L$ identically zero. On every other line, exact division in the domain $\mathbb F_p[t]$ gives $B(L(t),P_L(t))\equiv0$. The squarefree $B$ has degree below $p$. KTZ Lemma 2.4 supplies a formal directional derivative $\mathcal D$ with $\gcd(B,\mathcal DB)=1$. KTZ Lemma 2.6, via the resultant, bounds lines on whose polynomial graph both vanish by $D(D-1)$. Every other line has at most $D$ accepted points where $(\mathcal DB)(x,f(x))=0$. Thus at most

$$
pD^2+Dt
$$

accepted edges are deleted.

**[P6] (proved: local deletion and pruning).** Since $|E|\ge kt$,

$$
\frac{pD^2+Dt}{|E|}\le\frac{D}{k}+\frac{16384dp}{k^2}<\frac1{4000}.
$$

Put $k_1=\lfloor k/100\rfloor$. Iteratively deleting vertices of current degree below $k_1$ removes fewer than

$$
k_1(|X|+t)\le 2(k_1/k)|E|\le |E|/50
$$

additional edges. A nonempty graph of minimum degree $k_1$ remains, although it may fragment.

**[P7] (proved: simple roots).** At every remaining point choose two incident lines; $k_1\ge2$. Their directions are independent in $\mathbb F_p^2$. Differentiating their formal identities, if $B_Z(x,f(x))=0$, forces $B_X(x,f(x))=B_Y(x,f(x))=0$. This contradicts the retained condition $(\mathcal DB)(x,f(x))\ne0$. Hence every retained value is a simple $Z$-root. No derivative is divided by in this step.

**[P8] (proved: lift, propagate, and measure).** Choose any connected component of the graph left by [P6]. Its minimum degree is $k_1>D$. KTZ Lemmas 2.7 and 6.1 lift the line roots through one point to a single total-degree-at-most-$d$ polynomial $Q$. Simple-root uniqueness propagates the same $Q$ through the component, as in KTZ Lemma 6.3; there is no factor-count loss. The first numerical hypothesis also gives $1/\sqrt{p+1}\le k_1/(4p)$. KTZ Lemma 6.2 then gives point measure at least

$$
\frac{k_1}{4p}\ge\frac{k}{800p},
$$

proving Theorem A.

**[P9] (conditional: translate to local agreement).** In Corollary B, the stated threshold makes $k_0\ge\epsilon p/200$. The inequality $\epsilon^2p\ge8{,}000{,}000C_*\Lambda d$ implies both

$$
k_0^2\ge C_*dp,
\qquad
k_0^3\ge C_*d(\Lambda\epsilon)p^2.
$$

Theorem A therefore gives agreement at least $k_0/(800p)\ge\epsilon/160000$. This is the exponent-$1/2$ calculation. Its only unresolved campaign premise is the existence of the component with $\tau\le\Lambda\epsilon$.

**[P10] (proved: realizable balanced-color graph).** Independently color every point and every affine line uniformly from $[K]$, inject the colors into $\mathbb F_p$, put $f(x)$ equal to the point color, and make $P_L$ the corresponding constant line color. Conditional on a vertex color, its accepted degree is binomial with mean $p/K$ on the line side or $(p+1)/K$ on the point side. A Chernoff bound followed by a union bound over fewer than $3p^2$ vertices has failure probability at most $6p^2e^{-p/(12K)}<1$. Therefore a deterministic realization with the claimed degree bounds exists. These constant line polynomials are degree at most the fixed campaign degree $d>100$; this is not an analysis of the excluded case $d=0$.

**[P11] (proved: cover lower bound).** Let $S$ be the points incident to an accepted edge from $R$. The line-degree upper bound gives $|S|\le2p|R|/K$. If every line has at least half its accepted points in $S$, summing over all $p(p+1)$ lines gives at least $p^2(p+1)/(4K)$ accepted incidences from $S$. The point-degree upper bound is $2(p+1)/K$, so $|S|\ge p^2/8$. Hence $|R|\ge Kp/16$. Since $\epsilon\ge1/(2K)$, this is at least $p/(32\epsilon)$. Finally, $f$ takes only $K$ values, so one constant has agreement at least $1/K\ge\epsilon/2$.

## Exponent Ledger

| Stage | Input | Output/loss |
|---|---|---|
| KTZ reconstruction | $|R|=O(p/\epsilon)$ | $D=O(\sqrt{dp/\epsilon})$; $D<\epsilon p$ gives $\epsilon^3\gtrsim d/p$ |
| Component sampling | $t=\tau p(p+1)$, degree $k$ | $|R|=\Theta(t/k)=\Theta(\tau p^2/k)$; Chernoff/union losses are constant |
| Interpolation | $r=|R|$ | $D=\Theta(\sqrt{dr})=O(\sqrt{d\tau p^2/k})$ |
| Extension | root supply $k$ | $D<k$ requires $k^3\gtrsim d\tau p^2$ |
| Degenerate deletion | bad edges $pD^2+Dt$ | relative loss $O(dp/k^2+D/k)$, requiring $k^2\gtrsim dp$ |
| Mixing | minimum degree $k_1$ | $p^{-1/2}\lesssim k_1/p$; absorbed because $d>100$ and $k^2\gg dp$ |
| Global agreement | surviving component | $\Pr[Q=f]\ge k/(800p)$; no power loss |
| Small-component corollary | $k=\Theta(\epsilon p)$, $\tau=O(\epsilon)$ | both constraints become $\epsilon^2\gtrsim d/p$ |
| Global-cover obstruction | $\epsilon=\Theta(1/K)$ | every uniform cover has $|R|=\Omega(Kp)=\Omega(p/\epsilon)$ |

## Counterexample Attempts

The balanced-color table proves that the $p/\epsilon$ global-cover scale is not merely an artifact of independent sampling. It is an actual degree-at-most-$d$ line-versus-point table. It does not refute soundness, because a constant decoder already has agreement $\Omega(\epsilon)$.

Concentrating all good lines in a subset of directions also does not refute the conditional result. With at least two good directions, the accepted graph is connected, has line measure $\tau=\epsilon$, and is governed by the planted polynomial.

Independent random tables accept with probability about $1/p$, far below the campaign range. Attempts using $t^p-t$ or other inseparable functional aliases require line degree at least $p$ and are excluded by $d<p$.

At the lower boundary $d=101$, the square-root scale decreases from about $0.9902$ at $p=103$ to $0.1005$ at $p=10007$. When $d$ approaches $p$, both cube-root and square-root scales approach one, and the large-constant hypotheses become vacuous. No near-$p$ counterexample is claimed.

## Characteristic Audit

The proof is entirely over the prime field and keeps $D<p$. Formal and functional identities cannot be confused for line polynomials because $d<p$. The eligible-monomial restriction ensures $A_Z\ne0$. Squarefreeness and perfectness rule out an inseparable irreducible factor with all partial derivatives zero. The generic derivative is chosen over $\mathbb F_p$ using fewer than $p$ exceptional hyperplanes. Resultants, rather than discriminant division, control common line roots. Newton lifting divides only by a certified nonzero simple-root derivative. Ordinary interpolation is used with no hidden multiplicities or Hasse-derivative assumptions.

## Limitations

The result does not prove that every accepted core contains a component with $\tau=O(\epsilon)$. A single connected component may have $\tau$ close to one, in which case the new parameter law returns the cubic benchmark. The explicit constant $2^{40}$ is safe but intentionally very loose, making the finite nonvacuous range much smaller than the exponent notation suggests. Proposition C obstructs only a single cover required to work for every line; it does not obstruct an algebraically informed decoder or an adaptive localization argument. Finite computations above are falsification checks only and play no role in the asymptotic proof.
