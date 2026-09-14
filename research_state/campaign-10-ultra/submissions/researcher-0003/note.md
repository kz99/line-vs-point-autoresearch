# Weighted resultants and vertical separability over the prime field

## Abstract

Fix a prime $p$, dimension $m=2$, and an integer $100<d<p$. I prove a prime-field refinement of the algebraic cleanup following weighted interpolation. If a squarefree $(1,1,d)$-weighted interpolant has weighted degree $D<p$, then after removing its content in $Z$, the primitive factor $B$ is automatically separable in $Z$: $\gcd(B,B_Z)=1$. Moreover, a weighted resultant calculation bounds the number of line-polynomial graphs on which both $B$ and $B_Z$ vanish identically by

$$
(2r-1)\delta-dr^2\le \frac{\delta^2}{d}-\delta,
$$

where $\delta=\operatorname{wdeg}B$ and $r=\deg_ZB$. Including content-trivial lines, at most $D^2/d-D$ lines must be discarded. Every other line has at most $D-d$ ramified points. This replaces the ordinary-degree bounds $D(D-1)$ and $D$ in KTZ by factor-$d$ sharper line control and the smaller point bound $D-d$.

The improvement is genuine but does not improve soundness. KTZ interpolation has $D=O(\sqrt{dp/\varepsilon})$; the remaining $(D-d)/p$ loss is $O(\sqrt{(d/p)/\varepsilon})$. Making it $O(\varepsilon)$ still requires $\varepsilon^3\gtrsim d/p$. Thus `benchmark_improved=false`.

I also prove that the usual uniform ambient-multiplicity modification cannot change this exponent by raw coefficient counting, and give an explicit $p=409,d=101$ counterexample showing that a nonzero higher Hasse derivative cannot replace the simple-root hypothesis in Newton lifting.

## Test and Notation

There are $p(p+1)$ affine lines in $\mathbb F_p^2$. The sampling model is exactly

$$
L\sim\operatorname{Unif}(\mathcal L),\qquad x\sim\operatorname{Unif}(L).
$$

For a point table $f:\mathbb F_p^2\to\mathbb F_p$ and supplied line polynomials $P_L$ of degree at most $d$, write

$$
\varepsilon=\Pr_{L,x\in L}[P_L(x)=f(x)].
$$

All polynomial degrees below are formal degrees. The weights are

$$
\operatorname{wt}(X)=\operatorname{wt}(Y)=1,\qquad \operatorname{wt}(Z)=d.
$$

Thus, if $A$ has weighted degree at most $D$ and $\deg P_L\le d$, then

$$
\deg_t A(L(t),P_L(t))\le D.
$$

For the interpolation space set

$$
N_d(D)=\sum_{k=0}^{\lfloor D/d\rfloor}\binom{D-dk+2}{2}.
$$

This is the exact number of monomials of weighted degree at most $D$. When $D<p$, every positive possible $Z$-exponent is below $p$, so ordinary $Z$-differentiation kills no such monomial merely because of the characteristic.

In the KTZ application, $\mathcal R$ is the selected line family, $n=|\mathcal R|$,

$$
k_0=\left\lfloor\frac{\varepsilon p}{100}\right\rfloor,
\quad
k_1=\left\lfloor\frac{\varepsilon p}{1000}\right\rfloor,
\quad
D=16(\lfloor\sqrt{dn}\rfloor+1).
$$

Their Lemmas 3.2 and 4.1 give

$$
100p\le n\le\frac{6400p}{\varepsilon},
\qquad
D\le1280\left(\sqrt{\frac{dp}{\varepsilon}}+1\right),
\qquad
D<\min\{p,k_0/2,k_1/2\}.
$$

## Prior Results

The active corpus contains no prior submission or verifier finding. Both campaign databases contain only metadata and job queues; every prior output and error field is null. All eight active leaderboards are empty arrays, and no submissions or review directories exist. Directories named `superseded` were excluded.

