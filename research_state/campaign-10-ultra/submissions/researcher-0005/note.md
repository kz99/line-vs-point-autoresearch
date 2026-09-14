# Hasse-Height Stratification and Factorwise Simple-Root Cleanup

## Abstract

Fix a prime $p$ and an integer $101\le d<p$. I prove a factor-stratified cleanup lemma for bivariate line-versus-point interpolants that remains valid in small characteristic without choosing a generic derivative direction. Its exact exceptional-line bound records the weighted degree carried by inseparable factors. A $Z$-dependent factor of weighted degree below $pd$ is automatically vertically separable; this threshold is sharp.

I also isolate a genuine obstruction to a tempting Hasse-multiplicity argument. The irreducible squarefree polynomial

$F(X,Y,Z)=Z^p-XY^{p-1}$

has one polynomial graph on every direction through the origin, each with vertical multiplicity $p$, and the multiplicity-weighted direction count exceeds its weighted degree $pd$. Nevertheless, it has no formal section $Z=Q(X,Y)$. Thus Hasse multiplicity cannot replace distinct graph constraints in a pencil-lifting step.

When the new cleanup is inserted into the numerical envelope of Kominers–Thaler–Zheng (KTZ), the normalized exceptional-line loss is weaker than the existing constraints. The surviving point-root and identity-extension conditions still require $\epsilon^3=\Omega(d/p)$. Hence the benchmark is not improved: the quoted KTZ conclusion remains global agreement at least $\epsilon/8000$ under $\epsilon\ge C_{KTZ}(d/p)^{1/3}$.

## Test and Notation

Let $\mathcal L$ be the $p(p+1)$ affine lines in $\mathbb F_p^2$. Each line $L$ has a univariate label $q_L$ of degree at most $d$. For a table $f:\mathbb F_p^2\to\mathbb F_p$, the local agreement is

$\epsilon=\Pr_{L\in\mathcal L,\,x\in L}[q_L(x)=f(x)],$

where first $L$ and then $x\in L$ are uniform. Equivalently, the denominator is the $p^2(p+1)$ point-line incidences. A global candidate is a polynomial $Q(X,Y)$ of total degree at most $d$, and its agreement is the uniform point fraction on which $Q=f$.

Give $X,Y,Z$ weights $1,1,d$. Write $\operatorname{wdeg}A$ for weighted degree and $\deg_Z A$ for $Z$-degree. The $r$th Hasse derivative is defined without factorials by

$A(X,Y,Z+T)=\sum_{r\ge0}\partial_Z^{[r]}A(X,Y,Z)T^r.$

A graph identity always means the formal identity

$A(L(t),q_L(t))\equiv0$ in $\mathbb F_p[t]$,

not merely equality at the $p$ values of $t$. This distinction prevents hidden use of $t^p-t$.

For a squarefree, $Z$-dependent polynomial $A$, write

$A=H(X,Y)B(X,Y,Z),\qquad h=\deg H,\quad \Delta=\operatorname{wdeg}B,\quad a=h+\Delta.$

Here $H$ is the full $Z$-content and $B$ is primitive in $Z$. Factor

$B=c\prod_{i=1}^r C_i$

into distinct irreducibles in $\mathbb F_p[X,Y,Z]$, and put $\delta_i=\operatorname{wdeg}C_i$. Every $C_i$ is $Z$-dependent.

## Prior Results

