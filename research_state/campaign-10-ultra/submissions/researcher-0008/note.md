# Sharp incidence-only losses in bivariate prime-field line–point agreement

## Abstract

For the affine line-versus-point test on \(\mathbb F_p^2\), I prove two exact incidence obstructions. First, for every prime \(p\) and every campaign degree \(101\le d<p\), there is a deterministic legal table with local agreement \(\epsilon=d/p\), accepted degree exactly \(d\) on every affine line, accepted degree \(d\) or \(d+1\) at every point, and acceptance supported on all lines. Any fractional family of lines that reaches a fixed fraction \(\theta\) of the accepted points of every target line through *other* accepted lines has total weight \(\Theta(p/\epsilon)\), with a multiplicative gap at most \((d+1)/(d-1)\). Thus the \(p/\epsilon\) scale cannot be improved by a universal graph-theoretic cover, even with exact near-regularity and fractional weights.

Second, for every table of agreement \(\epsilon\), the probability that two uniformly chosen distinct lines through a uniform point are both accepted there is exactly

\[
\epsilon^2-\frac{\epsilon(1-\epsilon)}p+
\frac{\operatorname{Var}_x(a_x)}{p(p+1)},
\]

where \(a_x\) is the accepted degree of \(x\). The lower bound is attained by accepting exactly \(k\) direction classes. Hence the usual \(\epsilon^2\) collision loss is sharp.

Both extremal tables have the obvious global polynomial \(Q=0\). They are therefore obstructions to incidence-blind proof architectures, not counterexamples to soundness. An exact primary-source audit also shows that KTZ already uses the affine Vinh estimate, while the stronger Stevens–de Zeeuw bounds do not give the linear component size needed for global agreement in their characteristic ranges. The unconditional benchmark exponent remains \(1/3\).

## Test and Notation

Fix a prime \(p\), an integer \(101\le d<p\), and dimension \(m=2\). Let \(\mathcal L\) be the \(p(p+1)\) affine lines of \(\mathbb F_p^2\). Every line has \(p\) points and every point lies on \(p+1\) lines.

A point table is \(f:\mathbb F_p^2\to\mathbb F_p\). Each \(L\in\mathcal L\) has one polynomial label \(P_L\) of degree at most \(d\), interpreted using a fixed affine parameterization of \(L\). Put

\[
A(x,L)=1_{\{P_L(x)=f(x)\}},\qquad
\epsilon=\frac{\sum_{x,L\ni x}A(x,L)}{p^2(p+1)}.
\]

This is exactly uniform-line-then-uniform-point sampling. Let

\[
a_x=\sum_{L\ni x}A(x,L),\qquad
N_E(L)=\{x\in L:A(x,L)=1\}.
\]

For nonnegative line weights \(\lambda=(\lambda_M)_{M\in\mathcal L}\), define the capped load reaching an accepted incidence \((x,L)\) through other lines by

\[
u_{x,L}(\lambda)=
\min\left\{1,\sum_{\substack{M\ni x,\,M\ne L}}A(x,M)\lambda_M\right\}.
\]

For \(0<\theta\le1\), call \(\lambda\) \(\theta\)-reaching if

\[
\sum_{x\in N_E(L)}u_{x,L}(\lambda)\ge\theta |N_E(L)|
\quad\text{for every }L\in\mathcal L.
\]

Indicator weights are ordinary selected-line families. Fractional weights also cover multisets after coincident copies are combined.

## Prior Results

The active corpus contains four earlier submissions and four verifier audits. Researcher-0002 is the only accepted result: a connected accepted component of minimum degree \(k\) and line measure \(\tau\) is decoded under \(k^2\ge2^{40}dp\) and \(k^3\ge2^{40}d\tau p^2\), giving a conditional exponent \(1/2\) when \(\tau=O(\epsilon)\). Researcher-0001 is revise-grade: its support-sensitive cubic theorem and modal obstruction were validated, but its exact statement and mixing algebra need repairs. Researcher-0003 was rejected because its hashed theorem omitted essential hypotheses forcing a \(Z\)-dependent interpolant; its weighted-resultant lemma survives only with the fuller hypotheses in the note. Researcher-0004's exact jet count is revise-grade and shows only that uniform rank-blind multiplicity is exponent-neutral. No active submission proves an unconditional exponent above \(1/3\). The data manifest is a launch snapshot and is not current mathematical evidence; the live boards and audits control this synthesis.