The benchmark is [KTZ Revision 1, Theorem 1.1](https://eccc.weizmann.ac.il/report/2026/147/revision/1/download): over every finite field, $\varepsilon\ge C(d/q)^{1/3}$ implies one total-degree-at-most-$d$ polynomial with global agreement at least $c\varepsilon$. The bivariate proof gives the explicit value $c=1/8000$.

The exact bivariate chain used for comparison is KTZ Lemmas 3.1–3.2, 4.1–4.3, 5.1–5.2, and 6.1–6.3. The source-stated interpolation degree is $D=16(\lfloor\sqrt{d|\mathcal R|}\rfloor+1)$. The following exponent calculation is my reconstruction, not a quoted theorem: $|\mathcal R|=O(p/\varepsilon)$ and $N_d(D)=\Theta(D^3/d)$, while every graph-line identity costs $O(D)$ coefficients. Hence $D^2\asymp d|\mathcal R|$ and

$$
D=O\left(\sqrt{\frac{dp}{\varepsilon}}\right).
$$

Both identity propagation and simple-root cleanup need $D=O(\varepsilon p)$, producing $\varepsilon^3\gtrsim d/p$.

For historical comparison, [HKSS Theorem 4.2](https://eccc.weizmann.ac.il/report/2023/182/download/) states that $q>Cd/\varepsilon^7$ gives a bivariate polynomial with agreement $\Omega(\varepsilon^4)$. The exponent $1/7$ is obtained by rearranging that hypothesis; HKSS Theorem 1.4 itself leaves its exponent unspecified. HKSS Theorem 4.3 constructs an interpolant of weighted degree $O(d/\varepsilon^2)$ and invokes Lemmas 2.9, 2.10, and 3.1 for separability and lifting.

An adversarial reading found two unresolved displayed transitions in the inspected HKSS version. Appendix Lemma A.2 assumes $r\ge2\log(q)/\gamma^2$, whereas the later choice $r=900d/\gamma^2$ checks this only when $\log q\le450d$. Separately, the proof of Theorem 4.2 establishes a mass parameter $\mu=\Omega(\varepsilon^3)$ and later labels $\mu q$ as $\Omega(\varepsilon^2q)$. I do not use either transition. These observations are audit cautions, not a declaration that the HKSS theorem is false; an omitted case split or revised accounting may repair them.

## Theorem

### Theorem 1: weighted resultant bound

Let $U,V\in\mathbb F_p[X,Y,Z]$ be nonzero and coprime. Let their weighted degrees be $u,v$ and their $Z$-degrees be $r,s$, with at least one of $r,s$ positive. Suppose $\mathcal T$ is a family of distinct affine lines, each carrying $q_L(t)$ of degree at most $d$, such that

$$
U(L(t),q_L(t))\equiv V(L(t),q_L(t))\equiv0
\quad(L\in\mathcal T).
$$

Then

$$
|\mathcal T|
\le su+rv-drs
=\frac{uv}{d}-\frac{(u-dr)(v-ds)}d
\le\frac{uv}{d},
$$

with the evident direct interpretation if one $Z$-degree is zero. In particular, $|\mathcal T|\le\lfloor uv/d\rfloor$.

### Theorem 2: prime-field interpolation and vertical cleanup

Let

$$
p\text{ prime},\qquad 101\le d\le p-1,\qquad d\le D<p.
$$

Let $\mathcal R$ be $n$ distinct affine lines with degree-at-most-$d$ labels. If

$$
n>D,
\qquad
N_d(D)>n(D+1),
$$

there is a nonzero squarefree polynomial $A$ of weighted degree at most $D$ satisfying

$$
A(L(t),P_L(t))\equiv0\quad(L\in\mathcal R),
\qquad A_Z\ne0.
$$

Write $A=HB$, where $H\in\mathbb F_p[X,Y]$ is the $Z$-content and $B$ is primitive in $Z$. For any family of graph lines on which $A$ vanishes formally:

1. $B$ is squarefree and $\gcd(B,B_Z)=1$.
2. At most $\lfloor D^2/d-D\rfloor$ lines are either $H$-trivial or satisfy $B_Z(L(t),P_L(t))\equiv0$.
3. Every remaining line has at most $D-d$ points with $B_Z(L(t),P_L(t))=0$.
4. Relative to uniform affine point-line incidences, deleting every such exceptional line and ramified point loses at most

$$
\frac{D^2/d-D}{p(p+1)}+\frac{D-d}{p}.
$$

### Corollary: component-sensitive lifting

Suppose $B(b,\alpha)=0$ and $B_Z(b,\alpha)\ne0$. Let $C$ be the unique irreducible factor of $B$ vanishing at $(b,\alpha)$ and let $\delta_C=\operatorname{wdeg}C$. If more than $\delta_C$ distinct lines through $b$ carry degree-at-most-$d$ roots through $\alpha$, then a single total-degree-at-most-$d$ polynomial $Q$ restricts to all those roots and

$$
C(X,Y,Q(X,Y))\equiv0.
$$

Indeed, $C$ is associated to $Z-Q$. This refines the lifting threshold from the whole interpolant degree to the degree of the relevant component, though no worst-case bound forces $\delta_C=o(D)$.

## Proof or Conditional Proof

**[P1 — proved: weighted Sylvester degree.]** Write

$$
U=\sum_{i=0}^{r}a_i(X,Y)Z^i,
\qquad
V=\sum_{j=0}^{s}b_j(X,Y)Z^j.
$$

Weighted degree gives $\deg a_i\le u-di$ and $\deg b_j\le v-dj$. Every monomial in the Sylvester determinant contains $s$ coefficients of $U$, $r$ coefficients of $V$, and has total coefficient-index sum $rs$. The last identity also follows from

$$
\operatorname{Res}_Z(U(TZ),V(TZ))
=T^{rs}\operatorname{Res}_Z(U,V).
$$

Consequently,

$$
\deg_{X,Y}\operatorname{Res}_Z(U,V)\le su+rv-drs.
$$

No ordinary-total-degree estimate is substituted here.

**[P2 — proved: graph-line count.]** Coprimality makes the resultant nonzero. For each $L\in\mathcal T$, specialization to $\mathbb F_p(t)$ gives the common root $q_L(t)$, so the resultant vanishes identically on the base line $L$. Its affine-linear equation therefore divides the resultant. Distinct lines give distinct linear factors, proving Theorem 1. If, say, $s=0$, then $V(L(t))\equiv0$ directly and $|\mathcal T|\le\deg V\le v\le uv/d$, since $r>0$ implies $u\ge d$.

**[P3 — proved: exact interpolation.]** For an unknown polynomial supported on the $N_d(D)$ weighted monomials, one graph-line identity has degree at most $D$ in $t$ and imposes at most $D+1$ homogeneous linear equations. The strict dimension inequality therefore supplies a nonzero $A$. If $A$ were independent of $Z$, it would vanish identically on $n>D$ base lines; their distinct linear equations would all divide a bivariate polynomial of degree at most $D$, an impossibility. Thus $A$ depends on $Z$. Since $D<p$, every positive $Z$-exponent is nonzero modulo $p$, so $A_Z\ne0$.

**[P4 — proved: squarefree primitive reduction.]** Choose $A$ of minimum weighted degree among nonzero graph interpolants. If $A=P^eR$ with $e\ge2$ and $P\nmid R$, then on each graph the product $P^eR$ is zero in the domain $\mathbb F_p[t]$. Hence $PR$ is also zero there, but has smaller weighted degree and still depends on $Z$, a contradiction. Thus $A$ is squarefree. Dividing its coefficient content $H(X,Y)$ makes $B=A/H$ primitive in $Z$ and preserves squarefreeness. On any line not annihilated by $H$, the identity $A(L,P_L)=0$ implies $B(L,P_L)=0$ in the same domain.

**[P5 — proved: vertical separability.]** Factor $B$ into distinct irreducibles. If an irreducible factor $C$ divided both $B$ and $B_Z$, squarefreeness would force $C_Z=0$. But $\deg_ZC\le\deg_ZB\le D/d<p$. In characteristic $p$, a polynomial of $Z$-degree below $p$ with zero $Z$-derivative is independent of $Z$. Such a factor would divide every coefficient of $B$, contradicting primitivity. Therefore $\gcd(B,B_Z)=1$. Absolute irreducibility is neither assumed nor needed.

**[P6 — proved: ramification count and incidence loss.]** Put $\delta=\operatorname{wdeg}B$ and $r=\deg_ZB$. Then $r<p$,

$$
\operatorname{wdeg}B_Z\le\delta-d,
\qquad
\deg_ZB_Z=r-1.
$$

Theorem 1 applied to $B,B_Z$ bounds identically ramified graph lines by

$$
\Delta=(2r-1)\delta-dr^2
=\frac{\delta^2}{d}-\delta-rac{(\delta-dr)^2}{d}
\le\frac{\delta^2}{d}-\delta.
$$

Let $a=\operatorname{wdeg}A$ and $h=\deg H$, so $a=h+\delta\le D$. Adding the at most $h$ content-trivial lines gives

$$
h+\Delta
\le a-\delta+\frac{\delta^2}{d}-\delta
\le\frac{a^2}{d}-a
\le\frac{D^2}{d}-D.
$$

The middle inequality follows because

$$
\frac{a^2}{d}-a-
\left(a+\frac{\delta^2}{d}-2\delta\right)
=(a-\delta)\left(\frac{a+\delta}{d}-2\right)\ge0.
$$

On any other graph, $B_Z(L(t),P_L(t))$ is a nonzero polynomial of degree at most $\delta-d\le D-d$, hence has at most $D-d$ roots. Exceptional lines contribute at most $p$ incidences apiece. Dividing by the total $p^2(p+1)$ incidences proves the claimed loss.

**[P7 — proved: component-sensitive simple-root lift.]** At a point with $B_Z(b,\alpha)\ne0$, exactly one irreducible factor $C$ of $B$ vanishes, and $C_Z(b,\alpha)\ne0$. On every supplied graph through the point, the domain property forces this same factor, rather than another factor, to vanish identically. Newton recursion produces the unique total-degree-at-most-$d$ truncation $Q$ through $\alpha$; it divides only by $C_Z(b,\alpha)$. Its restriction equals every supplied $P_L$. Then $C(X,Y,Q)$ has degree at most $\delta_C$ and vanishes on more than $\delta_C$ distinct lines, so it is zero. The kernel of substitution $Z\mapsto Q$ is $(Z-Q)$; irreducibility forces $C$ to be associated to $Z-Q$.

**[P8 — conditional on the cited KTZ surrounding lemmas: application.]** Substitute the new cleanup for KTZ Section 5 while retaining their Lemmas 3.1–4.3 and 6.1–6.3. The new deletion bound is no larger than their Lemma 4.1 budget. The remaining graph therefore has the same minimum degree and incidence mass required for lifting and component propagation. Their conclusion supplies one polynomial $Q$ with

$$
\Pr_x[Q(x)=f(x)]\ge\frac{\varepsilon}{8000}.
$$

However,

$$
\frac{D-d}{p}
\le O\left(\sqrt{\frac{d}{\varepsilon p}}+\frac1p\right).
$$

Requiring this to be $O(\varepsilon)$ is equivalent, up to constants, to $\varepsilon^3\gtrsim d/p$. Thus this substitution does not improve Theorem 1.1's exponent.

**[P9 — proved: uniform multiplicity barrier.]** Suppose a proposed point-interpolation proof imposes ambient Hasse multiplicity $s\ge1$ at $M$ lifted points. The raw number of linear jet conditions is

$$
M\binom{s+2}{3}.
$$

For $D\ge d\ge101$,

$$
\dim W_D=N_d(D)\le\frac{2D^3}{d},
\qquad
\binom{s+2}{3}\ge\frac{s^3}{6}.
$$

If existence is certified by the standard raw coefficient inequality

$$
M\binom{s+2}{3}<\dim W_D,
$$

then $(D/s)^3>Md/12$. If a target graph contains $k$ interpolated points, multiplicity root counting needs $sk>D$, hence

$$
k^3>\frac{Md}{12}.
$$

For $M\ge\rho p^2$ and $k\le K\varepsilon p$, this forces

$$
\varepsilon^3>\frac{\rho}{12K^3}\frac{d}{p}.
$$

Thus uniform ambient multiplicity cannot improve the exponent through this coefficient-counting route. Dependent constraints, nonuniform multiplicities, or directional jets are not ruled out.

**[P10 — refuted claim: higher Hasse order can replace simplicity.]** Take $p=409$, $d=101$, and

$$
B=Z^2-XY,
\qquad
\operatorname{wdeg}B=202<p.
$$

At $(0,0,0)$, $B_Z=0$ while $\partial_Z^{[2]}B=1$. For every projective direction $[a:b]$ with $ab$ a square, choose $c^2=ab$ and use $L(t)=(at,bt)$, $P_L(t)=ct$. There are

$$
2+\frac{p-1}{2}=206>202
$$

such directions, and every graph satisfies $B(L(t),P_L(t))\equiv0$. Nevertheless, $B(X,Y,Q)=0$ would give $Q^2=XY$, impossible because the exponent of the irreducible $X$ is odd on the right and even in a square. Hence even irreducibility, squarefreeness, generic separability, a nonzero second Hasse derivative, and more than $D$ pencil roots do not replace a fiberwise simple root.

**[P11 — proved: exponent ceiling under uniform line sampling.]** Let $N=\binom{d+2}{2}$ and suppose

$$
N\log p<(4\log4-3)p.
$$

For uniformly random $f$, a fixed total-degree-at-most-$d$ polynomial agrees at a binomial number of points with mean $p$. Chernoff gives

$$
\Pr[\operatorname{agr}(f,Q)\ge4/p]
\le e^{-(4\log4-3)p}.
$$

A union bound over at most $p^N$ polynomials produces an $f$ with maximum global agreement below $4/p$. On each affine line, interpolate $f$ on any $d+1$ points. The resulting supplied line table has local agreement at least $(d+1)/p$. Taking, for example, growing $d=o(\sqrt{p/\log p})$ proves that any claimed exponent strictly larger than $1$ with global agreement $\Omega(\varepsilon)$ is false. This uses uniform affine-line sampling and total degree and does not obstruct exponent $1-o(1)$.

## Exponent Ledger

The controlling calculation is

$$
|\mathcal R|=O(p/\varepsilon),
\quad
D^3/d\gtrsim |\mathcal R|D,
\quad
D=O(\sqrt{dp/\varepsilon}),
\quad
(D-d)/p=O(\varepsilon).
$$

Therefore

$$
\sqrt{\frac{d}{\varepsilon p}}\lesssim\varepsilon
\iff
\varepsilon^3\gtrsim\frac dp.
$$

The new exceptional-line term is only

$$
\frac{D^2/d}{p^2}=O\left(\frac1{\varepsilon p}\right),
$$

where the ordinary-degree estimate was $D^2/p^2=O(d/(\varepsilon p))$. This factor-$d$ improvement is not controlling.

No Markov loss occurs in the new proof. KTZ Lemma 3.2 uses a Chernoff estimate and a union bound over at most $p(p+1)$ lines, followed by Chebyshev for $|\mathcal R|$; these introduce constants and the requirement $k_0\gtrsim\log p$, not another power of $\varepsilon$. KTZ Lemma 2.1 is proved by Cauchy–Schwarz and contributes $1/\sqrt{p+1}$; Lemma 4.1 explicitly budgets it as at most $\varepsilon/8000$. Under $\varepsilon^3p\gtrsim d$ and $d\ge101$, it is not the controlling exponent. The second pruning loses only a constant fraction of $\varepsilon$.

## Counterexample Attempts

1. **Adversarial random table:** [P11] rigorously proves the linear-scale floor and rules out exponents greater than $1$. It does not refute the campaign target.

2. **Higher-Hasse lifting:** [P10] refutes the tempting replacement of simple roots by finite Hasse multiplicity. The failure already occurs at the campaign's lower boundary $d=101$.

3. **Concentrated good directions:** choose $d+1$ distinct directions $u_i$ and linear forms $\ell_i$ vanishing on them, and set

   $$f(X,Y)=\prod_{i=1}^{d+1}\ell_i(X,Y).$$

   On every affine line in direction $u_i$, the leading coefficient vanishes, so the restriction has degree at most $d$. Use that restriction as $P_L$ and use $P_L=0$ in all other directions. The exact local agreement is

   $$
   \frac{(d+1)p^2+(p-d)((p-1)(d+1)+1)}{p^2(p+1)},
   $$

   while $Q=0$ has global agreement

   $$
   \frac{1+(d+1)(p-1)}{p^2}.
   $$

   Both are $\Theta(d/p)$ when $d=o(p)$. Thus good directions may be concentrated at the conjectured linear scale, but the example still has the required order of global agreement.

4. **Inseparability:** $Z^p-X$ is primitive, irreducible, and squarefree as a multivariate polynomial, yet its ordinary $Z$-derivative is zero. Its weighted degree is at least $pd$, so it is excluded precisely by $D<p$. This confirms that the auxiliary degree condition is doing real characteristic work.

5. **Near-$p$ regime:** if $d>p/2$ and $D<p$, then $\deg_ZB=1$. For $d=p-1$, $D=d$ and $B_Z$ is constant. No inseparability obstruction appears; instead, the KTZ cubic hypothesis with a large absolute constant may simply be empty when $d/p$ is too close to one.

## Characteristic Audit

- All rings used for factorization are formal polynomial UFDs. Polynomial functions are never substituted for formal polynomials.
- The only characteristic-sensitive implication is $C_Z=0$ and $\deg_ZC<p$ implies $C$ is independent of $Z$.
- Primitivity, not absolute irreducibility, excludes such a factor.
- The resultant is not divided by a leading coefficient, so fibers where $\deg_ZB$ drops are included in its zero set.
- The simple-root Newton recursion divides only by the nonzero value $B_Z(b,\alpha)$.
- Hasse multiplicity in [P9] is defined through maximal-ideal powers, so no factorial denominators occur.
- The substitution of a multiplicity-$s$ lifted point into a line graph produces a root of multiplicity at least $s$ because the lifted maximal ideal maps into $(t-t_0)$.
- The $p=409$ pencil confirms that higher Hasse order does not give uniqueness.
- At $p=103,d=101$, the exact dimension check shows failure of the raw interpolation inequalities, not failure of the theorem or a small-degree obstruction.

## Limitations

The result improves algebraic factor control but not the degree $D$ of the explainer. It therefore cannot by itself beat exponent $1/3$. The main surviving bottleneck is the need to spend up to $D-d$ bad roots on every nonexceptional line, together with the earlier need for more than $D$ accepted crossings to propagate the line identity.

The automatic vertical-separability argument requires the auxiliary interpolant degree $D<p$. It does not address a hypothetical construction with $D\ge p$, and the example $Z^p-X$ shows why that extension is nonformal.

The multiplicity obstruction covers only uniform ambient multiplicity certified by the raw number of jet equations. It leaves open dependent node conditions, nonuniform multiplicity, component-specific interpolation, and directional jets.

The component-sensitive corollary helps only if one proves that the component supporting many accepted line graphs has weighted degree substantially below $D$; no such distribution theorem is proved here.

Finally, finite-field arithmetic checks are used only for falsification and endpoint auditing. They do not establish the asymptotic soundness statement.
