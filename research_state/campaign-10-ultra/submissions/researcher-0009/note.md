# Sharp Higher-Moment Envelopes and Raw-DRC Barriers for Good Affine Incidences

## Abstract

Fix a prime $p$, an integer $101\le d<p$, and dimension $m=2$. I prove sharp all-order lower bounds for point-centered and line-centered distinct-star moments of the accepted-incidence graph. The bounds are the adjacent-integer convex envelopes of falling factorials. I then give an explicit legal line-versus-point table at local agreement $\epsilon_0=d/p$ whose accepted graph is connected, has full point and line support, and attains both families of moment bounds simultaneously for every admissible order. On the same table, every fractional family that reaches a $\theta$ fraction of the accepted points of every line through other accepted lines has weight $\Theta(\theta p/\epsilon_0)$, with exact bounds differing by at most $1.02$.

Every affine point-line incidence graph is $K_{2,2}$-free, so ordinary common-neighborhood dependent random choice on the raw accepted graph cannot produce a nontrivial biclique. I also prove an exact higher-moment DRC certificate for the auxiliary line-compatibility graph, including a concurrency correction that counts target lines receiving genuinely distinct intersection roots. Its acceptance-density-only specialization pays $\epsilon^{2t}$ at moment order $t$; direct insertion into KTZ interpolation needs $t>256d$ and is therefore much worse than the cubic route.

These results isolate a proof-architecture barrier, not a soundness counterexample. The explicit extremizer has $f=0$, and the single total-degree-zero polynomial $Q=0$ agrees globally everywhere. Accordingly, the unconditional exponent-$1/3$ benchmark is not improved.

## Test and Notation

Let $\mathcal L$ be the $p(p+1)$ affine lines of $\mathbb F_p^2$. Each line contains $p$ points and each point lies on $p+1$ lines. A valid table consists of

$$
f:\mathbb F_p^2\to\mathbb F_p,
\qquad
P_L\in\mathbb F_p[t],\quad \deg P_L\le d\quad(L\in\mathcal L),
$$

using a fixed affine parameterization of each line. Put

$$
E=\{(x,L):x\in L,\ P_L(x)=f(x)\},
\qquad
\epsilon=\frac{|E|}{p^2(p+1)}.
$$

This is exactly uniform affine-line sampling followed by a uniform point of the line. Because the incidence graph is biregular, it is equivalently a uniform point followed by a uniform incident line. Define accepted degrees

$$
a_x=|\{L\ni x:(x,L)\in E\}|,
\qquad
b_L=|\{x\in L:(x,L)\in E\}|.
$$

For integers $u,s\ge0$, let $(u)_s=u(u-1)\cdots(u-s+1)$, with $(u)_0=1$. For $\mu\in[0,n]$, write $k=\lfloor\mu\rfloor$ and $\rho=\mu-k$, and define the adjacent-integer interpolation

$$
J_s(\mu)=(1-\rho)(k)_s+\rho(k+1)_s.
$$

For $0\le s\le p+1$, let $\Gamma_s^P$ be the probability that, after choosing uniform $x$, an ordered $s$-tuple of distinct lines through $x$ consists entirely of accepted incidences. For $0\le s\le p$, define $\Gamma_s^L$ analogously by choosing a uniform line and an ordered $s$-tuple of distinct points on it. Tildes, as in $\widetilde\Gamma_s^P$, denote independent sampling with replacement.

For fractional reaching, let $\lambda_M\ge0$ be line weights and set

$$
u_{x,L}(\lambda)=
\min\left\{1,
\sum_{\substack{M\ni x,\ M\ne L\\(x,M)\in E}}\lambda_M
\right\}.
$$

The weights are $\theta$-reaching if

$$
\sum_{x:(x,L)\in E}u_{x,L}(\lambda)\ge\theta b_L
$$

for every line $L$, where $0<\theta\le1$. Let $\operatorname{OPT}_\theta$ be the minimum of $\sum_M\lambda_M$.

Finally, the auxiliary compatibility graph $H$ has vertex set $\mathcal L$. Distinct lines are adjacent when they are nonparallel and both accept at their unique intersection.

## Prior Results

