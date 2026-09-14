# Factorwise Weighted-Polar Accounting and a Sharp Whole-Relation Obstruction

## Abstract

Fix dimension two over the prime field $F_p$, with $101≤d<p$. I prove a factorwise weighted-resultant lemma for the polynomial graph curves appearing after bivariate interpolation. Once a primitive squarefree relation $B$ is factored, every graph line may be assigned to an irreducible factor that vanishes on it. For the assigned factor $C_i$, both identically ramified lines and finite ramification points are controlled by its own weighted degree and its own vertical polar $C_{i,Z}$, rather than by the degree of all of $B$. A cleaned connected factor class of minimum degree $k$ yields one total-degree-at-most-$d$ polynomial with global agreement at least $k/(4p)$.

The adversarial half is sharp. For every $2d≤D<p$, an explicit primitive squarefree relation and a legal line-versus-point table attain exactly $D-d$ simple whole-relation polar intersections on every supported line. When $p≥8d$ the parameters may be chosen so that $ε=Θ((d/p)^{1/3})$ and $D=Θ(sqrt(dp/ε))=Θ(εp)$. Thus raw Bézout or intersection-multiplicity accounting cannot improve the whole-$B$ ramification term. All bad roots in the example are cross-factor collisions; assigning the graphs to the factor $Z$ removes them completely. This identifies factor consistency, not a sharper unfactored root count, as the missing step. The unconditional benchmark is not improved.

## Test and Notation

Fix a prime $p$ and an integer $101≤d<p$; throughout $m=2$. There are $p(p+1)$ affine lines in $F_p²$, each with $p$ points. The test chooses an affine line uniformly and then a point uniformly on it. Its incidence denominator is $p²(p+1)$.

Let $f:F_p²→F_p$, and let every line $L$ carry $P_L∈F_p[t]$ of degree at most $d$. Put

$$
ε=Pr_{L,x∈L}[P_L(x)=f(x)].
$$

Global candidates always have total degree at most $d$. Give $X,Y,Z$ weights $1,1,d$. For a polynomial $F$, write $wdeg(F)$ for this weighted degree. If $γ_L(t)=(L(t),P_L(t))$, then

$$
deg_t F(γ_L(t))≤wdeg(F).
$$

If $F(γ_L)$ is nonzero and vanishes at $t_0$, define its local graph intersection multiplicity to be $ord_{t_0}F(γ_L(t))$. This is the intersection multiplicity of the parametrized graph with the divisor $F=0$ on the normalization of the graph curve.

A polynomial in $F_p[X,Y,Z]$ is primitive in $Z$ when the gcd in $F_p[X,Y]$ of its $Z$-coefficients is one.

## Prior Results

The active corpus contains four submissions and four audits. Researcher 0002 is verified; its component-sensitive decoder gives a conditional exponent $1/2$. Researchers 0001 and 0004 require revision; they respectively isolate support-sensitive cubic closure and a rank-blind multiplicity barrier. Researcher 0003 was rejected because its exact theorem string omitted the hypotheses forcing a genuinely $Z$-dependent primitive interpolant, although the weighted-resultant calculation in its detailed proof was judged sound under the fuller hypotheses. The campaign-300 leaderboards are empty. The data manifest is a stale pre-launch snapshot relative to the populated campaign-10 boards, so the live files were used. Every directory named `superseded` was excluded.

