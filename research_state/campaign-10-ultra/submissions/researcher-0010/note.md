# Popularity-sensitive core decoding and a bounded-star-energy obstruction

## Abstract

Fix a prime field $F_p$, dimension $m=2$, and an integer $100<d<p$. I prove an asymmetric refinement of the accepted-component decoder. If an accepted subgraph has point minimum degree $u$, line minimum degree $v$, line measure $τ$, and $w=min(u,v)$, then the two conditions

$$
uv \ge 2^{60}dp,
\qquad
uw^2 \ge 2^{60}dτp^2
$$

force one total-degree-at-most-$d$ polynomial to agree with the point table on at least $v/(800p)$ of all points.

For the original accepted graph, let $u_*$ be the largest point-degree threshold supporting accepted-incidence mass at least $ε/2$. The component theorem implies

$$
u_*ε^2 \ge 2^{70}d
\quad\Longrightarrow\quad
agr(f,Q) \ge ε/12800.
$$

Thus a hypothesis $u_*\ge κ ε^a p$ gives the conditional threshold $ε\ge(2^{70}/κ)^{1/(a+2)}(d/p)^{1/(a+2)}$. This interpolates from exponent $1/3$ at the universally available scale $u_*=Ω(εp)$ to exponent $1/2$ when $u_*=Ω(p)$. It does not improve the unconditional benchmark.

I also prove a template-popularity lemma and a complementary obstruction: for every fixed star order, diffuse modal-constant tables can have star energy only $O(ε^s)$ while every degree-101 global polynomial has agreement $o(ε)$. Consequently, a scale-free bounded-order collision-energy increment cannot supply the missing popularity.

## Test and Notation

There are $p^2$ points and $p(p+1)$ affine lines. Every point lies on $p+1$ lines and every line contains $p$ points. Each affine line $L$ carries a univariate polynomial $P_L$ of degree at most the ambient integer $d$, and $f:F_p^2\to F_p$ is the point table. The sampling rule is exactly a uniformly random affine line followed by a uniformly random point on it; equivalently, it is a uniform affine incidence. Put

$$
ε=Pr_{L,\,x\in L}[P_L(x)=f(x)].
$$

The accepted graph has edge $(x,L)$ exactly when $x\in L$ and $P_L(x)=f(x)$. All global polynomials below have total degree at most $d$.

For a subgraph $G=(X,T,E)$, let

$$
t=|T|,
\qquad
τ=\frac{t}{p(p+1)},
$$

and let $u$ and $v$ denote its point-side and line-side minimum degrees, respectively. For the full accepted graph, write $a_x$ for the accepted degree of $x$ and define the absolute upper-tail incidence mass

$$
δ_j=\frac{1}{p^2(p+1)}\sum_{x:a_x\ge j}a_x,
\qquad
u_*=max\{j\in\{1,\ldots,p+1\}:δ_j\ge ε/2\}.
$$

When $ε>0$, this set is nonempty. Since points below $ε(p+1)/2$ carry less than half of all accepted edges,

$$
u_*\ge \left\lceil\frac{ε(p+1)}2\right\rceil.
$$

For $s\ge2$, $Γ_s$ denotes the probability that $s$ ordered distinct uniformly sampled lines through a uniform point all accept there.

## Prior Results