The benchmark is [Kominers–Thaler–Zheng, Revision 1, Theorem 1.1](https://eccc.weizmann.ac.il/report/2026/147/revision/1/download/): over every finite field, agreement \(\epsilon\ge C(d/q)^{1/3}\) yields one total-degree-at-most-\(d\) polynomial with global agreement \(c\epsilon\). In its bivariate proof, Lemmas 6.2–6.3 give \(\epsilon/8000\). The following explanation is a reconstruction, not a quoted theorem: Lemma 3.2 gives \(|R|\le6400p/\epsilon\); Section 4 uses \(D=16(\lfloor\sqrt{d|R|}\rfloor+1)\); and Lemmas 4.1, 4.3, and 6.1 require \(D=O(\epsilon p)\). Hence \(\epsilon^3=\Omega(d/p)\). KTZ supplies one-sided bounds, not simultaneous \(\Theta\)-saturation.

The exact affine spectral estimate already appears as KTZ Lemma 2.1. Its primary antecedent is [Vinh, Theorem 3](https://arxiv.org/pdf/0711.4427v1):

\[
I(P,T)\le\frac{|P||T|}{p}+\sqrt{p|P||T|}.
\]

For medium-size distinct sets, [Stevens–de Zeeuw, Theorem 3](https://arxiv.org/pdf/1609.06284v4) proves

\[
I(P,T)\ll |P|^{11/15}|T|^{11/15}
\]

only when \(|P|^{7/8}<|T|<|P|^{8/7}\) and \(|P|^{-2}|T|^{13}\ll p^{15}\). Their Theorem 4 additionally treats a genuine Cartesian set \(A\times B\), under \(|A|\le|B|\), \(|A||B|^2\le|T|^3\), and \(|A||T|\ll p^2\). These hypotheses cannot be silently imposed on accepted-point supports. Bourgain–Katz–Tao Theorem 6.2 has an unspecified gain depending on a fixed support exponent and is not used.

## Theorem

**Theorem A (regular carrier and other-line fractional-cover obstruction).** Let \(p\) be prime and let \(101\le d<p\). There exist \(f:\mathbb F_p^2\to\mathbb F_p\) and degree-exactly-\(d\) labels \(P_L\), one for every affine line, such that:

1. \(|N_E(L)|=d\) for every \(L\), while \(a_x\in\{d,d+1\}\) for every \(x\). Exactly \(pd\) points have degree \(d+1\), and the remaining \(p(p-d)\) points have degree \(d\).
2. The agreement is \(\epsilon=d/p\), and every affine line supports acceptance.
3. For every \(0<\theta\le1\), if \(\operatorname{OPT}_\theta\) denotes the infimum of \(\sum_L\lambda_L\) over all nonnegative \(\theta\)-reaching weights, then

\[
\frac{\theta p(p+1)}{d+1}
\le \operatorname{OPT}_\theta
\le \frac{\theta p(p+1)}{d-1}.
\]

4. The total-degree-zero polynomial \(Q=0\) satisfies \(Q(x)=f(x)\) for every point.

**Lemma B (exact two-line collision identity).** For any valid table in the same ambient regime, let \(\Gamma_2\) be the probability that, after choosing \(x\) uniformly and an ordered pair \((L,M)\) of distinct lines through \(x\) uniformly, both \((x,L)\) and \((x,M)\) accept. Then

\[
\Gamma_2=
\epsilon^2-\frac{\epsilon(1-\epsilon)}p+
\frac{\operatorname{Var}_x(a_x)}{p(p+1)}.
\]

For every integer \(1\le k\le p+1\), equality in the lower bound is attained by a valid table of ambient degree cap \(d\) with \(\epsilon=k/(p+1)\).

**Proposition C (black-box incidence range).** Let a balanced accepted component have \(N\) point vertices, \(N\) distinct line vertices, and minimum degree at least \(k\). If Stevens–de Zeeuw Theorem 3 applies, then \(N\gg k^{15/7}\). This consequence alone reaches \(N=\Omega(kp)\) only outside that theorem's positive-characteristic range. If the point set is additionally a balanced Cartesian product and Stevens–de Zeeuw Theorem 4 applies, its consequence \(N\gg k^{8/3}\) likewise reaches \(N=\Omega(kp)\) only outside its characteristic range.

## Proof or Conditional Proof

**[P1] (proved: affine incidence decomposition).** Add \(p\) dummy point vertices. For each \(b\in\mathbb F_p\), connect dummy vertex \(z_b\) to the \(p\) lines \(y=mx+b\), \(m\in\mathbb F_p\), and to the vertical line \(x=b\). The resulting bipartite graph has \(p(p+1)\) vertices on each side and is \((p+1)\)-regular. A regular bipartite graph has a perfect matching: for every left set \(S\), its \((p+1)|S|\) edges enter at most \((p+1)|N(S)|\) slots, so Hall's condition holds. Removing a perfect matching preserves regularity. Iteration decomposes the augmented graph into \(p+1\) perfect matchings, regarded as colors.

After deleting the dummy edges, every real point sees every color exactly once. Every affine line misses exactly the color of its unique dummy edge. Each color is absent from exactly \(p\) affine lines because its perfect matching contains exactly one edge at each of the \(p\) dummy vertices.

**[P2] (proved: select and repair colors).** Select any \(d\) colors and let \(E_0\) be their real incidence edges. Every point has \(E_0\)-degree \(d\). A line has degree \(d\) unless its missing color was selected, in which case it has degree \(d-1\). There are exactly \(pd\) distinct deficient lines.

Put \(r=p+1-d>0\). In the graph of unselected real incidences from deficient lines to real points, every deficient line has degree \(r\), while every point has degree at most \(r\). Hence for every deficient-line set \(S\),

\[
r|S|=e(S,N(S))\le r|N(S)|.
\]

Hall gives a matching saturating all deficient lines. Add these matching edges to \(E_0\). Every line now has degree \(d\); the \(pd\) distinct matching endpoints have point degree \(d+1\), and all other points retain degree \(d\).

**[P3] (proved: realize the accepted graph).** Set \(f=0\). For each fixed parameterization \(L(t)\), let \(S_L\subseteq\mathbb F_p\) be the \(d\) parameters of the selected edges on \(L\), and define

\[
p_L(t)=\prod_{a\in S_L}(t-a).
\]

This polynomial has degree exactly \(d<p\) and vanishes exactly on \(S_L\). Therefore the accepted-incidence graph is precisely the graph from [P2]. Since it has \(p(p+1)d\) edges out of \(p^2(p+1)\),

\[
\epsilon=d/p.
\]

All lines support acceptance. The legal global polynomial \(Q=0\) agrees with \(f\) everywhere.

**[P4] (proved: fractional-cover lower bound).** Let \(\lambda\) be \(\theta\)-reaching and define the larger common capped load

\[
v_x=\min\left\{1,\sum_{M\ni x}A(x,M)\lambda_M\right\}.
\]

Since \(u_{x,L}\le v_x\), double counting gives

\[
\theta d\,p(p+1)
\le \sum_L\sum_{x\in N_E(L)}u_{x,L}
\le \sum_x a_xv_x
\le(d+1)\sum_xv_x.
\]

Also

\[
\sum_xv_x
\le\sum_x\sum_{M\ni x}A(x,M)\lambda_M
=d\sum_M\lambda_M.
\]

Thus

\[
\sum_M\lambda_M\ge\frac{\theta p(p+1)}{d+1}.
\]

No Markov, union, or Cauchy–Schwarz loss occurs. An ordinary selected set is the special case \(\lambda_M\in\{0,1\}\), so the same lower bound applies to KTZ's stricter other-line reach condition.

**[P5] (proved: fractional-cover upper bound).** Give every line weight \(\lambda_M=\theta/(d-1)\). At an accepted incidence \((x,L)\), at least \(a_x-1\ge d-1\) other accepted lines pass through \(x\). Hence \(u_{x,L}\ge\theta\), so the weights are \(\theta\)-reaching. Their total weight is \(\theta p(p+1)/(d-1)\). This proves Theorem A, including a multiplicative upper-to-lower gap \((d+1)/(d-1)\le102/100\).

**[P6] (proved: collision identity).** For a fixed point \(x\), exactly \(a_x(a_x-1)\) ordered pairs of distinct incident lines are jointly accepted. Therefore

\[
\Gamma_2=
\frac{\mathbb E_x[a_x(a_x-1)]}{p(p+1)}.
\]

Because \(\mathbb E_xa_x=(p+1)\epsilon\), expanding the variance gives

\[
\Gamma_2=
\frac{(p+1)^2\epsilon^2-(p+1)\epsilon+\operatorname{Var}_x(a_x)}{p(p+1)},
\]

which is Lemma B. In particular, \(\Gamma_2\ge\epsilon^2-\epsilon(1-\epsilon)/p\), and if \(\epsilon\ge2/p\), then \(\Gamma_2\ge\epsilon^2/2\). This is one exact Jensen/variance loss and no further concentration loss.

**[P7] (proved: collision equality and concentrated directions).** Fix \(k\) projective directions. Put \(f=0\), label every line in those directions by the zero polynomial, and every other line by the constant-one polynomial. These are legal labels under the ambient cap \(d>100\). Every point has accepted degree exactly \(k\), so the variance term vanishes. The agreement and collision probability are

\[
\epsilon=\frac{k}{p+1},\qquad
\Gamma_2=\frac{k(k-1)}{p(p+1)}.
\]

Direct substitution shows equality in Lemma B. The same \(Q=0\) has global agreement one, so concentrated directions sharpen the incidence loss but do not obstruct soundness.

**[P8] (proved: where the KTZ cubic occurs).** KTZ Lemma 3.2 uses sampling rate \(\Theta(1/(\epsilon p))\), Chernoff plus a union bound over at most \(p(p+1)\) target lines, and Chebyshev for sample size. These estimates cost constants and produce only the one-sided upper bound \(|R|=O(p/\epsilon)\). Weighted interpolation then gives

\[
D=O\left(\sqrt{d|R|}\right)
 =O\left(\sqrt{dp/\epsilon}\right).
\]

The distinct-root and lifting budgets require \(D=O(\epsilon p)\). Squaring gives \(\epsilon^3=\Omega(d/p)\). Theorem A shows that replacing the cover by a universally \(o(p/\epsilon)\)-weight fractional cover is false, but does not rule out decoding the obstructing case before interpolation.

**[P9] (proved: Vinh/KTZ mixing barrier).** KTZ Lemma 2.1 is the absolute affine form of Vinh's spectral estimate, with normalized error \((p+1)^{-1/2}\). Lemma 6.2 absorbs it using

\[
(p+1)^{-1/2}\le\epsilon/8000.
\]

At the current cubic threshold this is weaker: \((d/p)^{1/3}\sqrt p=d^{1/3}p^{1/6}\). For a prospective exponent \(\alpha>1/2\), however, fix the legal lower boundary \(d=101\). If \(\epsilon=C(101/p)^\alpha\), then

\[
\epsilon\sqrt p=C\,101^\alpha p^{1/2-\alpha}\longrightarrow0.
\]

Thus Vinh-only component recovery cannot establish linear global agreement in this regime. This is a method obstruction, not a counterexample to a stronger theorem.

**[P10] (proved: Stevens–de Zeeuw diagnostics).** In the balanced setting of Proposition C, minimum degree gives \(kN\le I(P,T)\). Theorem 3 gives

\[
kN\ll N^{22/15},\qquad N\gg k^{15/7}.
\]

For this lower bound to be at least the required \(kp\), one needs \(k^{8/7}\gtrsim p\), or \(k\gtrsim p^{7/8}\). At that scale it forces \(N\gtrsim p^{15/8}\), whereas the theorem's characteristic hypothesis in the balanced case is \(N^{11}\ll p^{15}\), i.e. \(N\ll p^{15/11}\). There is no asymptotic overlap.

If the balanced point set is genuinely Cartesian, Theorem 4 gives

\[
kN\ll N^{11/8}+N,
\qquad N\gg k^{8/3}
\]

once the linear term is absorbed. Reaching \(N\gtrsim kp\) would require \(k\gtrsim p^{3/5}\) and hence \(N\gtrsim p^{8/5}\). But the characteristic condition \(|A||T|\ll p^2\), with \(|A|=\sqrt N\) and \(|T|=N\), requires \(N\ll p^{4/3}\). Again there is no overlap. These are exponent reconstructions from the quoted theorems, not source-stated low-degree-test conclusions.

**[P11] (refuted: incidence-only shortcut).** The claim that acceptance density alone always yields either \(\omega(\epsilon^2)\) compatible line-pair density or an \(o(p/\epsilon)\)-weight family reaching a fixed fraction of every accepted line is false. Lemma B refutes the first alternative and Theorem A refutes the second. Since both examples have a perfect decoder, they instead prove that a successful argument must branch on algebraic or value coherence.

## Exponent Ledger

| Stage | Input | Loss | Output |
|---|---|---|---|
| KTZ selection | \(\epsilon\) | one inverse \(\epsilon\) | \(|R|=O(p/\epsilon)\) |
| KTZ interpolation | \(|R|\) | square root | \(D=O(\sqrt{dp/\epsilon})\) |
| KTZ root budget | \(D=O(\epsilon p)\) | cubic comparison | \(\epsilon^3=\Omega(d/p)\) |
| Regular construction | degree \(d\) | none | \(\epsilon=d/p\), line degree \(d\), point degree \(d\) or \(d+1\) |
| Fractional reach | fraction \(\theta\) | factor between \(d-1\) and \(d+1\) only | \(\operatorname{OPT}_\theta=\Theta(p/\epsilon)\) |
| Collision extraction | \(\epsilon\) | exact square plus finite correction | \(\Gamma_2\ge\epsilon^2-\epsilon(1-\epsilon)/p\) |
| KTZ/Vinh mixing | component degree \(\Theta(\epsilon p)\) | \(p^{-1/2}\) error | linear recovery only when \(\epsilon\gtrsim p^{-1/2}\) by this route |
| Stevens–de Zeeuw, balanced | minimum degree \(k\) | exponent \(15/7\) | \(N\gg k^{15/7}\), insufficient for \(N\gg kp\) in range |
| Stevens–de Zeeuw, Cartesian | minimum degree \(k\) | exponent \(8/3\) | \(N\gg k^{8/3}\), insufficient for \(N\gg kp\) in range |
| Constructed global output | \(f=0\) | none | one \(Q=0\) with agreement \(1\) |

The new construction is deterministic. The only convexity loss is exposed exactly by the variance term in Lemma B. No logarithmic, Markov, union, derivative, or multiplicity loss is suppressed.

## Counterexample Attempts

Theorem A is a successful counterexample to a universal smaller reaching family. Unlike the earlier random balanced-color example, it is deterministic, exactly regular on the line side, within one on the point side, supported on every line, valid at \(d=101\), and valid near \(p\). Its fractional formulation also prevents an apparent escape through line multiplicities or randomized weights.

It fails completely as a soundness counterexample: \(f=Q=0\) everywhere. This is the intended sparsify-or-decode separation. The earlier verifier-accepted balanced-color construction behaves similarly at larger local agreements.

The direction-class table attains the collision lower bound and tests concentrated good directions. It too has perfect global agreement. Thus neither high collision energy nor direction concentration alone identifies a hard instance.

The modal table from researcher-0001 remains the only active genuine endpoint obstruction: at ambient \(d=101\), it has local agreement \(\Theta(\log p/(p\log\log p))\) and global degree-101 agreement below \(2/p\). It refutes a literal constant-times-\(d/p\) theorem but stays below every fixed \((d/p)^{1-\eta}\) trigger.

Inseparability does not enter either new construction. At \(d=p-1\), the regular construction remains valid, but its perfect global polynomial confirms that the near-\(p\) regime is not an obstruction.

## Characteristic Audit

- The ambient field is exactly \(\mathbb F_p\), and \(101\le d<p\).
- Each root polynomial has \(d\) distinct linear factors and formal degree below \(p\). Its zero set has exactly \(d\) points.
- No derivative is divided by. The roots are simple, but simplicity is not used.
- No discriminant, resultant, factor irreducibility, absolute irreducibility, or interpolation multiplicity is invoked.
- Hall matching is proved directly by degree counting. No probabilistic method or finite computation proves existence.
- Fixed affine parameterizations avoid division by a slope and treat vertical lines identically.
- Lines are distinct geometric affine lines. Fractional weights are handled explicitly; source incidence theorems are not silently extended to multisets.
- Constant labels in [P7] are legal under the fixed ambient cap \(d>100\); the excluded test parameter \(d=0\) is never studied.
- At the lower boundary \(p=103,d=101\), the complement degree is three. At \(d=p-1\), it is two.
- Stevens–de Zeeuw's positive-characteristic inequalities are retained in [P10]; their implicit constants are not converted into an unstated explicit finite range.

## Limitations

The benchmark is not improved. Theorem A lives at the exact interpolation floor \(\epsilon=d/p\), which is below every fixed-\(\eta\) trigger when \(d/p\to0\). It obstructs a proof module, not the target theorem.

Connectivity of the regular accepted graph is not proved. The cover lower bound is global and remains valid regardless of its component decomposition. An algebra-aware algorithm may decode components separately, as \(Q=0\) demonstrates.

Lemma B controls only pair extraction from acceptance density. Additional polynomial information might distinguish its equality examples. Proposition C audits black-box unweighted incidence estimates only; it does not rule out a new weighted, lifted, or algebra-sensitive incidence theorem.

The Stevens–de Zeeuw calculations assume balanced components, and the Cartesian calculation additionally assumes a true product set. General accepted components need not satisfy either shape hypothesis. Bourgain–Katz–Tao's fixed-support exponent is insufficiently explicit for the campaign's uniform \(d,p\) target and was not imported.

Accordingly, improvement from exponent \(1/3\) toward \(1/2\) still requires a sparsify-or-decode or interpolation advance. Improvement beyond \(1/2\) additionally requires a component-recovery argument that does not rely only on the \(p^{-1/2}\) affine incidence discrepancy.