The quoted benchmark is [Kominers–Thaler–Zheng, Revision 1, Theorem 1.1](https://eccc.weizmann.ac.il/report/2026/147/revision/1/download). Its specialization to $q=p,m=2$ says that

$$
ε≥C(d/p)^{1/3}
$$

implies one total-degree-at-most-$d$ polynomial with agreement at least $cε$. The theorem statement leaves $c$ unspecified; Lemmas 6.2–6.3 in the bivariate proof give $ε/8000$.

KTZ Lemma 2.6 is the exact source result closest to Bézout: for coprime trivariate polynomials of ordinary total degrees $u,v$, at most $uv$ polynomial graph lines can be common zeros. It eliminates $Z$ with a resultant and invokes Lemma 2.5 on the resulting bivariate polynomial. KTZ Lemma 5.1 obtains $D(D-1)$ exceptional lines from this ordinary-degree estimate. The weighted formula and the factor assignment below are proved here; neither is quoted from KTZ.

The cubic calculation is also a reconstruction, not a quoted theorem. KTZ Lemma 3.2 gives $|R|=O(p/ε)$; Lemmas 2.2 and 4.1–4.2 give $D=O(sqrt(dp/ε))$; Lemmas 4.3, 5.2, and 6.1 require $D=O(εp)$. Therefore $ε³=Ω(d/p)$. The resultant-line deletion alone is weaker. [HKSS Lemmas 2.10 and 3.1](https://arxiv.org/html/2311.12752v1) are used only as a source cross-check for simple-root Newton uniqueness.

## Theorem

**Theorem A — factorwise weighted-polar accounting.** Let $p$ be prime and $101≤d<p$. Let $B∈F_p[X,Y,Z]$ be primitive in $Z$, squarefree, of positive $Z$-degree, and of weighted degree $δ<p$. Write

$$
B=c∏_{i=1}^s C_i
$$

as a product of distinct irreducibles over $F_p$. Put

$$
δ_i=wdeg(C_i),\quad r_i=deg_Z(C_i),\quad γ_i=wdeg(C_{i,Z}),
$$

and

$$
Ξ_i=(r_i-1)δ_i+r_iγ_i-dr_i(r_i-1).
$$

Let $T$ be a family of distinct affine lines with degree-at-most-$d$ labels, and let $T=⊔_iT_i$ be a chosen partition such that

$$
C_i(L(t),P_L(t))≡0\qquad(L∈T_i).
$$

Let $e_i$ be the number of $L∈T_i$ for which $C_{i,Z}(L(t),P_L(t))≡0$. Then

$$
e_i≤min\{|T_i|,Ξ_i\}.
$$

On every other line in $T_i$,

$$
sum_{t∈F_p}ord_t C_{i,Z}(L(t),P_L(t))≤γ_i.
$$

For every point table $f$, the number of accepted incidences satisfying $C_{i(L),Z}(x,f(x))=0$ is at most

$$
sum_i\bigl(pe_i+(|T_i|-e_i)γ_i\bigr).
$$

Consequently, its uniform-incidence measure is at most

$$
frac{sum_i min\{|T_i|,Ξ_i\}}{p(p+1)}
+
frac{sum_i|T_i|γ_i}{p²(p+1)}.
$$

Moreover, $γ_i≤δ_i-d$ and

$$
Ξ_i≤(2r_i-1)δ_i-dr_i²≤δ_i²/d-δ_i.
$$

Writing $τ_i=|T_i|/[p(p+1)]$, $τ=sum_iτ_i$, and $barδ=(sum_iτ_iδ_i)/τ$ for $τ>0$, the coarser bound is

$$
frac{δ²/d-δ}{p(p+1)}+frac{τ(barδ-d)}p.
$$

**Corollary B — cleaned factor component.** Under Theorem A, fix $i$. Let $G=(X,T',E')$ be a connected subgraph of accepted incidences with $T'⊆T_i$, minimum degree at least the integer $k$, and $C_{i,Z}(x,f(x))≠0$ on every edge. If

$$
k>δ_i,\qquad frac1{sqrt(p+1)}≤frac{k}{4p},
$$

then there is $Q∈F_p[X,Y]$ of total degree at most $d$ such that

$$
Q(x)=f(x)\quad(x∈X),\qquad Pr_x[Q(x)=f(x)]≥frac{k}{4p}.
$$

**Theorem C — sharpness of the whole-relation polar term.** Let $p$ be prime and let the integers satisfy

$$
101≤d,\qquad 2d≤D<p.
$$

There exist a primitive squarefree $B$ of weighted degree $D$, a point table, and degree-at-most-$d$ line labels such that the test agreement is

$$
ε=frac{D-d}{p+1},
$$

all accepted incidences lie on nonvertical graph lines satisfying $B(L(t),P_L(t))≡0$, and every accepted incidence is a simple zero of $B_Z(L(t),P_L(t))$. If $τ=p/(p+1)$ is the measure of the nonvertical lines, then the ramified-incidence measure is exactly

$$
ε=frac{τ(D-d)}p.
$$

The same graph lines admit an assignment to a factor $C$ with $C_Z=1$, and a total-degree-zero polynomial has global agreement $(D-d)/p>ε$.

## Proof or Conditional Proof

**[P1] (proved: factor separability).** If an irreducible factor $C_i$ were independent of $Z$, it would divide every $Z$-coefficient of $B$, contradicting primitivity. Thus $r_i≥1$. Since $r_i≤δ_i/d≤δ/d<p$, differentiation does not kill its leading $Z$-term. Hence $C_{i,Z}≠0$. Irreducibility and the smaller $Z$-degree give $gcd(C_i,C_{i,Z})=1$. No absolute irreducibility is used.

**[P2] (proved: weighted resultant degree).** Write

$$
U=sum_{a=0}^r u_a(X,Y)Z^a,\qquad V=sum_{b=0}^s v_b(X,Y)Z^b
$$

with weighted degrees $u,v$. Then $deg(u_a)≤u-da$ and $deg(v_b)≤v-db$. Every monomial of the Sylvester determinant contains $s$ coefficients of $U$, $r$ coefficients of $V$, and has aggregate coefficient-index sum $rs$. Therefore

$$
deg_{X,Y}Res_Z(U,V)≤su+rv-drs.
$$

This proof uses the determinant directly and performs no division by a leading coefficient. If one $Z$-degree is zero, the same formula is the direct degree bound for that base polynomial.

**[P3] (proved: exceptional graph lines with multiplicity).** Apply [P2] to $U=C_i$ and $V=C_{i,Z}$. Their $Z$-degrees are $r_i,r_i-1$, and their weighted degrees are $δ_i,γ_i$. By [P1], the resultant $R_i=Res_Z(C_i,C_{i,Z})$ is nonzero and

$$
deg R_i≤Ξ_i.
$$

If both restrictions vanish identically on a graph over $L$, specialization of the Sylvester determinant vanishes identically on the base line. Its affine-linear equation divides $R_i$. More precisely, with $ν_L=ord_{ell_L}(R_i)$,

$$
sum_{L∈T_i:C_{i,Z}|_L≡0}ν_L≤deg R_i≤Ξ_i.
$$

Since every $ν_L≥1$, this proves the exceptional-line count.

**[P4] (proved: finite polar intersections).** On a nonexceptional line, the pullback

$$
g_L(t)=C_{i,Z}(L(t),P_L(t))
$$

is a nonzero polynomial of degree at most $γ_i$. Its roots, counted with their orders, therefore sum to at most $γ_i$. Accepted ramified incidences are a subset of these roots. This is the complete local intersection-multiplicity charge; no multiplicity is suppressed.

**[P5] (proved: normalized factorwise loss).** An exceptional line contributes at most $p$ accepted incidences, and every other assigned line contributes at most $γ_i$. Summing [P3]–[P4] and dividing by $p²(p+1)$ gives Theorem A's exact and relaxed bounds. Differentiation lowers weighted degree by at least $d$, so $γ_i≤δ_i-d$. Substitution in $Ξ_i$ yields

$$
Ξ_i≤(2r_i-1)δ_i-dr_i²
=δ_i²/d-δ_i-(δ_i-dr_i)²/d.
$$

Finally, weighted degree is additive under products, so $sum_iδ_i=δ$, and $sum_iδ_i²≤δ²$. This proves the coarse expression.

**[P6] (conditional: one factor class decodes).** At any point of $G$, an incident graph identity and acceptance give $C_i(x,f(x))=0$; the cleaned-edge hypothesis makes this root simple. Choose a point $b$. It has at least $k>δ_i$ incident lines. The simple-root Newton recursion, exactly KTZ Lemmas 2.7 and 6.1 with degree $δ_i$, constructs $Q$ of total degree at most $d$, agrees with every incident line label, and satisfies $C_i(X,Y,Q)≡0$. It divides only by $C_{i,Z}(b,f(b))$.

Simple-root uniqueness propagates the same $Q$ throughout the connected component. For completeness, let $a,b_0,ρ$ be its normalized point, line, and edge measures, put $κ=k/p$ and $u=1/sqrt(p+1)$. Minimum degree and affine incidence mixing give

$$
ρ≥κa/2,\qquad ρ≥κb_0,\qquad ρ≤ab_0+u sqrt(ab_0).
$$

If $a<κ/4$, the second and third inequalities imply $b_0<a/9$; substituting this into the upper bound contradicts $ρ≥κa/2$. If $b_0<κ/4$, the first and third imply $a<b_0$; substitution contradicts $ρ≥κb_0$. Thus $a,b_0≥κ/4$, proving global agreement at least $k/(4p)$. This is the only Cauchy–Schwarz loss in the new decoder.

**[P7] (proved: construction).** Put $e=D-d$. Choose $S⊂F_p$ with $|S|=e$ and set

$$
H(X)=prod_{a∈S}(X-a),\qquad B=Z(Z-H(X)).
$$

Because $e≥d$, $wdeg(B)=max\{2d,d+e\}=D$. The two distinct factors $Z$ and $Z-H$ make $B$ squarefree, and its leading $Z²$ coefficient one makes it primitive.

Set $f(x,y)=0$ for $x∈S$ and $f(x,y)=1$ otherwise. Give every nonvertical line the constant label zero and every vertical line the constant label two. Since $p>d≥101$, the value two differs from zero and one. Vertical lines have no accepted points. A nonvertical parameterization has $X=u+vt$ with $v≠0$, so it contains exactly $e$ accepted points.

There are $p²$ nonvertical lines. Hence the accepted-incidence count is $ep²$, and

$$
ε=frac{ep²}{p²(p+1)}=frac e{p+1}.
$$

**[P8] (proved: exact intersection saturation).** On every nonvertical zero-labelled graph,

$$
B(L(t),0)≡0,\qquad B_Z(L(t),0)=-H(u+vt).
$$

The latter has exactly $e=D-d$ roots. They are simple because $H$ has distinct roots and $v≠0$, and they are exactly the accepted parameters. Thus every accepted incidence is removed by whole-$B$ vertical cleanup and its normalized mass is

$$
frac e{p+1}=frac{p}{p+1}frac{D-d}{p}.
$$

At every such lifted point, $B_X=B_Y=B_Z=0$. There are $ep$ lifted singular points, each incident to $p$ accepted nonvertical graph lines, giving $ep²$ ramified incidences. Counting base points instead of incidences therefore does not save a factor. Nevertheless every relevant graph belongs to $C_1=Z$, for which $wdeg(C_1)=d$ and $C_{1,Z}=1$. Its factorwise loss is zero. Also $Q=0$ agrees with $f$ on $ep$ points, a fraction $e/p>ε$.

**[P9] (proved: cubic-scale choice).** Assume $p≥8d$ and set

$$
e=ceil((dp²)^{1/3}),\qquad D=d+e.
$$

Then $e≥4d$, $e≤p/2+1$, and $D<p$. Since $(dp²)^{1/3}≤e≤2(dp²)^{1/3}$ and $p≤p+1≤2p$,

$$
frac12(d/p)^{1/3}≤ε≤2(d/p)^{1/3}.
$$

Moreover $D=Θ(e)=Θ(εp)$, while

$$
dp/ε=dp(p+1)/e=Θ(e²).
$$

Thus $D=Θ(sqrt(dp/ε))$. Every exponent manipulation in the sharpness claim is contained in these displayed comparisons.

**[P10] (refuted: minimum-interpolant saturation).** The construction does not prove that KTZ's chosen minimum-weight interpolant pays the whole-$B$ loss. The polynomial $Z$, of weight $d<D$, already vanishes on every selected nonvertical graph and has derivative one. The construction refutes only a cleanup theorem based on an arbitrary primitive squarefree whole relation and its degree data.

**[P11] (refuted as campaign obstructions: inseparability and direction concentration).** The primitive squarefree polynomial $Z^p-X$ has zero vertical derivative, but weighted degree $pd$ and is excluded by $δ<p$. If correct labels are instead concentrated in exactly $k$ direction classes with $f=0$, the exact local agreement is $k/(p+1)$ and $Q=0$ agrees everywhere. Neither example refutes the factorwise theorem or the soundness benchmark.

## Exponent Ledger

| Stage | Input | Loss | Output |
|---|---|---|---|
| KTZ pruning | $ε$ | constants | degree $Θ(εp)$ |
| KTZ selector | degree $Θ(εp)$ | $|R|=O(p/ε)$ | one inverse $ε$ |
| Interpolation | $D³/d$ coefficients vs. $|R|D$ equations | square root | $D=O(sqrt(dp/ε))$ |
| Identity and lifting | $D$ versus $Θ(εp)$ roots | $D=O(εp)$ | $ε³=Ω(d/p)$ |
| Ordinary resultant | $D²$ exceptional lines | $D²/p²$ | only the weaker square-root gate |
| Weighted resultant | $D²/d$ exceptional lines | $D²/(dp²)=O(1/(εp))$ | lower order |
| Whole polar | $D-d$ roots per line | $τ(D-d)/p$ | can equal all of $ε$ |
| Factor polar | factor weights $γ_i$ | $sum_iτ_iγ_i/p$ | potentially smaller, but conditional |
| Factor component | minimum degree $k$ | one mixing Cauchy–Schwarz loss | agreement $k/(4p)$ |
| Sharpness scaling | $e³≈dp²$ | $ε=e/(p+1)$ | existing exponent $1/3$ exactly |
| Final benchmark | cubic hypothesis | constant $1/8000$ | one degree-$d$ polynomial |

No Markov inequality, probabilistic union bound, or interpolation-multiplicity assumption appears in Theorem A or C. KTZ's selector uses Chernoff, a union bound, and Chebyshev, but those introduce constants rather than another power of $ε$. Every sharpness root has local intersection multiplicity exactly one.

## Counterexample Attempts

Theorem C is a successful obstruction to improving the unfactored polar-root budget by Bézout or multiplicity accounting alone. It is deliberately not a soundness counterexample: it contains the explicit factor and decoder $Z=0$.

The construction also shows why replacing incidence counts by counts of singular base points is invalid. Each of the $ep$ singular lifted points supports $p$ accepted graph incidences. The resultant/discriminant is proportional to $H²$; passing to its reduced support $H=0$ loses precisely this concurrency information.

The attempted stronger conclusion about KTZ's minimum interpolant is refuted in [P10]. A genuine lower bound for that architecture must force several factors to be used by different graph lines while preventing a lower-weight content or factor relation.

The inseparability and concentrated-direction attempts are disposed of in [P11]. At the legal lower boundary, $p=1009,d=101,e=469,D=570$ realizes the cubic-scale construction. At the extreme near-p boundary $p=103,d=101$, $D<p$ forces $D<2d$, so this quadratic branch-collision construction cannot occur.

## Characteristic Audit

- The field is exactly $F_p$, and $d≥101$ makes $p$ odd.
- The precise derivative requirement is $deg_Z(C_i)<p$; $δ<p$ is a convenient sufficient hypothesis inherited from KTZ.
- Primitivity excludes base-only factors. Factorization is over $F_p$, not its algebraic closure.
- The resultant is never normalized to a discriminant and no leading coefficient is inverted.
- Local multiplicities are orders in $F_p[t]$; no factorial is inverted.
- The conditional lift divides only by a nonzero value of $C_{i,Z}$.
- Content removal is not hidden: Theorem A starts after it, with primitive positive-$Z$-degree $B$.
- Every sharpness root is distinct and simple. Repeated interpolation nodes or hidden Hasse multiplicities play no role.
- At $d>p/2$, $δ<p$ permits only one $Z$-dependent factor of $Z$-degree one. At $d=p-1,δ=d$, its derivative is constant.
- Constant labels in Theorem C are legal under the ambient degree cap $d≥101$ and do not analyze the excluded degree-zero regime.

## Limitations

The factorwise lemma does not prove that one factor class retains minimum degree $Ω(εp)$. Lines assigned to different factors may meet at accepted points, and factorwise simplicity does not by itself propagate one polynomial across such a transition. A factor-consistency or list-to-single argument is still required.

In the worst case an active irreducible factor may have $γ_i=Θ(D-d)$, so the factorwise bound returns the original cubic gate. Independently, KTZ identity extension requires $D=O(εp)$ before the cleanup stage. Improving ramification alone therefore cannot improve the benchmark.

The sharpness construction is reducible and is not minimum-weight for its graph family. It proves exact sharpness only for black-box whole-relation cleanup. It neither proves that KTZ's selected interpolant saturates the loss nor refutes any exponent-$1-o(1)$ soundness theorem.

No finite computation is used to prove an asymptotic statement, and no claim concerns dimensions above two, extension fields, altered sampling, or individual degree.