The exact benchmark is Theorem 1.1 of [Kominers--Thaler--Zheng, ECCC TR26-147, Revision 1](https://eccc.weizmann.ac.il/report/2026/147/revision/1/download/): over every finite field, $ε\ge C(d/p)^{1/3}$ implies one total-degree-at-most-$d$ polynomial with agreement at least $cε$. The following explanation of the exponent is my reconstruction, not a separately quoted theorem: their Lemma 3.2 gives $|R|=O(p/ε)$, Lemma 2.2 gives an explainer degree $D=O(\sqrt{dp/ε})$, and identity extension and lifting require $D=O(εp)$. Hence $ε^3=Ω(d/p)$.

The present proof uses KTZ Revision 1, Lemmas 2.1--2.3, 2.5--2.7, 6.1, and 6.3. The local cached KTZ file is the earlier July 2026 version; theorem numbering is stable, but the revision above is the pinned source. The cached Arora--Sudan file is the STOC 1997 version rather than the Combinatorica 2003 article recorded in the bibliography, and no theorem-number transfer from that cache is used.

The durable corpus was audited through [DATA_MANIFEST.json](/Users/kaizheng/Documents/ChatGPT/Line-vs-Point/research_state/DATA_MANIFEST.json), all eight active campaign-10 submissions, their verifier audits, all active leaderboards, and the empty campaign-300 leaderboards; directories named `superseded` were excluded. The main reusable prior result is the verifier-accepted symmetric component theorem in [researcher-0002](/Users/kaizheng/Documents/ChatGPT/Line-vs-Point/research_state/campaign-10-ultra/submissions/researcher-0002/note.md). The exact pair-collision and regular-carrier obstruction in [researcher-0008](/Users/kaizheng/Documents/ChatGPT/Line-vs-Point/research_state/campaign-10-ultra/submissions/researcher-0008/note.md) shows that graph regularity alone gives no energy surplus. The verified singular-lift obstruction in [researcher-0006](/Users/kaizheng/Documents/ChatGPT/Line-vs-Point/research_state/campaign-10-ultra/submissions/researcher-0006/note.md) remains relevant to any future factorwise refinement.

For historical comparison only, Theorem 4.2 of [Harsha--Kumar--Saptharishi--Sudan, arXiv v1](https://arxiv.org/abs/2311.12752) states the bivariate condition $p>Cd/ε^7$. It is not used in the proof.

## Theorem

**Theorem A (proved asymmetric core decoder).** Let $p$ be prime, let $100<d<p$, and let $G=(X,T,E)$ be a nonempty accepted subgraph. Suppose every $x\in X$ has degree at least the integer $u$, every $L\in T$ has degree at least the integer $v$, $τ=|T|/[p(p+1)]$, and $w=min(u,v)$. If

$$
uv\ge2^{60}dp,
\qquad
uw^2\ge2^{60}dτp^2,
$$

then there is a single $Q\in F_p[X,Y]$ of total degree at most $d$ satisfying

$$
Pr_x[Q(x)=f(x)]\ge\frac{v}{800p}.
$$

Connectedness of the input is not required.

**Corollary B (proved implication; conditional exponent).** With $u_*$ defined above, if

$$
u_*ε^2\ge2^{70}d,
$$

then some total-degree-at-most-$d$ polynomial satisfies $agr(f,Q)\ge ε/12800$. More generally, if $0\le a\le1$, $0<κ\le1$, and $u_*\ge κ ε^a p$, then the conclusion holds whenever

$$
ε\ge\left(\frac{2^{70}}κ\right)^{1/(a+2)}
       \left(\frac dp\right)^{1/(a+2)}.
$$

The exponent improvement for $a<1$ is conditional because no such popularity tail is known for every table.

**Lemma C (proved template popularity).** Let $T_1,\ldots,T_R$ be disjoint line families and let $Q_1,\ldots,Q_R$ be total-degree-at-most-$d$ polynomials such that $P_L=Q_j|_L$ for $L\in T_j$. Let $τ_j=|T_j|/[p(p+1)]$, $τ=\sum_jτ_j$, let $δ>0$ be the normalized accepted-incidence mass on their union, and put $α=max_j agr(f,Q_j)$. Then

$$
δ\le ατ+\sqrt{\frac{Rατ}{p+1}}.
$$

In particular, $R\leδ(p+1)$ implies $α\geδ/4$.

**Proposition D (proved bounded-star-energy obstruction).** Fix $S\ge2$. For all sufficiently large primes $p$, at the legal ambient degree $d=101$ there is a deterministic table using constant line polynomials such that, for

$$
r=\left\lfloor\frac{\log p}{4\log\log p}\right\rfloor,
$$

one has

$$
\frac{r}{130p}\le ε\le\frac{26r}{p},
\qquad
max_{deg Q\le101}agr(f,Q)<\frac2p,
$$

and, simultaneously for $2\le s\le S$,

$$
Γ_s\le2^{s+2}(S-1)ε^s.
$$

A fully explicit sufficient meaning of sufficiently large is obtained by setting $u_0=\lceil4\log p/\log\log p\rceil$ and $v_0=\lceil8\log p/\log\log p\rceil$ and requiring

$$
r\ge133,
\quad r^2\le p,
\quad p\ge8r!,
\quad u_0+1\le17r,
\quad v_0\le33r,
$$

$$
\frac{2p}{(u_0+1)!}\le1,
\quad
\frac{2p^3}{v_0!}\le\frac18,
\quad
p^{5253}(e/4)^p\le\frac18,
\quad
S\le p+1.
$$

## Proof or Conditional Proof

**[P1] (proved: asymmetric mixing).** Put $ξ=|X|/p^2$, $ρ=|E|/[p^2(p+1)]$, $α_0=u/(p+1)$, $β_0=v/p$, and $λ=(p+1)^{-1/2}$. Minimum degree and KTZ Lemma 2.1 give

$$
α_0ξ\leρ,
\qquad
β_0τ\leρ,
\qquad
ρ\leξτ+λ\sqrt{ξτ}.
$$

If $τ<α_0/4$, the first and third inequalities imply $ξ<(16/9)λ^2τ/α_0^2$. Substitution into the third inequality and comparison with $β_0τ\leρ$ give $α_0β_0<2λ^2$, or $uv<2p$. This contradicts the first hypothesis. The symmetric calculation gives

$$
τ\ge\frac{u}{4(p+1)},
\qquad
ξ\ge\frac{v}{4p}.
$$

Thus $t\ge up/4$. Substituting the line-measure bound into the second hypothesis yields

$$
w^2\ge\frac{2^{60}dp^2}{4(p+1)}\ge2^{57}dp.
$$

This last inequality, rather than an unstated fixed-$d$ assumption, supplies all logarithmic room below.

**[P2] (proved: selector and probability losses).** The first hypothesis and $v\le p$ give $u>8$. Select every line of $T$ independently with probability $8/u$. A point accepted on a target line $L$ is called reached only through a selected line in $R$ other than $L$. It has at least $u-1$ eligible lines, so its reach probability exceeds $3/4$. For distinct points of $L$, the eligible line sets are disjoint because two distinct points determine their unique common line, which is the excluded line $L$. Chernoff therefore bounds the probability that at most half of $N_G(L)$ is reached by $e^{-v/24}$.

Since $v\ge w\ge\sqrt{2^{57}dp}$, $2p^2e^{-v/24}<1/4$; this accounts explicitly for the union bound over all target lines. The sample-size mean is $8t/u\ge2p$. Its lower- and upper-tail Chernoff bounds are respectively at most $e^{-p/4}$ and $e^{-2p/3}$. Hence some choice has

$$
\frac{4t}{u}\le r=|R|\le\frac{16t}{u}
$$

and reaches more than half of every line's accepted points. In particular, $r\ge p$.

**[P3] (proved: interpolation).** Set

$$
D=16(\lfloor\sqrt{dr}\rfloor+1).
$$

Then $D^2>256dr$ and

$$
D^2\le1024dr
 \le2^{14}\frac{dt}{u}
 \le2^{15}\frac{dτp^2}{u}
 \le2^{-45}w^2.
$$

Thus $D<w/5000$, $D<p$, and $r\ge p>D$. KTZ Lemma 2.2 gives $dim V_D\ge D^3/(64d)>r(D+1)$. Each formal identity on a selected line costs at most $D+1$ homogeneous conditions, so a nonzero candidate in $V_D$ exists. If it were Z-independent, KTZ Lemma 2.5 and $r>D$ would force it to vanish identically. Its allowed positive Z-exponents are not divisible by $p$, so its Z-derivative is nonzero.

Let $S_R$ be the finite union of the selected polynomial graphs and choose a nonzero polynomial $A$ of minimum weighted degree among polynomials vanishing on $S_R$ with $A_Z\ne0$. KTZ Lemma 2.3 makes $A$ squarefree. Its weight is at most $D<p$, so pointwise vanishing at all $p$ parameters on a selected line is a formal identity. This also explains why repeated-factor removal cannot lose the line identities.

**[P4] (proved: identity extension).** Every $L\in T$ has more than $v/2>D$ accepted points reached through a selected $M\ne L$. At such a point,

$$
P_L(x)=f(x)=P_M(x),
$$

so $A(x,P_L(x))=0$. The restricted polynomial $A(L(t),P_L(t))$ has degree at most $D$ and more than $D$ roots; hence it vanishes formally. There is no Markov or multiplicity loss at this step.

**[P5] (proved: prime-field simple-root cleanup).** Write $A=HB$, where $H(X,Y)$ is the gcd of the Z-coefficients of $A$. At most $D$ affine lines are contained in $H=0$. On every other line, division in the integral domain $F_p[t]$ gives $B(L(t),P_L(t))\equiv0$. The polynomial $B$ is squarefree, Z-primitive, Z-dependent, and has degree below $p$.

Moreover, $gcd(B,B_Z)=1$. Indeed, if an irreducible $C$ divided both, squarefreeness and reduction of $(CE)_Z$ modulo $C$ would give $C|C_Z$, hence $C_Z=0$. Since $deg_Z C<p$, this makes $C$ Z-independent, contradicting Z-primitivity. KTZ Lemma 2.6 now bounds the lines on whose graphs both $B$ and $B_Z$ vanish by $D(D-1)$. On every other line, $B_Z(L(t),P_L(t))$ is a nonzero polynomial of degree at most $D$, so it has at most $D$ accepted roots. Thus at most

$$
pD^2+Dt
$$

accepted edges are deleted. No discriminant or derivative is divided by.

**[P6] (proved: asymmetric pruning).** Since $|E|\ge vt$,

$$
\frac{pD^2+Dt}{|E|}
 \le\frac Dv+\frac{pD^2}{vt}
 \le\frac Dv+\frac{2^{14}dp}{uv}
 <\frac1{4000}.
$$

Let $u_1=\lfloor u/100\rfloor$ and $v_1=\lfloor v/100\rfloor$. Iteratively delete point vertices of current degree below $u_1$ and line vertices below $v_1$. This costs less than

$$
u_1|X|+v_1|T|\le |E|/50.
$$

A nonempty graph remains. The hypotheses imply $u_1\ge u/200$, $v_1\ge v/200$, and $u_1,v_1>D$.

**[P7] (proved: lift, propagate, recover measure).** Every surviving point is incident to an identity line and hence satisfies $B(x,f(x))=0$; retained edges also certify $B_Z(x,f(x))\ne0$. At a point in any surviving connected component, more than $D$ incident line roots satisfy the hypotheses of KTZ Lemma 6.1. It produces one total-degree-at-most-$d$ polynomial $Q$ with $B(X,Y,Q(X,Y))\equiv0$. The one-variable simple-root uniqueness used in KTZ Lemma 6.3 propagates this same $Q$ through the component.

Since $u_1v_1\ge uv/40000>2p$, [P1]'s asymmetric mixing calculation applied to this component gives point density at least

$$
\frac{v_1}{4p}\ge\frac{v}{800p}.
$$

The polynomial agrees with $f$ at every point of that component, proving Theorem A. There is no list-size or factor-count loss.

**[P8] (conditional: popularity-tail translation).** Let $δ_*=δ_{u_*}\geε/2$ and retain all accepted edges incident to points of degree at least $u_*$. Their number is $E_*=δ_*p^2(p+1)$. Peel point degrees below $U=\lfloor u_*/2\rfloor$ and line degrees below $V=\lfloorδ_*p/4\rfloor$. Point deletions cost at most $E_*/2$, and line deletions cost at most

$$
Vp(p+1)\le E_*/4.
$$

Thus a nonempty core remains. Under $u_*ε^2\ge2^{70}d$, floors give

$$
U\ge u_*/3,
\qquad
V\geδ_*p/8\geεp/16,
\qquad
min(U,V)\geεp/16.
$$

Consequently,

$$
UV\ge u_*εp/48>2^{60}dp
$$

and, for every component line measure $τ_C\le1$,

$$
Umin(U,V)^2
 \ge u_*ε^2p^2/768
 >2^{60}dτ_Cp^2.
$$

Theorem A gives agreement at least $V/(800p)\geε/12800$. If $u_*\geκ ε^a p$, the displayed hypothesis follows from $κ ε^{a+2}p\ge2^{70}d$. Universally $u_*\geεp/2$, so this recovers exponent $1/3$ with a large constant. For $a<1$ it is a genuine conditional improvement; $a=0$ gives exponent $1/2$.

**[P9] (proved: template popularity).** Put $S_j=\{x:Q_j(x)=f(x)\}$ and $α_j=|S_j|/p^2$. The carried edges in $T_j$ are exactly the incidences between $S_j$ and $T_j$. KTZ Lemma 2.1 gives

$$
δ\le\sum_jα_jτ_j+
\frac1{\sqrt{p+1}}\sum_j\sqrt{α_jτ_j}.
$$

The first term is at most $ατ$. Cauchy--Schwarz, the only loss here, bounds the second sum by $\sqrt{Rατ}$. This proves Lemma C. If $R\leδ(p+1)$ and $α<δ/4$, the two right-hand terms are below $δ/4$ and $δ/2$, a contradiction.

**[P10] (proved: constant-label branch).** For constant-labelled lines, group by their constant value $a$. The sets $\{x:f(x)=a\}$ are disjoint, so Cauchy--Schwarz uses $\sum_aPr[f=a]=1$ and removes the $R$ factor:

$$
δ\le μτ+\sqrt{\frac{τ}{p+1}},
\qquad
μ=max_aPr[f=a].
$$

Thus $δ\ge2\sqrt{τ/(p+1)}$ implies $μ\geδ/(2τ)\geδ/2$. If constant lines carry at least a $θ$ fraction of the total agreement, then $ε\ge2/[θ\sqrt{p+1}]$ already yields a constant global polynomial of agreement at least $θε/2$.

**[P11] (proved: exact star moments).** For every deterministic table,

$$
Γ_s=\frac{1}{p^2(p+1)_s}\sum_x(a_x)_s.
$$

The integer sequence $(n)_s$ is discretely convex. If $μ=ε(p+1)=k+θ$ with integer $k=\lfloor μ\rfloor$ and $0\leθ<1$, convexity gives the sharp degree-only lower bound

$$
Γ_s\ge
\frac{(1-θ)(k)_s+θ(k+1)_s}{(p+1)_s}.
$$

For $s=2$, expansion yields the exact identity

$$
Γ_2=ε^2-\frac{ε(1-ε)}p+
\frac{Var_x(a_x)}{p(p+1)}.
$$

Thus even perfectly regular accepted degrees supply only baseline collision energy $Θ(ε^2)$.

**[P12] (proved: modal occupancy and concentration).** Choose every value $f(x)$ independently and uniformly. On each line choose uniformly among its modal values, using fresh independent line coins, and use that value as the constant polynomial $P_L$. Symmetric independent tie-breaking is essential; arbitrary deterministic tie-breaking need not give the claimed star identity.

Let $M$ be the maximum occupancy when $p$ balls are thrown into $p$ bins and let $q=E[M]/p=E[ε]$. If $Y$ counts bins of occupancy exactly $r$, the explicit conditions in Proposition D give

$$
E[Y]\ge\frac{p}{8r!}\ge1,
\qquad
E[Y^2]\le E[Y]+\frac{p^2}{(r!)^2}\le65E[Y]^2.
$$

The second-moment inequality gives $Pr[M\ge r]\ge1/65$, hence $q\ge r/(65p)$. Conversely, $Pr[M\ge s]\le p/s!$, so the stated factorial condition gives $E[M]\le u_0+1\le17r$.

Changing one point value changes maxima on only its $p+1$ incident lines and changes $ε$ by at most $1/p^2$. McDiarmid therefore gives

$$
Pr[|ε-q|>q/2]
 \le2exp(-q^2p^2/2)
 \le2exp(-r^2/8450)
 \le1/4.
$$

**[P13] (proved: simultaneous low energy and no decoder).** Fix a point and condition on its value. The punctured incident lines partition all other points. Their values and the independent tie coins are independent. Label symmetry and double counting the $M$ modal positions show that each incident line accepts the point with probability exactly $q$. Hence $a_x$ is conditionally binomial and $E[Γ_s]=q^s$.

Markov at threshold $4(S-1)q^s$, followed by a union bound over $2\le s\le S$, fails with probability at most $1/4$. On $ε\ge q/2$, this gives $Γ_s\le2^{s+2}(S-1)ε^s$.

For each fixed total-degree-at-most-101 polynomial $Q$, its agreement count with random $f$ is $Bin(p^2,1/p)$, so

$$
Pr[agr(f,Q)\ge2/p]\le(e/4)^p.
$$

There are $p^{5253}$ candidates because $(101+1)(101+2)/2=5253$. Their union-bound failure is at most $1/8$. The probability that any line has modal occupancy at least $v_0$ is at most $2p^3/v_0!\le1/8$. All four bad-event probabilities total at most $3/4$, so a deterministic realization exists after freezing both $f$ and the tie coins. It has $r/(130p)\leε\le26r/p$, every line supports acceptance, every line accepts fewer than $v_0\le33r$ points, the stated star bounds, and no global decoder of agreement $2/p$.

**[P14] (refuted claim; obstruction proved).** Fix $s\ge2$, $γ>0$, and constants $c_0,c_1>0$. The scale-free assertion

$$
max_{deg Q\le101}agr(f,Q)\le c_0ε
\quad\Longrightarrow\quad
Γ_s\ge c_1ε^{s-γ}
$$

is false. Proposition D has global-to-local ratio below $260/r\to0$, while $Γ_s=O_s(ε^s)=o(ε^{s-γ})$. This does not refute a target-range energy lemma: for every fixed $η>0$,

$$
\frac{ε}{(101/p)^{1-η}}
 =O_η\left(\frac{r}{p^η}\right)\to0.
$$

## Exponent Ledger

| Stage | Input scale | Loss | Output scale | Status |
|---|---|---|---|---|
| KTZ reconstruction | $|R|=O(p/ε)$ | $D=O(\sqrt{dp/ε})$ and $D=O(εp)$ | $ε^3=Ω(d/p)$ | proved |
| Asymmetric selector | $t=τp(p+1)$, point degree $u$ | Chernoff and one union bound; constants only | $r=Θ(τp^2/u)$ | proved |
| Interpolation | $r$ line identities | $D=Θ(\sqrt{dr})$ | $D=O(\sqrt{dτp^2/u})$ | proved |
| Identity/lift | roots $v$ and incident lines $u$ | require $D<min(u,v)$ | $u min(u,v)^2=Ω(dτp^2)$ | proved |
| Cleanup | $pD^2+Dt$ bad edges | relative $D/v+O(dp/(uv))$ | $uv=Ω(dp)$ | proved |
| Recovery | minima $u/100,v/100$ | affine mixing constant | agreement $Ω(v/p)$ | proved |
| Popularity core | $u_*$ and mass $ε/2$ | $U=Ω(u_*),V=Ω(εp)$ | $u_*ε^2=Ω(d)$ | conditional |
| Exponent translation | $u_*\geκ ε^a p$ | none beyond constants | $ε=Ω((d/p)^{1/(a+2)})$ | conditional |
| Template branch | $R,δ,τ$ | $\sqrt{Rατ/p}$ by Cauchy--Schwarz | $R\leδp$ gives $α=Ω(δ)$ | proved |
| Modal obstruction | $ε=Θ(r/p)$ | fixed-order Markov constants | $Γ_s=O_s(ε^s)$ and global $<2/p$ | proved |

Because $d/p<1$, the conditional exponent $1/(a+2)$ is stronger than $1/3$ exactly when $a<1$. Its largest value in this architecture is $1/2$, not the long-term $1-o(1)$ target.

## Counterexample Attempts

The modal table is diffuse: every affine line in every direction supports acceptance, no line accepts more than $O(\log p/\log\log p)$ points, and yet every bounded star moment stays at its baseline scale. It rules out energy increments based only on a fixed number of coincident accepted lines.

The regular Hall carrier from the active corpus has full line support and pair energy $Θ(ε^2)$ but a perfect constant decoder. Together, the two examples show that low collision energy occurs in both easy and hard tables. An effective dichotomy must inspect algebraic coherence, not merely degrees or support.

Concentrating all good lines in $k$ directions gives $ε=k/(p+1)$ and $Γ_s=(k)_s/(p+1)_s$, but the planted global polynomial is immediate. Concentrated directions therefore do not refute the theorem.

Attempts based on $t^p-t$, Frobenius aliases, or inseparable line functions require degree at least $p$ and violate $d<p$. At the lower legal boundary, Proposition D uses ambient degree $d=101$; its constant line labels are allowed under that cap. For $d$ close to $p$, triangular interpolation gives every point table agreement at least $(d+1)(d+2)/(2p^2)$, exceeding $1/8$ once $d\ge(p-1)/2$. In particular, at $(p,d)=(103,101)$ it is $5253/10609\approx0.495$.

These are analytic falsification checks. No finite computation is used to prove an asymptotic soundness statement.

## Characteristic Audit

All statements are restricted to the prime field. The proof enforces $D<p$ before any functional-to-formal conversion. The line labels have degree $d<p$, and the restricted explainer identities have degree at most $D<p$.

The interpolation space excludes positive Z-exponents divisible by the characteristic; in this prime-field parameter range, $D<p$ also prevents them directly. Minimum-weight interpolation is invoked only after a candidate with nonzero Z-derivative is constructed. Squarefreeness is therefore justified by the exact hypotheses of KTZ Lemma 2.3.

After Z-content removal, primitivity plus squarefreeness and $deg_ZB<p$ prove $gcd(B,B_Z)=1$. This directly handles irreducibility and inseparability; no generic derivative, discriminant division, or unverified separability assertion is needed. KTZ Lemma 2.6 applies its resultant only to this certified coprime pair. Newton lifting divides solely by a value of $B_Z$ retained as nonzero.

Ordinary multiplicity-one interpolation is used throughout. The selector's only union loss is $2p^2e^{-v/24}$, the modal star argument's Markov-plus-union loss is $1/4$, the global-polynomial union loss is $p^{5253}(e/4)^p$, and the only Cauchy--Schwarz loss in the template lemma is $\sqrt{Rατ/(p+1)}$.

## Limitations

No unconditional popularity estimate stronger than $u_*=Ω(εp)$ is proved. Substituting that universal estimate into Corollary B recovers the cubic benchmark and nothing more, so `benchmark_improved=false`.

Even perfect point popularity $u_*=Θ(p)$ yields only exponent $1/2$ in this architecture because the simple-root cleanup and identity/lifting gates remain. Progress toward exponent $1-o(1)$ must replace those interfaces, not merely iterate the present popularity pruning.

The modal obstruction is scale-free and lies below every fixed target trigger. It does not rule out an energy increment whose hypothesis explicitly uses $ε\gtrsim(d/p)^{1-η}$, whose order grows with $p$, or whose energy records algebraic templates. Lemma C is useful only after such templates have actually been extracted; it does not produce them.

The constants are intentionally conservative and make Theorem A vacuous for modest fields. The result concerns only $m=2$, prime fields, total degree, and uniform affine-incidence sampling. No dimension lift, extension-field descent, or list-only conclusion is asserted.
