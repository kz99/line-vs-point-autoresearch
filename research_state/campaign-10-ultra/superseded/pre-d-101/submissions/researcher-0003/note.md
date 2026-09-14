# Prime-field vertical separability, multiplicity neutrality, and a zero-degree obstruction

## Abstract

Fix the bivariate affine line-versus-point test over the prime field \(\mathbb F_p\). I prove a prime-specific algebraic lemma: once the content in \(Z\) has been removed, every squarefree explainer \(B\) of \((1,1,d)\)-weighted degree \(D<p\) is automatically separable in the vertical variable, and
\[
\deg_{X,Y}\operatorname{Res}_Z(B,B_Z)
 \le (2n-1)D-dn^2\le D^2/d-D,
\]
where \(n=\deg_Z B\). This replaces the generic directional derivative in the KTZ factorization stage and sharpens the exceptional-line count. It does not improve the exponent: the remaining degenerate-point loss is \((D-d)/p\), and with \(D\asymp\sqrt{dp/\epsilon}\) it still requires \(\epsilon^3\gtrsim d/p\).

A Hasse/ideal-power audit also shows why the direct multiplicity variant is exponent-neutral and, for multiplicity at least two, incompatible with the simple-root Hensel step. Finally, the campaign statement is false at its explicitly allowed endpoint \(d=0\): for arbitrarily large primes there are modal-constant line tables with local agreement \(\Omega(\log p/(p\log\log p))\), while every global constant has agreement \(O(1/p)\). Thus `benchmark_improved=false`; the durable target first needs the correction \(1\le d<p\), or a trigger involving \(d+1\).

## Test and Notation

There are exactly \(p(p+1)\) affine lines in \(\mathbb F_p^2\). Every line contains \(p\) points and every point lies on \(p+1\) lines. Hence choosing a uniform line and then a uniform point on it is exactly uniform incident-pair sampling. For a point table \(f:\mathbb F_p^2\to\mathbb F_p\) and arbitrary line polynomials \(P_L\) of degree at most \(d\), write
\[
\epsilon=\operatorname{Agr}_{\rm LVP}(f,P)
 =\Pr_{L,\,x\in L}[P_L(x)=f(x)].
\]
Global degree always means **total degree**. No axis-parallel or best-fit-only test is substituted.

For \(1\le d<p\), set
\[
\operatorname{wdeg}(X^aY^bZ^i)=a+b+di.
\]
Write \(B=\sum_{i=0}^n b_i(X,Y)Z^i\). It is *primitive in \(Z\)* when \(\gcd_i b_i=1\). A line-polynomial graph is
\(\Gamma_L=\{(L(t),p_L(t)):t\in\mathbb F_p\}\).

The case \(d=0\) is treated separately because the above weight gives \(Z\) weight zero and the unrestricted weighted interpolation space is infinite-dimensional.

## Prior Results