The primary theorem used here is [KTZ, ECCC TR26-147, revision 1](https://eccc.weizmann.ac.il/report/2026/147/revision/1/download), rather than the shorter original PDF cached in the repository. Theorem 1.1 gives the affine line-point soundness threshold with absolute constants. In its bivariate proof, Lemma 3.2 supplies a selected line set of size $n\le6400p/\epsilon$, the interpolation parameter is

$D=16(\lfloor\sqrt{dn}\rfloor+1),$

and Lemma 4.1 records

$D\le1280(\sqrt{dp/\epsilon}+1),\qquad D<\min\{p,k_0/2,k_1/2\},$

where $k_0=\lfloor\epsilon p/100\rfloor$ and $k_1=\lfloor\epsilon p/1000\rfloor$. Lemmas 4.2–6.3 perform identity extension, cleanup, and lifting. The proof yields global agreement $\epsilon/8000$. The source gives only an upper bound on $n$; the notation $n=\Theta(p/\epsilon)$ would be unjustified.

[HKSS, arXiv:2311.12752v1](https://arxiv.org/html/2311.12752v1), Definition 2.3 and Proposition 2.4, provide primary-source Hasse-derivative conventions; Lemma 2.10 is a simple-root Newton lemma. [DKSS, ECCC TR09-004 revision 2](https://eccc.weizmann.ac.il/report/2009/004/) gives the standard multivariate Hasse-multiplicity formalism. Neither source is used as a black box below.

The active durable corpus contains four audited submissions. Researcher 0002 obtained a conditional exponent $1/2$ under a component-mass hypothesis. Researcher 0001 obtained a support-sensitive cubic inequality and an exact-linear modal obstruction. Researcher 0003's unrestricted hashed statement was rejected because required graph/content hypotheses were omitted, although its weighted-resultant argument is valid with those hypotheses restored. Researcher 0004 showed that uniform normal Hasse multiplicity cancels from the standard codimension count. Both campaign-300 leaderboards are empty, and `DATA_MANIFEST.json` is a prelaunch snapshot. Files under `superseded` are not used.

The quoted results above are distinguished from the exponent reconstruction in [P10]: the equations comparing $D$, $\epsilon p$, and the cleanup losses are derived in this note.

## Theorem

**Theorem 1 (factorwise Hasse cleanup).** Let $p$ be prime, $101\le d<p$, and let $A=HB$ and $B=c\prod_iC_i$ be as above. Suppose a family $\mathcal T\subseteq\mathcal L$ has labels $q_L$ of degree at most $d$ satisfying $A(L(t),q_L(t))\equiv0$.

For each factor, define its Hasse height

$s_i=p^{e_i},\qquad e_i=\min\{v_p(k):k>0,\ [Z^k]C_i\ne0\}.$

Then:

1. For $0<r<s_i$, $\partial_Z^{[r]}C_i=0$, while $\partial_Z^{[s_i]}C_i\ne0$, $\gcd(C_i,\partial_Z^{[s_i]}C_i)=1$, and $\delta_i\ge ds_i$. Moreover, $C_{i,Z}=0$ exactly when $s_i>1$. A graph root of such a factor has vertical multiplicity at least $s_i$.

2. For a fixed $p$-power $s$, let $G_s$ be the product of factors of height $s$, with weighted degree $\Delta_s$ and $Z$-degree $r_s$. The number of affine polynomial graph lines common to $G_s$ and $\partial_Z^{[s]}G_s$ is at most

$(2r_s-s)\Delta_s-dr_s^2=\Delta_s^2/d-s\Delta_s-(\Delta_s-dr_s)^2/d.$

3. Let

$I=\gcd(B,B_Z),\qquad \iota=\operatorname{wdeg}I=\sum_{C_{i,Z}=0}\delta_i.$

For a separable factor choose $D_iC_i=C_{i,Z}$ and $\omega_i=d$. For an inseparable factor choose a nonzero member of $\{C_{i,X},C_{i,Y}\}$ and put $\omega_i=1$. Remove a graph line if either two factors vanish identically on it or its unique factor $C_i$ and $D_iC_i$ both vanish identically. The number $N_{exc}$ of removed non-content lines satisfies

$N_{exc}\le\sum_i\left\lfloor\delta_i(\delta_i-\omega_i)/d\right\rfloor+\sum_{i<j}\left\lfloor\delta_i\delta_j/d\right\rfloor$

and hence

$N_{exc}\le\left\lfloor(\Delta^2-d\Delta+(d-1)\iota)/d\right\rfloor.$

There are at most $h$ content lines. On a remaining line of unique type $i$, deletion of at most

$\min\{p,\Delta-d\}$ points if $C_{i,Z}\ne0$, or $\min\{p,\Delta-1\}$ points if $C_{i,Z}=0$,

ensures that every retained point incident to at least two retained graph lines satisfies $B_Z\ne0$.

If $\sigma_{sep}$ and $\sigma_{ins}$ denote the numbers of remaining separable- and inseparable-type lines divided by $p(p+1)$, the deleted fraction of the ambient uniform incidence space is at most

$(h+N_{exc})/(p(p+1))+\sigma_{sep}\min\{1,(\Delta-d)/p\}+\sigma_{ins}\min\{1,(\Delta-1)/p\}.$

Deleting all remaining point vertices of degree at most one adds at most $1/(p+1)$.

4. If $\Delta<pd$, then $\iota=0$ and $\gcd(B,B_Z)=1$. Consequently, if $a\le D<pd$, content and exceptional lines number at most

$\lfloor D^2/d-D\rfloor,$

and every nonexceptional line loses at most $D-d$ parameter values. The threshold $pd$ is sharp.

**Corollary 2 (benchmark insertion).** For the stated line-versus-point test, the quoted KTZ hypothesis $\epsilon\ge C_{KTZ}(d/p)^{1/3}$ yields a total-degree-at-most-$d$ polynomial agreeing with $f$ on at least $\epsilon/8000$ of $\mathbb F_p^2$. Theorem 1 changes neither the exponent nor this asserted agreement scale.

## Proof

**[P1] (proved): Hasse height.** Write $C_i=\sum_k c_k(X,Y)Z^k$. By definition, every positive $k$ in its support is divisible by $s_i$, and at least one has $k/s_i$ nonzero modulo $p$. Lucas's theorem gives $\binom{k}{r}=0$ in $\mathbb F_p$ for $0<r<s_i$, while $\binom{k}{s_i}=k/s_i\ne0$ for at least one supported exponent of minimal $p$-adic valuation. Hence the asserted Hasse derivatives vanish and the order-$s_i$ derivative is nonzero. It has strictly smaller $Z$-degree than the irreducible $C_i$, so their gcd is one. Also $C_i\in\mathbb F_p[X,Y,Z^{s_i}]$, and $Z$-dependence gives $\delta_i\ge ds_i$. In particular, $C_{i,Z}=0$ precisely when $p\mid s_i$.

**[P2] (proved): vertical multiplicity and the gcd mass.** Write $C_i=E_i(X,Y,Z^{s_i})$. If $C_i(L(t),q(t))=0$, then $E_i(L(t),W)$ has the root $W=q(t)^{s_i}$ in $\mathbb F_p[t]$. Therefore

$C_i(L(t),Z)$ is divisible by $Z^{s_i}-q(t)^{s_i}=(Z-q(t))^{s_i}$.

For squarefree $B$, reduction of the product rule modulo $C_i$ shows that $C_i\mid B_Z$ exactly when $C_{i,Z}=0$. Thus $I$ is precisely the product of the height-greater-than-one factors and has weighted degree $\iota$.

**[P3] (proved): weighted graph resultant bound.** Let coprime $U,V$ have weighted degrees $u,v$ and $Z$-degrees $r,s$. Their Sylvester resultant in $Z$ is nonzero. Each determinant term contains $s$ coefficients of $U$ and $r$ coefficients of $V$; weighted homogeneity bounds its ordinary $(X,Y)$-degree by

$su+rv-drs\le uv/d,$

where the last inequality is equivalent to $(u-dr)(v-ds)\ge0$. A graph line common to $U$ and $V$ makes this resultant vanish identically on its underlying affine line, so that line's linear equation divides the resultant. A nonzero bivariate polynomial has no more distinct affine-line factors than its total degree. If one $Z$-degree is zero, the same conclusion follows directly from the corresponding base-polynomial line factors. No leading coefficient is divided out.

**[P4] (proved): Hasse strata.** For a fixed height $s$, the Hasse product rule and [P1] give

$\partial_Z^{[s]}G_s=\sum_{i:s_i=s}(\partial_Z^{[s]}C_i)\prod_{j\ne i}C_j.$

Modulo each $C_i$, exactly its displayed summand is nonzero. Hence the derivative is coprime to $G_s$. It has weighted degree at most $\Delta_s-ds$ and $Z$-degree at most $r_s-s$. Applying [P3], and maximizing over the latter degree because $\Delta_s-dr_s\ge0$, gives

$(r_s-s)\Delta_s+r_s(\Delta_s-ds)-dr_s(r_s-s)=(2r_s-s)\Delta_s-dr_s^2.$

Completing the square gives the second displayed form in the theorem.

**[P5] (proved): content removal.** A graph identity gives

$H(L(t))B(L(t),q_L(t))=0$ in the integral domain $\mathbb F_p[t]$.

Unless $H$ vanishes identically on $L$, the identity for $B$ follows without division. At most $h$ affine lines divide the nonzero polynomial $H$. On a $B$-graph line, the product of factor restrictions is zero in $\mathbb F_p[t]$, so at least one factor vanishes identically.

**[P6] (proved): exceptional-line count.** If two factors $C_i,C_j$ vanish on the graph line, [P3] bounds their common graph lines by $\lfloor\delta_i\delta_j/d\rfloor$. If the unique factor is $C_i$ but $D_iC_i$ also vanishes, [P3] gives $\lfloor\delta_i(\delta_i-\omega_i)/d\rfloor$.

For an inseparable irreducible factor, at least one of $C_{i,X},C_{i,Y}$ is nonzero: otherwise all three ordinary partials vanish, and perfectness of $\mathbb F_p$ would make $C_i$ a nontrivial $p$th power. Thus every selected derivative exists and is coprime to its factor. Summing the resultant bounds is a deterministic union bound. Since

$\sum_i\omega_i\delta_i=d(\Delta-\iota)+\iota$

and $\sum_i\delta_i^2+\sum_{i<j}\delta_i\delta_j\le\Delta^2$, the asserted bound follows.

**[P7] (proved): point deletion.** On a nonexceptional line of unique type $i$, delete roots of $D_iC_i(L(t),q_L(t))$ and of every other factor $C_j(L(t),q_L(t))$. These are nonzero polynomials in $t$. Weighted degree bounds their degrees by $\delta_i-\omega_i$ and $\delta_j$, respectively, so the union has size at most

$(\delta_i-\omega_i)+\sum_{j\ne i}\delta_j=\Delta-\omega_i,$

capped by $p$. Multiplying line removals by $p$ incidences and point removals by their exact per-line bounds gives the normalized formula in Theorem 1. No probabilistic inequality is present. Finally, at most one edge is charged to each of the $p^2$ point vertices removed in degree-at-most-one pruning, giving $1/(p+1)$.

**[P8] (proved): surviving intersections are simple.** Two distinct affine lines through the same retained point have independent direction vectors. The uniqueness deletion in [P7] forces both graph lines to carry the same factor $C_i$. If it were inseparable, differentiating the two formal identities would give

$C_{i,X}a+C_{i,Y}b=0$

for two independent directions $(a,b)$, because $C_{i,Z}=0$. Thus $C_{i,X}=C_{i,Y}=0$ at the point, contradicting retention of the chosen nonzero base derivative. Hence the common factor is separable. At a retained point, its $C_{i,Z}$ and all other factors are nonzero, so the product rule gives $B_Z\ne0$. This is a nonvanishing argument, not division by a derivative.

**[P9] (proved): sharp automatic separability.** If $C_{i,Z}=0$, every positive $Z$-exponent of $C_i$ is divisible by $p$. Since the factor is $Z$-dependent, $\delta_i\ge pd$. Therefore $\Delta<pd$ excludes all such factors and gives $\iota=0$.

When $a=h+\Delta\le D$, [P6] gives at most $h+\Delta^2/d-\Delta$ content and exceptional lines. Since $\Delta\ge d$, this convex expression is maximized at $h=0,\Delta=a$, and then at $a=D$, giving $D^2/d-D$. The [P7] point bound becomes $D-d$.

**[P10] (proved, using the quoted KTZ theorem): exponent reconstruction.** KTZ supplies

$n\le6400p/\epsilon,\qquad D\le1280(\sqrt{dp/\epsilon}+1),\qquad D<p.$

Thus Theorem 1 automatically lies in its separable range because $D<p<pd$. Its normalized exceptional-line cost has scale

$D^2/(dp^2)=O(1/(\epsilon p)+1/(dp^2)).$

Making this $O(\epsilon)$ asks only for $\epsilon^2p=\Omega(1)$. In contrast, the per-line point loss and the KTZ requirement $D<k_1/2$ both ask for

$\sqrt{dp/\epsilon}=O(\epsilon p),$

which is exactly $\epsilon^3=\Omega(d/p)$. The affine-mixing error $O(p^{-1/2})$ and optional $1/(p+1)$ pruning are weaker in the campaign range $d\ge101$. Invoking the remaining quoted KTZ lemmas yields one degree-at-most-$d$ polynomial with agreement at least $\epsilon/8000$. Hence the new lemma does not change exponent $1/3$.

**[P11] (proved): sharp purely inseparable obstruction.** Let

$F=Z^p-XY^{p-1}.$

It is primitive and irreducible by Eisenstein at the prime $X$ in $\mathbb F_p[X,Y][Z]$, and hence is squarefree. Its weighted degree is $pd$, $F_Z=0$, all Hasse derivatives of orders $1,\ldots,p-1$ vanish, and $\partial_Z^{[p]}F=1$.

For every projective direction $[a:b]$, take $L(t)=(at,bt)$ and

$q_{a,b}(t)=ab^{p-1}t.$

Then $q_{a,b}(t)^p=ab^{p-1}t^p$, so

$F(L(t),Z)=(Z-q_{a,b}(t))^p.$

There are $p+1$ such directions, all labels have degree one, and their total vertical multiplicity is $p(p+1)>pd$ because $d<p$. Yet no $Q\in\mathbb F_p[[X,Y]]$ satisfies $Q^p=XY^{p-1}$: every monomial of a Frobenius $p$th power has both exponents divisible by $p$, whereas $(1,p-1)$ does not. This refutes any pencil-lifting rule based only on multiplicity-weighted direction count exceeding weighted degree. It does not contradict [P4], since $\partial_Z^{[p]}F=1$.

**[P12] (refuted): the pencil is not a soundness counterexample.** Define $f(x,y)=xy^{p-1}$. Label every line by the restriction of $X$, except the $x$-axis, which receives label zero. These labels coincide with the graphs in [P11] on all radial lines. Direct incidence counting gives

$\epsilon=(p^2+1)/(p(p+1)).$

The global polynomial $Q=X$, of degree one and hence at most $d$, agrees on

$(p(p-1)+1)/p^2$

of all points. Both quantities tend to one. The attempted conversion into a line-versus-point obstruction therefore fails.

**[P13] (refuted): concentrated good directions are not an obstruction.** Let $f=0$, label all lines in $k$ direction classes by zero, and label the other lines by one. The local agreement is exactly $k/(p+1)$, but $Q=0$ agrees globally everywhere. Thus concentration in directions alone does not challenge the required global conclusion.

## Exponent Ledger

| Stage | Input | Loss or requirement | Output | Status |
|---|---|---|---|---|
| Local test | Uniform incidence agreement $\epsilon$ | none | $\epsilon$ | proved |
| KTZ selector | $\epsilon$ | $n\le6400p/\epsilon$ | one $\epsilon^{-1}$ factor | quoted/proved |
| Interpolation | $n$ | $D=16(\lfloor\sqrt{dn}\rfloor+1)$ | $D\le1280(\sqrt{dp/\epsilon}+1)$ | quoted/proved |
| Hasse audit | $\Delta\le D<p$ | inseparable factors require degree $pd$ | $\gcd(B,B_Z)=1$ | proved |
| Exceptional lines | $D$ | $O(D^2/d)$ lines | $O(1/(\epsilon p))$ incidence loss | proved |
| Root cleanup | $D$ | at most $D-d$ roots per line | $O(\sqrt{d/(\epsilon p)})$ | proved |
| Density preservation | root loss $O(\epsilon)$ | $\sqrt{d/(\epsilon p)}=O(\epsilon)$ | $\epsilon^3=\Omega(d/p)$ | proved |
| Identity extension | $D<k_1/2$, $k_1=\lfloor\epsilon p/1000\rfloor$ | $D=O(\epsilon p)$ | same cubic inequality | quoted/proved |
| Mixing | affine incidence graph | $O(p^{-1/2})$ | weaker than cubic for $d\ge101$ | quoted/proved |
| Global decoding | cubic premise | absolute constant | agreement $\epsilon/8000$ | quoted/proved |
| Desired target | exponent $1-o(1)$ | surviving $D=O(\epsilon p)$ gate | open | conjectural |
| Multiplicity shortcut | $p(p+1)>pd$ | no formal section exists | inference invalid | refuted |

The exceptional-line improvement therefore does not touch the dominant exponent manipulation. Since $d/p<1$, exponent $1/3$ is weaker than the desired $1-o(1)$ exponent.

## Counterexample Attempts

1. **Purely inseparable Hasse pencil.** [P11] is a successful obstruction to multiplicity-weighted pencil lifting, valid for every campaign pair $(p,d)$. It is not a counterexample to the soundness theorem.

2. **Adversarial table derived from the pencil.** [P12] has local agreement close to one, but also has a global polynomial with agreement close to one.

3. **Concentrated good directions.** [P13] realizes any density $k/(p+1)$ using complete direction classes, but the correct global polynomial remains obvious.

4. **Modal exact-linear obstruction.** The previously audited construction has local scale about $\log p/(p\log\log p)$ and global agreement below $2/p$. It rules out a literal linear threshold with global $\Omega(\epsilon)$ in that regime, but it lies below every fixed $(d/p)^{1-\eta}$ threshold and does not refute the long-term target.

5. **Near-characteristic degree.** For $d=p-1$, arbitrary tables already admit total-degree-at-most-$d$ agreement at least $(p+1)/(2p)$ by interpolation on a triangular information set. If an algebraic cleanup parameter satisfies $d\le D<p$, then necessarily $D=d$, and the separable per-line root budget $D-d$ is zero. No near-$p$ obstruction was found.

## Characteristic Audit

- **No factorial division.** Every Hasse calculation uses binomial coefficients and Lucas's theorem.
- **Perfect-field use.** Perfectness is invoked only when all three ordinary partials vanish; then every exponent is divisible by $p$ and the polynomial is a $p$th power.
- **Exact inseparable mass.** For squarefree $B$, $\gcd(B,B_Z)$ is exactly the product of factors with $C_{i,Z}=0$.
- **Sharp threshold.** Such a factor has weighted degree at least $pd$. The example in [P11] attains equality.
- **Formal versus functional identities.** All resultant and factor arguments occur in $\mathbb F_p[t]$. Equality merely on $\mathbb F_p$ is never promoted to a polynomial identity.
- **No derivative division.** [P8] certifies nonvanishing. A subsequent Newton lemma may divide only by the resulting nonzero field element.
- **No discriminant.** The proof uses resultants solely as nonzero eliminants and does not require discriminant nonvanishing. Historically, Arora–Sudan Corollary 36 needs vertical separability; its Lemma 22 field-size hypothesis forces characteristic above the relevant degree, so that application is safe.
- **Irreducibility.** Only factorization over $\mathbb F_p[X,Y,Z]$ is used. No absolute irreducibility claim is made.
- **Leading coefficients.** The Sylvester determinant specializes without normalizing either polynomial, so degree drops and vertical leading-coefficient zeros cause no illicit division.
- **Content.** The content argument is an integral-domain implication, not rational-function cancellation at individual points.
- **Root and union losses.** The bound $\Delta-\omega_i$ is the exact sum of degrees before capping at $p$. Pairwise resultant counts may overcount lines but never undercount them.
- **Markov and Cauchy–Schwarz.** Neither occurs in Theorem 1. The selector concentration/union estimates and the $p^{-1/2}$ affine-mixing loss are imported explicitly from the cited KTZ lemmas.
- **Interpolation multiplicity.** No multiplicity interpolation is assumed. [P11] demonstrates why multiplicity cannot be counted as independent direction information without a transverse hypothesis.
- **Boundary cases.** At $p=103,d=101$, [P11] gives $10712>10403$. At $d=p-1$ the same strict inequality remains valid.

## Limitations

The result is a proof tool and obstruction, not a stronger soundness theorem. It starts after a squarefree interpolant and formal graph identities have been obtained; it does not improve the selector, consolidate many components, or relax the decisive scale $D=O(\epsilon p)$. Consequently it leaves the benchmark exponent at $1/3$ and the $(d/p)^{1-o(1)}$ target open.

The Hasse counterexample refutes only a proposed proof inference. It does not contradict KTZ or exhibit a low-degree-test table lacking a globally agreeing polynomial. The finite checks serve only as falsification tests. No claim is made for $d\le100$, for dimensions other than two, for extension fields, or for nonuniform line sampling.
