# Frobenius Purification and the Singular-Lift Bottleneck

## Abstract

Fix a prime field \(\mathbb F_p\), dimension \(m=2\), and an integer \(101\le d<p\). This note isolates the algebraic obstruction left after introducing absolute factorization and discriminant curves into the affine line-versus-point test. First, an \(\mathbb F_p\)-irreducible auxiliary factor with \(k\ge2\) absolute factors supports at most \(\delta^2/(dk^2)\le\delta^2/(4d)\) polynomial graph lines; this follows from Frobenius conjugacy and a weighted resultant. Second, for a fixed factor, all ramified accepted lifts that are smooth on the auxiliary hypersurface contribute at most \(p^2\) incidences, hence normalized loss at most \(1/(p+1)\). Thus geometric reducibility and smooth ramification are not the cubic bottleneck.

The obstruction is the singular lifted locus. For every \(101\le d\le p-2\), an explicit minimum-weight, primitive, squarefree, absolutely irreducible polynomial \(B=XZ+H(Y)\) of weighted degree \(D=d+1<p\) has a smooth absolutely irreducible raw-resultant curve \(X=0\), supports more than \(D\) fully accepted graph lines, and has no total-degree-\(d\) polynomial root matching all those labels. At \((p,d)=(103,101)\), the construction contains 5,253 fully accepted lines. This is a proved obstruction to a proof architecture, not a counterexample to soundness and not an exponent improvement.

## Test and Notation