The controlling source is [Kominers--Thaler--Zheng, ECCC TR26-147, revision 1](https://eccc.weizmann.ac.il/report/2026/147/revision/1/download). Their Theorem 1.1, specialized to \(m=2,q=p\), states the cubic trigger and global agreement \(c\epsilon\). Their exact bivariate parameters are
\[
100p\le |\mathcal R|\le \frac{6400p}{\epsilon},\qquad
D=16\bigl(\lfloor\sqrt{d|\mathcal R|}\rfloor+1\bigr),\qquad
k_1=\lfloor\epsilon p/1000\rfloor.
\]
Lemma 2.2 supplies \(|V_D|\ge D^3/(64d)\); Lemmas 4.1--4.3 compare this with \(|\mathcal R|(D+1)\) constraints and require \(D<k_1/2\). Lemmas 5.1--6.3 remove degenerate roots, lift, propagate, and yield agreement at least \(\epsilon/8000\). The implication
\[
|\mathcal R|=\Theta(p/\epsilon),\quad D^2=\Theta(d|\mathcal R|),\quad D=O(\epsilon p)
\Longrightarrow \epsilon^3=\Omega(d/p)
\]
is my exponent reconstruction from their displayed parameters, not a separately quoted KTZ theorem. The official revision does not explicitly state \(d\ge1\), while Lemma 2.2 divides by \(d\).

The cached pre-revision copy was visually checked for the radical and floor in \(D\): :codex-file-citation{path="/Users/kaizheng/Documents/ChatGPT/Line-vs-Point/.cache/references/ktz.pdf" purpose="source"}. The official revision linked above is controlling because the cache has older pagination and prose.

[Harsha--Kumar--Saptharishi--Sudan, arXiv:2311.12752v1](https://arxiv.org/abs/2311.12752), Theorem 4.2, explicitly assumes positive \(d\) and uses \(p>C d/\epsilon^7\) to obtain \(\Omega(\epsilon^4)\) bivariate agreement. Theorem 4.3 gives the characteristic-pruned interpolant; Lemmas 2.10 and 3.1 give the Newton/root-globalization ingredients. The numerical \(1/7\) is a rearrangement of Theorem 4.2's field-size condition and is attributed as KTZ's extraction, not as the statement of HKSS Theorem 1.4. The relevant formulas on pages 18--20 were visually checked here: :codex-file-citation{path="/Users/kaizheng/Documents/ChatGPT/Line-vs-Point/.cache/references/hkss.pdf" purpose="source"}.

The durable corpus contains no completed prior submission or verifier audit: all eight leaderboard files are empty arrays, campaign-300 has only queued jobs, and campaign-10 had four running researchers but no output directory when read. The literature summaries were therefore used only for navigation.

## Theorem

### Theorem A (vertical separability and weighted resultant)

Let \(p\) be prime, \(1\le d<p\), and \(D<p\). Let
\[
B(X,Y,Z)=\sum_{i=0}^n b_i(X,Y)Z^i\in\mathbb F_p[X,Y,Z]
\]
be nonzero, squarefree, primitive in \(Z\), of positive \(Z\)-degree \(n\), and of \((1,1,d)\)-weighted degree at most \(D\). Then
\[
\gcd(B,B_Z)=1
\]
and, for \(R=\operatorname{Res}_Z(B,B_Z)\),
\[
R\ne0,
\qquad
\deg R\le E:=(2n-1)D-dn^2
\le D^2/d-D.
\]

If \(\mathcal T\) is any family of distinct affine lines carrying degree-at-most-\(d\) polynomials with \(B(L(t),p_L(t))\equiv0\), then at most \(E\) lines also have \(B_Z(L(t),p_L(t))\equiv0\). On every other line there are at most \(D-d\) points at which \(B_Z(L(t),p_L(t))=0\). Their normalized incidence loss is at most
\[
\frac{E}{p(p+1)}+\frac{D-d}{p}.
\]
If one first removes the \(Z\)-content \(H(X,Y)\) from an interpolant of degree at most \(D\), the at most \(D\) content-trivial lines add \(D/[p(p+1)]\).

### Proposition B (thickened-line interpolation)

Let \(r\) line graphs \(\Gamma_M\) carry degree-at-most-\(d\) labels, let \(s\ge1\), and let \(W_D\) be the full weighted-degree-at-most-\(D\) space. In affine coordinates \((t,u)\) with \(M=\{u=0\}\), put
\[
I_M=(u,Z-p_M(t)).
\]
Then
\[
\dim W_D=\sum_{j=0}^{\lfloor D/d\rfloor}\binom{D-dj+2}{2},
\]
and the codimension of \(I_M^s\cap W_D\) is at most
\[
J_s(D,d)=\sum_{a+b<s}(D-a-db+1)_+.
\]
Consequently, a nonzero \(A\in W_D\cap\bigcap_M I_M^s\) exists whenever \(\dim W_D>rJ_s(D,d)\). For \(D\ge2d\), it suffices that
\[
D^2>16drs(s+1).
\]
At each distinct accepted crossing with a seed graph, the restriction to a target graph acquires a root of multiplicity at least \(s\); \(N\) distinct crossings force the target identity if \(sN>D\).

### Theorem C (the legal d=0 endpoint refutes the campaign statement)

For every prime \(p\ge e^{64}\), set
\[
k=\left\lfloor\frac{\log p}{4\log\log p}\right\rfloor.
\]
There exist \(f:\mathbb F_p^2\to\mathbb F_p\) and a degree-zero line table such that
\[
\operatorname{Agr}_{\rm LVP}(f,P)\ge \frac{k}{256p},
\qquad
\max_{\deg Q\le0}\Pr_x[Q(x)=f(x)]\le\frac2p.
\]
The global/local ratio is at most \(512/k=o(1)\). Therefore no absolute \(c>0\) can give global agreement at least \(c\epsilon\) under the trigger \(C(d/p)^\alpha\) for all \(0\le d<p\), for any \(\alpha>0\).

## Proof

**[P1, proved] Weighted consequences.** Weighted degree gives \(n\le D/d<p\) and \(\deg b_i\le D-di\). In particular, \(n\) is nonzero in \(\mathbb F_p\), so \(B_Z\) has \(Z\)-degree exactly \(n-1\). No derivative coefficient is divided by zero.

**[P2, proved] Vertical coprimality.** Suppose an irreducible \(C\) divides both \(B\) and \(B_Z\), and write \(B=CE\). Squarefreeness gives \(C\nmid E\). Modulo \(C\),
\[
0\equiv B_Z\equiv C_ZE,
\]
so \(C\mid C_Z\); degree forces \(C_Z=0\). Since \(\deg C\le D<p\), every positive \(Z\)-exponent of \(C\) is below \(p\) and has nonzero derivative. Hence \(C\in\mathbb F_p[X,Y]\). Then \(C\) divides every \(b_i\), contradicting primitivity. Thus \(\gcd(B,B_Z)=1\).

**[P3, proved] Resultant degree.** The Sylvester determinant has \(n-1\) rows from \(B\) and \(n\) rows from \(B_Z\); every monomial in \(R\) therefore contains \(2n-1\) coefficient factors. Under \(b_i\mapsto\lambda^i b_i\), one has \(B(Z)\mapsto B(\lambda Z)\) and \(B_Z(Z)\mapsto\lambda B_Z(\lambda Z)\), so the resultant scales by \(\lambda^{n(n-1)+n}=\lambda^{n^2}\). Every resultant monomial consequently has coefficient-index sum \(n^2\). Since \(\deg b_i\le D-di\),
\[
\deg R\le(2n-1)D-dn^2.
\]
Coprimality makes \(R\ne0\). Finally,
\[
D^2/d-D-E=(D-dn)^2/d\ge0.
\]

**[P4, proved] Exceptional lines and points.** If both \(B\) and \(B_Z\) vanish formally on \(\Gamma_L\), then \(R(L(t))\equiv0\). A nonzero bivariate polynomial of degree \(E\) can contain at most \(E\) distinct affine lines, because each line equation is a distinct irreducible factor. On a remaining line, \(B_Z(L(t),p_L(t))\) is nonzero and has degree at most \(D-d\), hence at most \(D-d\) roots. Dividing the line count by \(p(p+1)\) and the point count by \(p\) gives the asserted incidence loss. This uses neither a discriminant nor a union over derivative directions.

**[P5, proved] Consequence for the KTZ algebraic stage.** KTZ writes \(A=HB\), with \(H\) the gcd of the \(Z\)-coefficients. Their minimum interpolant is squarefree and has \(A_Z\ne0\); hence \(B\) is primitive, squarefree, and has positive \(Z\)-degree. Lemma 4.1 supplies \(D<p\). Theorem A therefore permits using \(B_Z\) directly in Section 5. The bad-line term improves from \(D(D-1)/[p(p+1)]\) to at most \((D^2/d-D)/[p(p+1)]\), and the per-line point term from \(D/p\) to \((D-d)/p\). Hensel lifting divides only by retained nonzero values of \(B_Z\).

**[P6, proved] Why the exponent does not improve.** KTZ Lemma 3.2 and Section 4 give \(|\mathcal R|=\Theta(p/\epsilon)\) and \(D=\Theta(\sqrt{d|\mathcal R|})=\Theta(\sqrt{dp/\epsilon})\). Formal extension, post-deletion minimum degree, and lifting require \(D=O(\epsilon p)\). Squaring and rearranging gives
\[
\frac{dp}{\epsilon}=O(\epsilon^2p^2)
\quad\Longleftrightarrow\quad
\epsilon^3=\Omega(d/p).
\]
The new exceptional-line term is \(O(1/(\epsilon p))\), but the remaining point term is \((D-d)/p=\Theta(\sqrt{d/(\epsilon p)})\); asking it to be \(O(\epsilon)\) gives the same cubic inequality.

**[P7, proved] Thickened-line dimension count.** The filtered change of variables \((X,Y,Z)\leftrightarrow(t,u,Z-p_M(t))\) preserves weighted degree. Modulo \(I_M^s\), the surviving basis monomials are
\[
t^c u^a(Z-p_M(t))^b,
\qquad a+b<s,\quad c+a+db\le D,
\]
which gives \(J_s(D,d)\). Codimensions subadd over \(r\) seed graphs. For \(D\ge2d\), the terms \(0\le j\le D/(2d)\) show \(\dim W_D\ge D^3/(16d)\), while \(J_s(D,d)\le s(s+1)D\). The displayed sufficient condition follows.

**[P8, proved] Multiplicity propagation and its simple-root obstruction.** At a crossing of distinct base lines, both generators of \(I_M\) vanish to order at least one on the target graph. Membership in \(I_M^s\) therefore gives Hasse root multiplicity at least \(s\); \(N\) distinct points contribute total multiplicity at least \(sN\). Repeated sampled lines through the same point count only once. However, for \(s\ge2\), \(A_Z\in I_M^{s-1}\), so every seed root is vertically degenerate. If \(A=HB\) and \(H\) is not identically zero on \(M\), then \(A_Z=HB_Z\) still forces \(B_Z\) to vanish formally there. Plain multiplicity interpolation therefore cannot feed the simple-root Newton--Hensel step.

**[P9, proved] Multiplicity exponent ledger.** At KTZ scale, \(r\le6400p/\epsilon\). If \(\epsilon p\ge200\), Lemma 3.2 supplies more than \(N=\epsilon p/400\) distinct covered points per target line. The sufficient interpolation and propagation inequalities are
\[
D^2>16drs(s+1),\qquad D<sN.
\]
These worst-case estimates guarantee a common interval under
\[
\epsilon^3>16{,}384{,}000{,}000\frac{s+1}{s}\frac d p.
\]
Thus \(s\) cancels up to \((s+1)/s\), and this direct certificate has no exponent gain.

**[P10, proved] Occupancy on one line.** Choose \(f(x)\) independently and uniformly in \(\mathbb F_p\). On a fixed line let \(N_a\) be the occupancy of color \(a\), \(M=\max_aN_a\), and \(Y=|\{a:N_a=k\}|\). For \(p\ge e^{64}\), \(k!\le k^k\le p^{1/4}\), and
\[
\frac1{8k!}\le\Pr[N_a=k]\le\frac1{k!},
\qquad
\Pr[N_a=N_b=k]\le\frac1{k!^2}\quad(a\ne b).
\]
The lower bound uses \(\binom pkp^{-k}\ge1/(2k!)\) and \((1-1/p)^p\ge1/4\). Hence
\[
\mathbb EY\ge\frac{p}{8k!},
\qquad
\mathbb EY^2\le\frac p{k!}+\frac{p^2}{k!^2}
 \le\frac{2p^2}{k!^2}.
\]
The second-moment/Cauchy--Schwarz inequality loses the explicit factor \(1/128\): \(\Pr[Y>0]\ge(\mathbb EY)^2/\mathbb EY^2\ge1/128\). Thus \(\mathbb EM\ge k/128\).

**[P11, proved] Global balance and simultaneous existence.** For deterministic \(f\), let \(A(f)\) be the acceptance obtained by choosing a modal constant on every line. Linearity of expectation—no independence between lines—is enough to give \(\mathbb EA(f)\ge k/(128p)\). For a global color class \(X_a=|f^{-1}(a)|\sim\operatorname{Bin}(p^2,1/p)\), Chernoff gives \(\Pr[X_a>2p]\le(e/4)^p\). The only union bound in this proof is over the \(p\) colors:
\[
\Pr[\max_aX_a>2p]\le p(e/4)^p\le\frac{k}{256p}.
\]
Since \(0\le A\le1\), restricting the expectation to the balance event leaves at least \(k/(256p)\). Some balanced \(f\) attains that value. No Markov loss is used.

**[P12, proved] Refutation at d=0.** Choose each \(P_L\) to be a modal color. Its acceptance is \(A(f)\). Every total-degree-zero polynomial is constant, so its agreement is at most \(2/p\). Given proposed absolute \(C,c>0\), choose a sufficiently large prime with \(k>512/c\). The premise \(\epsilon\ge C(0/p)^\alpha=0\) holds, but global agreement is less than \(c\epsilon\). This refutes the literal cubic benchmark and, for every fixed \(0<\eta<1\), the literal \((d/p)^{1-\eta}\) target.

## Exponent Ledger

| Stage | Input | Loss | Output |
|---|---|---|---|
| KTZ seed selection | local agreement \(\epsilon\) | \(|\mathcal R|=\Theta(p/\epsilon)\) | one factor \(\epsilon^{-1}\) |
| Ordinary interpolation | \(|V_D|=\Theta(D^3/d)\), \(|\mathcal R|(D+1)\) constraints | \(D^2=\Theta(d|\mathcal R|)\) | \(D=\Theta(\sqrt{dp/\epsilon})\) |
| Extension/lifting | \(D\) versus \(\Theta(\epsilon p)\) roots/lines | require \(D=O(\epsilon p)\) | \(\epsilon^3=\Omega(d/p)\) |
| New vertical resultant | \(n\le D/d\) | at most \(D^2/d-D\) bad lines | normalized \(O(1/(\epsilon p))\) at KTZ scale |
| Remaining bad points | degree \(D-d\) on each nonbad line | \((D-d)/p\) | still forces \(\epsilon^3=\Omega(d/p)\) |
| Multiplicity \(s\) | interpolation cost \(\Theta(s^2)\), root credit \(s\) | \(D\asymp s\sqrt{dp/\epsilon}\), allowance \(s\epsilon p\) | \(s\) cancels; exponent \(1/3\) |
| Degree zero | \(k=\Theta(\log p/\log\log p)\) | local \(\ge k/(256p)\), global \(\le2/p\) | global/local \(\le512/k=o(1)\) |

KTZ Lemma 3.2 also uses a Chernoff bound, a union bound over all affine lines, and Chebyshev for \(|\mathcal R|\); these produce the displayed constants but no additional power of \(\epsilon\) beyond \(|\mathcal R|=O(p/\epsilon)\). Their point-line Cauchy--Schwarz mixing error is \(1/\sqrt{p+1}\), required to be at most \(\epsilon/8000\); for \(d\ge1\) this is dominated by a sufficiently large cubic trigger. These are quoted source losses, not silently suppressed steps in the new proof.

## Counterexample Attempts

1. **Adversarial table, successful:** the random balanced coloring with modal constant line labels proves Theorem C. Randomness is only a probabilistic existence proof; the resulting table is deterministic.
2. **Concentrated good direction, not a vanishing-ratio example:** for \(d=0\), take \(f(x,y)=x\). The \(p\) vertical lines accept everywhere with their constant labels; every other line has one occurrence of each value. The modal table has \(\epsilon=2/(p+1)\), while the best global constant has agreement \(1/p\), a ratio \((p+1)/(2p)>1/2\).
3. **Inseparability boundary, successful algebraic obstruction:** for \(d=1,D=p\), \(B=Z^p-X\) is primitive and squarefree, but \(B_Z=0\). Thus \(D<p\) cannot simply be dropped.
4. **Multiplicity, refuted as a plug-in improvement:** the factor \(s\) cancels in the exponent, and \(s\ge2\) destroys simple vertical roots on every seed graph.
5. **d near p, no counterexample claimed:** every line table can interpolate arbitrary line values at \(d=p-1\), but this does not replace total degree by individual degree and does not itself contradict constant global agreement. For any threshold constant \(C>1\), the cubic premise is vacuous when \(d/p>C^{-3}\).

## Characteristic Audit

- Theorem A is stated only over \(\mathbb F_p\); no extension-field or descent claim is made.
- The deductions \(n<p\) and \(C_Z=0\Rightarrow C\in\mathbb F_p[X,Y]\) use \(D<p\). The explicit \(Z^p-X\) example audits sharpness.
- No discriminant is divided by or assumed nonzero. The nonzero resultant follows from proved coprimality.
- No irreducibility of \(B\) is assumed. Squarefreeness is used factor by factor; primitivity excludes an \(X,Y\)-only common factor.
- Content division is safe in the integral domain \(\mathbb F_p[t]\). Hensel division occurs only after retaining \(B_Z(x,f(x))\ne0\).
- The multiplicity proof uses ideal powers/Hasse multiplicity. Ordinary derivatives would be invalid for orders reaching \(p\), since \((t^p)'=0\).
- Several lines through one point provide one distinct root, not several. Parallel lines provide no crossing. Both concentration modes are excluded from multiplicity overcounting.
- At \(d=0\), the weighted monomial count \(D^3/(64d)\) is undefined and the \(Z\)-weight is zero; this matches the endpoint missed by the positive-degree proof.
- For the smallest primes, the asymptotic counterexample is not asserted. Exhaustive checks give ratios \(3/4\) at \(p=2\) and \(4/7\) at \(p=3\). At \(p=2,d=1\), Theorem A only permits \(D=1\), where vertical differentiation is ordinary and separable.

## Limitations

The vertical-resultant lemma is a genuine prime-field simplification and improves one deletion term, but it leaves the cubic bottleneck intact. Proposition B is only an interpolation/root-count statement: for \(s\ge2\) it does not provide the simple roots required for a global polynomial, and no single-polynomial soundness theorem follows from it. The \(d=0\) construction is an obstruction to the stated quantifiers, not a positive-degree lower bound. Small-field enumeration is reported only as falsification evidence and proves no asymptotic theorem.

Accordingly, the sound positive-degree baseline remains KTZ's \(1/3\) theorem with global agreement \(\Omega(\epsilon)\), while the literal `0 <= d < p` campaign formulation is refuted and should be corrected before further exponent comparisons.