The benchmark is [Kominers--Thaler--Zheng, Revision 1, Theorem 1.1](https://eccc.weizmann.ac.il/report/2026/147/revision/1/download/): over every finite field, acceptance $\epsilon\ge C(d/q)^{1/3}$ yields one total-degree-at-most-$d$ polynomial with global agreement at least $c\epsilon$. Only its $m=2$, $q=p$ specialization is used here.

The following exponent explanation is my reconstruction, not a quoted KTZ theorem. KTZ Lemma 3.2 selects $|R|=O(p/\epsilon)$ lines. Lemmas 2.2 and 4.1--4.2 give a weighted-degree explainer

$$
D=O\!\left(\sqrt{dp/\epsilon}\right).
$$

Lemma 4.3 and the lifting step require $D=O(\epsilon p)$. Hence

$$
\sqrt{dp/\epsilon}=O(\epsilon p)
\quad\Longleftrightarrow\quad
\epsilon^3=\Omega(d/p).
$$

The active verifier board accepts two earlier results. Researcher-0002 proves a component-sensitive decoder and a conditional exponent $1/2$ when a pruned component has line measure $O(\epsilon)$. Researcher-0006 isolates singular lifted incidences as an algebraic obstruction. Researchers 0001, 0004, 0005, 0007, and 0008 are revise-grade; researcher-0003's exact aggregate theorem was rejected for omitted interpolation hypotheses. In particular, researcher-0004 proves uniform interpolation multiplicity exponent-neutral, while researcher-0008 proves the exact second collision identity and a nearly regular carrier. The present note independently re-proves and strengthens the latter to every moment order, gives a simpler explicit carrier, and proves that its accepted graph is connected. The live leaderboards, rather than the launch-time data manifest, determine these statuses.

## Theorem

**Theorem 1 (sharp raw moments and a connected simultaneous extremizer).** Fix a prime $p$ and $101\le d<p$.

1. For every valid table of agreement $\epsilon$,

$$
\Gamma_s^P=
\frac{\mathbb E_x[(a_x)_s]}{(p+1)_s}
\ge
\frac{J_s((p+1)\epsilon)}{(p+1)_s}
\qquad(0\le s\le p+1),
$$

and

$$
\Gamma_s^L=
\frac{\mathbb E_L[(b_L)_s]}{(p)_s}
\ge
\frac{J_s(p\epsilon)}{(p)_s}
\qquad(0\le s\le p).
$$

For every integer $r\ge1$,

$$
\widetilde\Gamma_r^P\ge\epsilon^r,
\qquad
\widetilde\Gamma_r^L\ge\epsilon^r.
$$

2. There is an explicit legal table with $\epsilon_0=d/p$ such that its accepted graph is connected,

$$
b_L=d\quad\text{for every }L,
$$

and

$$
a_x=
\begin{cases}
d+1,&\text{at exactly }pd\text{ points},\\
d,&\text{at exactly }p(p-d)\text{ points}.
\end{cases}
$$

It simultaneously attains both distinct-star lower envelopes for every admissible $s$:

$$
\Gamma_s^P=
\frac{(1-d/p)(d)_s+(d/p)(d+1)_s}{(p+1)_s},
\qquad
\Gamma_s^L=\frac{(d)_s}{(p)_s}.
$$

Its line-centered with-replacement moments equal $\epsilon_0^r$ for every $r\ge1$.

3. On this table, for every $0<\theta\le1$,

$$
\frac{\theta p(p+1)}{d+1}
\le\operatorname{OPT}_\theta
\le
\frac{\theta p(p+1)}{d-1}.
$$

4. Every accepted affine point-line graph is $K_{2,2}$-free. Thus two or more distinct vertices sampled from either shore have at most one common neighbor on the other shore.

The constructed table has $f=0$, and $Q=0$ has global agreement one.

**Theorem 2 (auxiliary compatibility-graph DRC with concurrency correction).** For any valid table, let $N=p(p+1)$, $\mu=(p+1)\epsilon$, and let $\bar\Delta$ be the average degree of $H$. Then

$$
e(H)=\sum_x\binom{a_x}{2},
\qquad
\bar\Delta\ge\frac{p\mu(\mu-1)}{p+1}.
$$

For every integer $1\le t\le\lfloor\bar\Delta\rfloor$, define

$$
M_t(H)=
\frac{\sum_{L\in\mathcal L}\binom{\deg_H(L)}t}{\binom Nt}.
$$

There is a set $S$ of $t$ distinct seed lines with at least $M_t(H)$ common neighbors. If $1\le h\le t$ and $h_L$ is the number of distinct points among $\{L\cap M:M\in S\}$, then the same $S$ has at least

$$
M_t(H)-
\frac{\binom t2(p+1)}{t-h+1}
$$

common-neighbor lines satisfying $h_L\ge h$. Moreover,

$$
M_t(H)\ge
N\frac{\binom{\lfloor\bar\Delta\rfloor}t}{\binom Nt}.
$$

If $\mu\ge2$ and $\bar\Delta\ge2t+2$, the last expression is at least $N(\epsilon^2/4)^t$.

## Proof or Conditional Proof

### [P1] — proved: exact star identities

Double counting accepted incidences gives

$$
\mathbb E_x a_x=(p+1)\epsilon,
\qquad
\mathbb E_L b_L=p\epsilon.
$$

At a fixed point $x$, precisely $(a_x)_s$ ordered tuples of $s$ distinct incident lines are wholly accepted, out of $(p+1)_s$. Averaging proves the point identity. The line identity is identical with $b_L$ and $(p)_s$. No independence or concentration estimate is used.

### [P2] — proved: sharp discrete moment lower envelope

For $F_s(j)=(j)_s$ on nonnegative integers,

$$
\Delta F_s(j)=s(j)_{s-1},
\qquad
\Delta^2F_s(j)=s(s-1)(j)_{s-2}\ge0.
$$

Thus the piecewise-linear interpolation of $F_s$ is convex. Jensen gives

$$
\mathbb E[(A)_s]\ge J_s(\mathbb EA)
$$

for every integer-valued degree variable $A$. The minimizer need not be unique when the falling factorial vanishes, but the adjacent-integer mixture always attains the minimum. Applying this to [P1] proves the distinct-star inequalities.

For sampling with replacement,

$$
\widetilde\Gamma_r^P=
\mathbb E_x\left(\frac{a_x}{p+1}\right)^r,
\qquad
\widetilde\Gamma_r^L=
\mathbb E_L\left(\frac{b_L}{p}\right)^r.
$$

Ordinary Jensen for $z\mapsto z^r$ gives the two $\epsilon^r$ bounds. Repeated samples must not be confused with distinct constraints: $a^r=\sum_j {r\brace j}(a)_j$ includes duplicate-line events.

### [P3] — proved: explicit legal carrier

Let

$$
S_d=\{0,1,\ldots,d-1\}\subset\mathbb F_p
$$

and set $f(x,y)=0$. For a nonvertical line

$$
L_{m,b}(t)=(t,mt+b),
$$

set

$$
P_{m,b}(t)=\prod_{s\in S_d}(t+m-s).
$$

For the vertical line $V_c(t)=(c,t)$, set

$$
P_{V_c}(t)=\prod_{s\in S_d}(t-s).
$$

All labels have formal degree exactly $d<p$. A nonvertical incidence at $(x,y)$ accepts exactly when $x+m\in S_d$. Therefore every point has exactly $d$ accepted nonvertical lines, one for each slope $m=s-x$, $s\in S_d$. Its vertical line also accepts exactly when $y\in S_d$. Hence the asserted point degrees hold. Every nonvertical line has the $d$ roots $t=s-m$, and every vertical line has the $d$ roots $t=s$. Thus every line degree is $d$.

There are $dp(p+1)$ accepted incidences, so

$$
\epsilon_0=
\frac{dp(p+1)}{p^2(p+1)}=rac dp.
$$

### [P4] — proved: connectivity

Because $d\ge101$, the elements $0,1,2$ belong to $S_d$. For any $(x,y)$, put

$$
C=(x-1,y+x-1).
$$

The points $(x,y)$ and $C$ lie on a line of slope $1-x$ and have acceptance values $x+(1-x)=1$ and $(x-1)+(1-x)=0$. The points $C$ and $(x,y+1)$ lie on a line of slope $2-x$ and have acceptance values $1$ and $2$. Thus $(x,y)$ and $(x,y+1)$ are joined by a four-edge accepted path.

Also, $(x,y)$ and $(x+1,y-x)$ share the accepted line of slope $-x$, since their acceptance values are $0$ and $1$. Vertical unit moves connect every point in a fixed column; the second move connects column $x$ to column $x+1$. Since $1$ generates the additive group of the prime field, every point vertex lies in one component. Every line vertex has $d>0$ accepted neighbors, so the full accepted bipartite graph is connected.

### [P5] — proved: simultaneous moment extremality

For the carrier,

$$
(p+1)\epsilon_0=d+d/p.
$$

The point-degree distribution is exactly the adjacent mixture at this mean: degree $d+1$ has probability $d/p=\epsilon_0$, and degree $d$ has probability $1-\epsilon_0$. The line mean is $p\epsilon_0=d$, and every line has that degree. Equality therefore holds in both inequalities of [P2] for every admissible $s$.

In particular, $\Gamma_s^L=0$ for $s>d$ and $\Gamma_s^P=0$ for $s>d+1$. Fixed mean alone cannot manufacture more distinct algebraic constraints than the local degree permits. At $s=2$,

$$
\Gamma_2^P=
\epsilon_0^2-
\frac{\epsilon_0(1-\epsilon_0)}{p+1}.
$$

For $2\le s\le(d+1)/2$,

$$
2^{-(s-1)}\epsilon_0^s
\le\frac{(d)_s}{(p)_s}
\le\epsilon_0^s.
$$

The exact product, rather than this coarse comparison, is retained in the theorem.

### [P6] — proved: fractional other-line reaching

Weights may be truncated to $[0,1]$ without changing capped loads; compactness therefore makes the minimum attainable. Put

$$
v_x=
\min\left\{1,
\sum_{M\ni x:(x,M)\in E}\lambda_M
\right\}.
$$

Since $u_{x,L}\le v_x$, any $\theta$-reaching weights satisfy

$$
\theta d\,p(p+1)
\le\sum_x a_xv_x
\le(d+1)\sum_xv_x
\le d(d+1)\sum_M\lambda_M.
$$

This proves the lower bound. Conversely, assign every line weight $\theta/(d-1)$. At an accepted incidence, at least $a_x-1\ge d-1$ other accepted lines occur, so $u_{x,L}\ge\theta$. This proves the upper bound. Their ratio is

$$
\frac{d+1}{d-1}\le\frac{102}{100}.
$$

Since $d=p\epsilon_0$, the cost is $\Theta(\theta p/\epsilon_0)$ with explicit constants.

### [P7] — proved: raw DRC collapse

Two distinct affine points determine one affine line, and two distinct affine lines meet in at most one point. Hence the full affine incidence graph, and every accepted subgraph, contains no $K_{2,2}$. A common-neighborhood DRC sample containing at least two distinct raw vertices therefore has common neighborhood of size at most one. If sampling with replacement appears to give a large common neighborhood, after deduplication it is either a one-vertex star or has common neighborhood at most one.

This assertion concerns only the raw point-line graph. Auxiliary compatibility graphs may contain many four-cycles.

### [P8] — proved: auxiliary edge count

Every unordered pair of accepted lines through $x$ gives one edge of $H$, and every edge has a unique intersection point. Therefore

$$
e(H)=\sum_x\binom{a_x}{2}.
$$

Since $N=p(p+1)$,

$$
\bar\Delta=
\frac{2e(H)}N
=rac{p\,\mathbb E_x[a_x(a_x-1)]}{p+1}
\ge\frac{p\mu(\mu-1)}{p+1},
$$

where the last step is convexity. The sharper adjacent-integer form follows by replacing $\mu(\mu-1)$ with $J_2(\mu)$.

### [P9] — proved: exact auxiliary DRC moment

Count pairs $(S,L)$ in which $S$ is a $t$-element subset of $N_H(L)$. Their number is

$$
\sum_L\binom{\deg_H(L)}t.
$$

Averaging over the $\binom Nt$ choices of $S$ gives a seed set with at least $M_t(H)$ common neighbors. Discrete convexity of $j\mapsto\binom jt$ gives

$$
M_t(H)\ge
N\frac{\binom{\lfloor\bar\Delta\rfloor}t}{\binom Nt}.
$$

If $\bar\Delta\ge2t+2$, every numerator factor is at least $\bar\Delta/2$, so the ratio is at least $(\bar\Delta/(2N))^t$. By [P8] and $\mu\ge2$,

$$
\frac{\bar\Delta}{2N}
\ge
\frac{\mu(\mu-1)}{2(p+1)^2}
\ge\frac{\epsilon^2}{4}.
$$

This proves the simplified bound.

### [P10] — proved: concurrency correction

Fix the seed set from [P9]. For a common neighbor $L$, partition the $t$ seed lines according to their intersection point with $L$. If fewer than $h$ distinct points occur, the partition creates at least $t-h+1$ colliding seed pairs. A fixed pair of seed lines can collide on at most the $p+1$ lines through their own intersection; a parallel pair contributes none. Double counting bad targets and colliding seed pairs gives

$$
|\{L\in N_H(S):h_L<h\}|
\le
\frac{\binom t2(p+1)}{t-h+1}.
$$

Subtracting this from the common-neighbor count proves Theorem 2. If an explainer vanishes identically on every seed graph, each of the $h_L$ distinct intersections is a distinct root on the target graph, so the correction measures the root supply relevant to interpolation.

### [P11] — proved: direct DRC insertion is quantitatively insufficient

In the KTZ coefficient-count construction, interpolating $t$ seed graphs uses

$$
D_t=16(\lfloor\sqrt{dt}\rfloor+1).
$$

Even before cleanup, transfer to a common-neighbor target needs $h_L>D_t$. Since $h_L\le t$, this forces

$$
t>D_t>16\sqrt{dt},
\qquad\text{hence}\qquad t>256d.
$$

Replacing the exact auxiliary moment $M_t(H)$ by the guarantee obtainable from acceptance density alone gives $N(\epsilon^2/4)^t$. At the benchmark scale $\epsilon=C(d/p)^{1/3}$, for fixed admissible $d$ and fixed $t>256d$,

$$
N(\epsilon^2/4)^t
=O_{C,d,t}(p^{2-2t/3})
\longrightarrow0.
$$

Thus this black-box all-common-neighbor DRC certificate does not even guarantee one target line in the lower-boundary asymptotic regime. This does not rule out exploiting larger observed moments, label classes, or special structure in $H$.

### [P12] — proved: scope of the obstruction

The carrier from [P3]--[P6] is connected, uses every line, attains all degree-distribution moment minima, and has essentially maximal universal reaching cost, yet $Q=0$ decodes it perfectly. Consequently, a valid stronger soundness proof may not treat moment regularity, broad support, connectivity, or large reaching cost alone as evidence of hardness. It must branch on polynomial-label or value coherence. This is a precise incidence-only obstruction, not a claim that every auxiliary or label-aware DRC argument fails.

## Exponent Ledger

| Stage | Input | Loss | Output/status |
|---|---|---|---|
| Degree means | $\epsilon$ | none | $(p+1)\epsilon$ and $p\epsilon$; proved |
| Repeated $s$-moment | $\epsilon$ | $s$th power | at least $\epsilon^s$; sharp; proved |
| Distinct $s$-moment | mean degree | exact falling-factorial correction | $J_s(\mu)/(n)_s$; sharp; proved |
| Compatibility graph | $\epsilon$ | two acceptances | density scale $\epsilon^2$; proved |
| Auxiliary DRC | compatibility density | $t$th power | density-only certificate $N(\epsilon^2/4)^t$; proved under stated hypotheses |
| Direct root supply | $D_t=16(\lfloor\sqrt{dt}\rfloor+1)$ | $h\le t$ | requires $t>256d$; proved |
| Cubic-scale DRC substitution | $\epsilon=C(d/p)^{1/3}$ | $\epsilon^{2t}$ | $O(p^{2-2t/3})\to0$ for fixed $t>256d$; proved |
| Fractional reaching | $\epsilon_0=d/p$ | one inverse $\epsilon_0$ | $\Theta(\theta p/\epsilon_0)$; proved |
| KTZ selector | $\epsilon$ | $\epsilon^{-1}$ | $|R|=O(p/\epsilon)$; quoted |
| KTZ interpolation | $|R|$ | square root | $D=O(\sqrt{dp/\epsilon})$; reconstructed |
| KTZ transfer | $D=O(\epsilon p)$ | cubic comparison | $\epsilon^3=\Omega(d/p)$; reconstructed |
| Constructed decoder | $f=0$ | none | global agreement $1$; proved |

No logarithmic, Markov, union, or Cauchy--Schwarz loss is hidden in the new results.

## Counterexample Attempts

The connected carrier is a successful counterexample to any universal claim that higher degree moments, connectivity, full support, or fractional relaxation automatically produce an $o(p/\epsilon)$ reaching family. It is not a soundness counterexample: the labels visibly share $Q=0$.

Concentrated good directions give a complementary stress test. Choose $k$ projective directions, put $f=0$, label their lines by zero and every other line by one. Every point has accepted degree $k$, so all point-centered with-replacement moments equal $\epsilon^s$ exactly for $\epsilon=k/(p+1)$. However, the auxiliary compatibility graph between two accepted parallel classes contains a $K_{p,p}$. Thus raw-graph $K_{2,2}$-freeness cannot be asserted for $H$.

The prior modal construction at ambient $d=101$ genuinely refutes a uniform exact-linear trigger $C d/p$ with global recovery $c\epsilon$, but its local agreement is $\Theta(\log p/(p\log\log p))$, below every fixed $(101/p)^{1-\eta}$ trigger. It does not obstruct the long-term target.

A random point table with linewise interpolation guarantees roughly $d/p$ local agreement and can rule out exponents above one in suitable regimes. It does not yield a uniform fixed-$\eta$ counterexample, especially when $d$ approaches $p$, and is not used in the theorem.

No inseparable construction affects the proof: $d<p$ prevents $t^p-t$ aliases. At $d=p-1$ the carrier remains valid and connected. At the lower boundary $d=101$, the first possible prime $p=103$ satisfies all denominators and root counts.

## Characteristic Audit

- The field is exactly $\mathbb F_p$ and $101\le d<p$ throughout.
- The set $S_d$ consists of distinct field elements. Each line label is a product of $d$ distinct linear factors and has exactly $d$ roots.
- No derivative, Hasse derivative, discriminant, resultant, irreducibility, or absolute irreducibility input is used.
- No field division by a derivative or slope occurs. Vertical lines are handled by their own parameterization.
- The fractional division by $d-1$ is over the real weight space and is valid because $d\ge101$.
- The global polynomial $Q=0$ is a total-degree-at-most-$d$ decoder in an ambient test with $d>100$; no excluded degree parameter is analyzed.
- The new proof has no Markov, union-bound, or Cauchy--Schwarz step. Discrete and ordinary Jensen losses are displayed exactly.
- KTZ's Chernoff/union/Chebyshev selector losses belong only to the cited comparison and do not change its power of $\epsilon$.
- Finite computations were used only to check formulas, never to prove the asymptotic statements.

## Limitations

The benchmark is not improved, and no new global soundness theorem is claimed. The explicit carrier lies at $\epsilon_0=d/p$, below every fixed $(d/p)^{1-\eta}$ trigger because $0<d/p<1$, and it has a perfect decoder.

The $K_{2,2}$ obstruction applies only to the raw point-line incidence graph. Auxiliary compatibility graphs, factor graphs, and lifted incidence graphs may contain large bicliques. Theorem 2 is therefore a usable diagnostic rather than an impossibility theorem for all DRC variants.

The density-only lower bound for $M_t(H)$ can be far from the actual higher moment. A successful proof could exploit unusually large compatibility moments, provided it also controls concurrency and singular lifted roots. Conversely, the present note gives no realizable pseudorandom example proving that the auxiliary bound is sharp.

Finally, moment and cover data discard polynomial labels. The connected carrier shows exactly why a future proof needs a sparsify-or-decode dichotomy: when incidence sparsification fails, the failure may itself reflect a common algebraic explanation that should be decoded directly.