There are \(p(p+1)\) affine lines in \(\mathbb F_p^2\). A line table assigns to each line \(L\) one univariate polynomial \(P_L\) of degree at most \(d\), interpreted in any affine parameter on \(L\). For a point table \(f:\mathbb F_p^2\to\mathbb F_p\),
\[
\epsilon=\Pr_{L,x\in L}[P_L(x)=f(x)]
=\frac{\#\{(L,x):x\in L,\ P_L(x)=f(x)\}}{p^2(p+1)}.
\]
Line sampling and then point sampling are both uniform. A global polynomial always means one \(Q\in\mathbb F_p[X,Y]\) of total degree at most \(d\).

Give \(X,Y,Z\) weights \((1,1,d)\). Write \(\operatorname{wdeg}B\) for weighted degree and \(\deg_ZB\) for vertical degree. A graph identity means the formal polynomial identity
\[
B(L(t),P_L(t))\equiv0\quad\text{in }\mathbb F_p[t],
\]
not merely equality as functions on \(\mathbb F_p\). A graph incidence is ramified when \(B_Z(x,P_L(x))=0\).

Auxiliary symbols are as follows: \(D\) is an interpolation weight; \(\delta,r,k\) are respectively the weight, vertical degree, and number of absolute factors of one \(\mathbb F_p\)-irreducible factor; \(s=\lfloor(d+1)/2\rfloor\) and \(e=d+1-2s\in\{0,1\}\) occur in the explicit construction.

## Prior Results

The quoted benchmark is Kominers–Thaler–Zheng Theorem 1.1: absolute constants \(C,c>0\) satisfy
\[
\epsilon\ge C(d/p)^{1/3}
\quad\Longrightarrow\quad
\Pr_x[Q(x)=f(x)]\ge c\epsilon
\]
for some total-degree-\(d\) polynomial \(Q\); their bivariate proof gives \(c=1/8000\). Their Lemma 4.1 uses
\[
D=16\bigl(\lfloor\sqrt{d|\mathcal R|}\rfloor+1\bigr),
\qquad |\mathcal R|\le6400p/\epsilon.
\]
The familiar chain \(D=O(\sqrt{dp/\epsilon})\) and \(D=O(\epsilon p)\), hence \(\epsilon^3=\Omega(d/p)\), is this note's reconstruction from the proof, not a separately quoted KTZ theorem. See the [KTZ Revision 1 primary text](https://eccc.weizmann.ac.il/report/2026/147/revision/1/download/).

Harsha–Kumar–Saptharishi–Sudan Definitions/Lemmas 2.5–2.10 use the raw resultant \(\operatorname{Res}_Z(A,A_Z)\) as their \(Z\)-discriminant, and Lemma 3.1 requires a simple lifted root for global lifting. See the [HKSS primary text](https://arxiv.org/html/2311.12752v1). Arora–Sudan Theorem 34 bounds bad affine specializations of an absolutely irreducible polynomial, while Lemma 35 and Corollary 36 use discriminants under a separability hypothesis; see the [journal paper](https://people.csail.mit.edu/madhu/papers/1997/arora-journ.pdf).

For plane curves, Aubry–Perret Corollary 2.5 proves
\[
|\#C(\mathbb F_p)-(p+1)|\le(r-1)(r-2)\sqrt p
\]
for an absolutely irreducible projective plane curve of degree \(r\); see the [primary paper](https://www.math.univ-toulouse.fr/~perret/Fichiers/Scan-Weil.Singulier.pdf). Cafure–Matera Lemma 2.3 bounds rational points on an \(\mathbb F_p\)-irreducible but non-absolutely-irreducible curve; see the [primary text](https://arxiv.org/html/math/0405302v1). Neither point theorem controls how many graph directions pass through one lifted singular point.

In the active campaign corpus, researcher-0002 is the only accepted prior submission; its exponent-\(1/2\) consequence remains conditional on a small-component hypothesis. Researchers 0001 and 0004 require revision. Researcher-0003 was rejected because its headline theorem omitted essential interpolation hypotheses, although its verifier accepted the weighted-resultant calculation used below. To avoid inheriting the rejected statement, that calculation is proved again in [P2].

## Theorem

**Theorem 1 (purification and singular-lift dichotomy).** Let \(p\) be prime and \(101\le d<p\).

1. **Frobenius purification.** Let \(C\in\mathbb F_p[X,Y,Z]\) be irreducible and \(Z\)-dependent, with weighted degree \(\delta\), vertical degree \(r\), and \(k\ge2\) absolute factors. If \(\mathcal T\) is a family of distinct affine \(\mathbb F_p\)-lines with degree-at-most-\(d\) labels satisfying \(C(L,P_L)\equiv0\), then
   \[
   |\mathcal T|\le\frac{2r\delta-dr^2}{k^2}
   \le\frac{\delta^2}{dk^2}
   \le\frac{\delta^2}{4d}.
   \]
   Consequently, for any primitive auxiliary polynomial of weight at most \(D\), all graph lines supported on geometrically reducible \(\mathbb F_p\)-factors number at most \(D^2/(4d)\).

2. **Smooth ramification sparsity.** Fix one polynomial \(B\) and a graph-line family. If every ramified accepted lift \(w=(x,f(x))\) under consideration is smooth on \(B=0\), then their total number of accepted incidences is at most \(p^2\), giving normalized loss at most \(1/(p+1)\).

3. **Linear regime.** If \(d\le D<2d\) and \(B\) is primitive, \(Z\)-dependent, and of weight at most \(D\), then
   \[
   B=a(X,Y)Z+b(X,Y),\qquad
   \deg a\le D-d,
   \quad \deg b\le D,
   \quad \gcd(a,b)=1.
   \]
   It is absolutely irreducible. Its ramified base set has at most \(D(D-d)\) points, no graph line is identically ramified, and deletion of all ramified base vertices costs at most \(D(D-d)/p^2\).

4. **Sharp singular construction.** Suppose further that \(d\le p-2\). Put \(D=d+1\), \(s=\lfloor(d+1)/2\rfloor\), and \(e=d+1-2s\). Choose distinct \(c_1,\ldots,c_s\in\mathbb F_p\); if \(e=1\), choose \(b\notin\{c_j\}\), and set
   \[
   H(Y)=\prod_{j=1}^s(Y-c_j)^2\,(Y-b)^e,
   \qquad B(X,Y,Z)=XZ+H(Y).
   \]
   Then \(B\) is a minimum-weight primitive, squarefree, absolutely irreducible graph interpolant of weight \(D<p\). There is a fully specified point/line table containing
   \[
   sp>D
   \]
   fully accepted lines, of line measure \(s/(p+1)\), with exactly one ramified accepted point per selected line. Their normalized ramified mass is \(s/[p(p+1)]\). The raw resultant is the smooth absolutely irreducible plane curve \(X=0\), but no total-degree-at-most-\(d\) polynomial restricts to all selected labels.

No part asserts a stronger soundness exponent or bounds the best global agreement for the explicit table.

## Proof or Conditional Proof

### [P1] Vertical separability — proved

Let a squarefree polynomial \(B\), primitive in \(Z\), have weighted degree \(\delta<dp\). Then \(\deg_ZB<p\). If an irreducible factor \(C\) divided both \(B\) and \(B_Z\), squarefreeness would imply \(C\mid C_Z\), so \(C_Z=0\). In characteristic \(p\), all its \(Z\)-exponents would then be multiples of \(p\). Since \(\deg_ZC<p\), it would be independent of \(Z\), contradicting primitivity. Hence \(\gcd(B,B_Z)=1\).

The strict threshold is necessary: \(Z^p-X\) has weighted degree \(dp\), is primitive, squarefree, smooth, and absolutely irreducible, but its \(Z\)-derivative is zero.

### [P2] Weighted resultant line count — proved

Let coprime \(U,V\) have weights \(u,v\) and vertical degrees \(r_0,s_0\). Their nonzero resultant \(R=\operatorname{Res}_Z(U,V)\) has ordinary \((X,Y)\)-degree at most
\[
s_0u+r_0v-dr_0s_0.
\]
Indeed, every resultant monomial contains \(s_0\) coefficients of \(U\), \(r_0\) coefficients of \(V\), and total vertical-index weight \(r_0s_0\). Since the coefficient of \(Z^i\) in a weight-\(u\) polynomial has degree at most \(u-di\), the displayed bound follows term by term.

If both \(U(L,P_L)\) and \(V(L,P_L)\) vanish formally, then \(R\) vanishes identically on the base line \(L\). Its line equation divides \(R\). A nonzero bivariate polynomial of degree \(E\) has at most \(E\) distinct affine-line factors, proving the graph-line bound.

### [P3] Frobenius purification — proved

Over \(\overline{\mathbb F}_p\), Frobenius acts transitively on the \(k\) absolute factors of the \(\mathbb F_p\)-irreducible polynomial \(C\). Every factor has weight \(\delta/k\) and vertical degree \(r/k\). If one factor vanishes on an \(\mathbb F_p\)-defined graph, applying Frobenius to that formal identity shows that every conjugate vanishes there. Two distinct conjugates are coprime, so [P2] gives
\[
|\mathcal T|
\le 2\frac r k\frac\delta k-d\left(\frac r k\right)^2
=\frac{2r\delta-dr^2}{k^2}.
\]
Completing the square gives \(2r\delta-dr^2\le\delta^2/d\), and \(k\ge2\) gives the final \(\delta^2/(4d)\) bound.

### [P4] Union loss and sharpness — proved

Primitivity excludes base-only irreducible factors. Factor a primitive \(B\) over \(\mathbb F_p\), assign each supported graph line to one factor, and apply [P3] to the geometrically reducible factors. If their weights are \(\delta_i\), then
\[
\sum_i\frac{\delta_i^2}{4d}
\le\frac{(\sum_i\delta_i)^2}{4d}
\le\frac{D^2}{4d}.
\]
This is the sole union loss.

The constant is sharp. If \(p>2d\), choose a nonsquare \(\nu\in\mathbb F_p\) and let \(H_0\) be the product of \(d\) distinct affine-line equations. Then
\[
C=Z^2-\nu H_0^2
\]
is irreducible over \(\mathbb F_p\), has \(k=2\), \(r=2\), and \(\delta=2d\). It contains exactly the \(d\) base lines of \(H_0\) with label zero. If another graph existed, \(q_L^2=\nu H_0(L)^2\) would make the nonsquare constant \(\nu\) a square in \(\mathbb F_p(t)\), which is impossible.

### [P5] Smooth ramification sparsity — proved

At a ramified accepted lift \(w=(x,f(x))\), a formal graph identity along a line with direction \(v_L\) yields, by the chain rule,
\[
B_X(w)v_{L,1}+B_Y(w)v_{L,2}+B_Z(w)P_L'(x)=0.
\]
Ramification removes the last term. Smoothness of \(w\) and \(B_Z(w)=0\) imply \((B_X,B_Y)(w)\ne(0,0)\), whose kernel is one projective direction. Through \(x\) there is exactly one affine line of that direction. Thus each of the \(p^2\) base points supplies at most one such accepted edge. Division by a derivative is not used.

### [P6] Linear-in-Z regime — proved

If \(D<2d\), positive vertical degree and the weight constraint force
\[
B=aZ+b,
\quad \deg a\le D-d,
\quad \deg b\le D.
\]
Primitivity says \(\gcd(a,b)=1\), and Gauss's lemma makes this primitive linear polynomial absolutely irreducible. A base point admits a ramified lift exactly when \(a=b=0\). Bézout therefore bounds the ramified base set by \(\deg(a)\deg(b)\le D(D-d)\). Deleting a base point removes at most its \(p+1\) incidences, so its normalized cost is \(1/p^2\).

If a graph line were identically ramified, both \(a\) and \(b\) would vanish identically on its base line, contradicting their coprimality.

### [P7] Algebra of the singular construction — proved

The polynomial \(H\) has degree \(d+1\), so \(B=XZ+H(Y)\) has weighted degree \(D=d+1<p\). As a polynomial in \(Z\), its coefficients \(X,H(Y)\) are coprime; hence it is primitive and absolutely irreducible by Gauss's lemma. It is consequently squarefree, and
\[
B_Z=X,
\qquad \gcd(B,B_Z)=1.
\]
The usual normalized discriminant of a degree-one polynomial is \(1\), whereas
\[
\operatorname{Res}_Z(B,B_Z)=X.
\]
Thus the raw resultant curve is a smooth absolutely irreducible line. At each lift \((0,c_j,0)\), however,
\[
B_X=Z=0,
\quad B_Y=H'(c_j)=0,
\quad B_Z=X=0,
\]
so the auxiliary hypersurface is singular there.

### [P8] The full table and exact incidence counts — proved

For \(j\in\{1,\ldots,s\}\) and \(m\in\mathbb F_p\), take
\[
L_{j,m}(t)=(t,c_j+mt),
\qquad
P_{j,m}(t)=-\frac{H(c_j+mt)}t.
\]
The quotient is a polynomial: for \(m\ne0\), the double root at \(c_j\) makes the numerator divisible by \(t^2\); for \(m=0\), it is the zero polynomial. Its degree is at most \(d\), and
\[
B(L_{j,m}(t),P_{j,m}(t))\equiv0.
\]
Define
\[
f(x,y)=
\begin{cases}
-H(y)/x,&x\ne0,\\
0,&x=0,
\end{cases}
\]
and set every unselected line label to zero. Every selected line is fully accepted, including its point \(t=0\). The \(sp\) lines are distinct, so they contribute agreement \(s/(p+1)\). Since \(B_Z(L_{j,m}(t),P_{j,m}(t))=t\), each has exactly one ramified accepted parameter. The normalized selected ramified mass is therefore
\[
\frac{sp}{p^2(p+1)}=\frac{s}{p(p+1)}.
\]
At \(p=103,d=101\), \(s=51\), \(D=102\), and \(sp=5{,}253\).

### [P9] Absence of a common global root and interpolation minimality — proved

If a total-degree-at-most-\(d\) polynomial \(Q\) restricted to every selected label, then
\[
R(X,Y)=XQ(X,Y)+H(Y)
\]
would have total degree at most \(D=d+1\) and vanish identically on \(sp>D\) distinct affine lines. Their distinct line equations would all divide \(R\), forcing \(R=0\). This is impossible because \(X\nmid H(Y)\).

There is also no nonzero graph interpolant of weighted degree at most \(d\). Such an interpolant must be \(aZ+b(X,Y)\) with constant \(a\). If \(a=0\), then \(b\) vanishes on more than \(d\) lines and is zero. If \(a\ne0\), then \(-b/a\) is the forbidden polynomial \(Q\). Since \(B\) itself has weight \(d+1\), it is a minimum-weight interpolant.

### [P10] Monic smooth-discriminant stress test — proved

Let \(2d\le D<p\), put \(r=D-d\), choose distinct \(a_1,\ldots,a_r\in\mathbb F_p\), and set \(A(X)=\prod_i(X-a_i)\). Then
\[
B_{\mathrm{sm}}=Z^2+A(X)Z+Y
\]
is monic in \(Z\), has weight \(D\), and is smooth and absolutely irreducible because \((B_{\mathrm{sm}})_Y=1\). Its discriminant
\[
\Delta=A(X)^2-4Y
\]
is also smooth and absolutely irreducible. Nevertheless, on \(L(t)=(t,0)\) with the legal ambient-degree-\(d\) label \(P_L=0\),
\[
(B_{\mathrm{sm}})_Z(L(t),0)=A(t)
\]
has exactly \(D-d\) roots. Thus neither monicity nor smooth absolute irreducibility improves the pointwise per-line root bound. This agrees with [P5], because these roots occur at distinct base points and only one tangent direction is allowed at each.

### [P11] Dense singular stress test — proved

For \(p>4d+1\), let \(D=2d\), choose distinct nonzero \(a_1,\ldots,a_{d-1}\), put \(g(X)=\prod_i(X-a_i)\), and define
\[
B_{\mathrm{den}}=Z^2-XYg(X)^2.
\]
The odd valuation of \(Y\) shows that \(XYg^2\) is not a square in \(\overline{\mathbb F}_p(X,Y)\); hence \(B_{\mathrm{den}}\) is absolutely irreducible. For each nonzero square \(s=c_s^2\),
\[
L_s(t)=(t,st),
\qquad P_s(t)=c_stg(t)
\]
is a degree-\(d\) graph root. There are \((p-1)/2>D\) such lines, and \((B_{\mathrm{den}})_Z=2Z\) has exactly the \(d=D-d\) roots \(0,a_1,\ldots,a_{d-1}\) on every graph. A polynomial root would satisfy \(Q^2=XYg^2\), contradicting the odd \(Y\)-valuation. All these ramified lifts are singular, so [P5] is not contradicted.

### [P12] Tempting replacements for simplicity — refuted

The following claims are false:

- absolute irreducibility plus more than \(D\) graph lines forces a global polynomial root without a simple common lift;
- a smooth absolutely irreducible raw-resultant curve controls graph-direction multiplicity;
- smooth absolute irreducibility of a monic discriminant gives \(o(D-d)\) ramified parameters on every graph line.

They are refuted respectively by [P7]–[P9], [P7]–[P8], and [P10]. The correct positive statement is [P5]: smoothness must hold at the lifted point on \(B=0\), not merely generically or on the projected resultant curve.

### [P13] Exponent consequence — conditional

Under the KTZ upper envelope \(D=O(\sqrt{dp/\epsilon})\), [P3] purges geometrically reducible factors at normalized cost \(O(1/(\epsilon p))\), and [P5] would charge smooth ramification by \(1/(p+1)\). These are improvements over a blanket \(D/p\) charge, but only after assigning incidences to a fixed factor and proving the required smoothness.

The explicit constructions show that absolute irreducibility does not supply that smoothness. If singular incidences are still charged by \(D/p\), the comparison
\[
\sqrt{\frac d{\epsilon p}}=O(\epsilon)
\]
again yields \(\epsilon^3=\Omega(d/p)\). This is an architecture diagnosis, not a proof that every possible method must remain cubic.

## Exponent Ledger

| Stage | Input scale | Exact loss | Output or requirement | Status |
|---|---:|---:|---:|---|
| KTZ benchmark | \(\epsilon\ge C(d/p)^{1/3}\) | Published proof losses | global agreement \(c\epsilon\) | quoted/proved |
| KTZ reconstruction | \(|\mathcal R|\le6400p/\epsilon\) | \(D/p\le1280\sqrt{d/(\epsilon p)}+16/p\) | \(\epsilon^3=\Omega(d/p)\) suffices | proved reconstruction |
| Frobenius purification | factor weights \(\delta_i\) | \(\sum_i\delta_i^2/[4dp(p+1)]\le D^2/[4dp(p+1)]\) | only absolute factors remain | proved |
| Purification at KTZ envelope | \(D^2=O(dp/\epsilon)\) | \(O(1/(\epsilon p))\) | needs \(\epsilon^2p=\Omega(1)\) to be \(O(\epsilon)\) | conditional |
| Smooth fixed factor | at most \(p^2\) edges | \(1/(p+1)\) | needs \(\epsilon p=\Omega(1)\) | proved |
| Linear regime | \(d\le D<2d\) | \(D(D-d)/p^2\) | vertex-based cleanup | proved |
| Singular table | \(D=d+1\), \(s=\lfloor(D/2)\rfloor\) | \(s/[p(p+1)]\) | \(\epsilon_{\rm tab}\ge s/(p+1)\); no global-agreement claim | proved |
| Residual per-line method | \(D=O(\sqrt{dp/\epsilon})\) | \(D/p=O(\sqrt{d/(\epsilon p)})\) | cubic threshold remains | conditional |

The new arguments use one explicit union bound in [P4]. They use no Markov inequality, Cauchy–Schwarz inequality, point-line mixing, interpolation multiplicity, or division by a derivative.

## Counterexample Attempts

1. **Degree-drop discriminant attack:** successful against normalized discriminants. For \(B=XZ+H(Y)\), \(\operatorname{Disc}_ZB=1\) but the raw resultant is \(X\); the omitted fiber contains every singular accepted lift.
2. **Absolute plane-curve attack:** unsuccessful as a route to soundness. The raw-resultant curve \(X=0\) is already smooth, absolutely irreducible, and has the expected \(p\) rational points. The missing statistic is directional multiplicity above its points.
3. **Monic repair:** unsuccessful. The construction in [P10] removes leading-coefficient degeneration and keeps both the hypersurface and discriminant smooth, but still attains \(D-d\) roots on one line.
4. **Many-direction repair:** unsuccessful. The constructions in [P8] and [P11] have more than \(D\) graph lines and no global polynomial root; the common lifted points are singular.
5. **Endpoint \(d=p-1\):** the attempted singular construction fails under \(D<p\). Here \(D=d\), and every primitive \(Z\)-dependent interpolant directly yields \(Z-Q\).
6. **Adversarial full tables:** [P8] is a full table with uniform sampling and explicit agreement. It is not a soundness counterexample: for example, its point table has substantial structured zero sets, so some global polynomial can have nontrivial agreement even though none matches every selected label.

## Characteristic Audit

- Because \(d>100\) and \(d<p\), the prime \(p\) is odd. The uses of \(2^{-1}\) and nonsquares are safe.
- [P1] identifies the actual inseparability threshold \(\operatorname{wdeg}B<dp\). The commonly imposed \(D<p\) is stronger and is needed for other polynomial-identity/root-count steps, not for vertical separability itself.
- Frobenius in [P3] is used only to compare absolute factors of an \(\mathbb F_p\)-polynomial. The test remains over the prime field; there is no extension-field test or descent.
- The quotient in [P8] is exact polynomial division. No value \(t=0\) is inverted.
- The standard discriminant/resultant distinction is explicit. For degree one, normalizing by the leading coefficient loses degree-dropping fibers.
- The lower boundary is tested at \(p=103,d=101,D=102\). No case with \(d\le100\) is invoked.
- The construction covers \(d=p-2\). At \(d=p-1\), the separate linear argument yields a graph polynomial immediately.
- Local labels have degree at most the ambient \(d\); global degree is total degree. No individual-degree substitution is made.
- The selected lines in [P8] use all \(p\) nonvertical directions, with \(s\) translates in each direction. The obstruction is therefore not caused by concentration in a small direction set.

## Limitations

This note does not prove a bivariate soundness theorem beyond KTZ, does not claim a new exponent, and does not bound the best global agreement for its explicit tables. It shows only that an absolute-factor/discriminant strategy must separately control singular accepted lifts.

The purification loss \(O(1/(\epsilon p))\) requires \(\epsilon^2p=\Omega(1)\) if discarded outright. That condition is harmless under the cubic benchmark but can fail in parts of the intended \((d/p)^{1-o(1)}\) regime. A more refined component argument is still needed.

Although [P9] proves that \(B=XZ+H(Y)\) is a minimum-weight interpolant for its displayed graph constraints, this note does not prove that the exact randomized reference-set and component-selection stages of KTZ necessarily output that factor. Conversely, it does not prove that those stages eliminate it.

Finally, Weil-type plane-curve estimates count rational points, whereas this bottleneck concerns accepted graph directions and multiplicities above those points. The explicit resultant line \(X=0\) already has optimal arithmetic; point counting alone cannot finish the argument.
