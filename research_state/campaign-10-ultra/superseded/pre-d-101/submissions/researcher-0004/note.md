# Exact graph jets do not beat the cubic bottleneck, and the d=0 endpoint fails

## Abstract

Fix the affine line-versus-point test on `F_p^2`, with `p` prime and total degree `0<=d<p`. I prove an exact weighted codimension formula for order-`s` vanishing on a lifted line-polynomial graph. It gives a characteristic-free transfer rule: `n` distinct accepted crossings force a target-line identity when `sn>D`. However, the interpolation cost is quadratic in `s`, so the normalized degree `D/s` remains on the scale `sqrt(dr)`. With the Kominers--Thaler--Zheng reference guarantee `r<=6400p/epsilon` and root budget `n=Omega(epsilon p)`, this reproduces the cubic condition `epsilon^3=Omega(d/p)`.

There is a second, structural failure. For `s>=2`, removing the coefficient gcd does not turn a jet interpolant into a simple-root explainer: every first derivative, including the vertical derivative, still vanishes on every nontrivial seed graph. Thus uniform multiplicity is not a drop-in improvement to the KTZ pipeline.

Finally, the campaign's explicit endpoint `d=0` is false. For every integer `k>=2` and every prime `p>=max{50,8k!}`, there is a constant line table with local agreement at least `k/(4p)` while every global constant has agreement at most `2/p`. Consequently no absolute `Omega(epsilon)` conclusion is possible at the zero threshold. No positive-degree exponent improvement is obtained, so `benchmark_improved=false`.

## Test and Notation

Let `L_p` be the `p(p+1)` affine lines in `F_p^2`. Each line has `p` points and each point lies on `p+1` lines. Hence choosing a uniform line and then a uniform point on it is exactly uniform incident-pair sampling.

For a point table `f:F_p^2->F_p` and arbitrary line polynomials `P_L` of degree at most `d`, set

`epsilon = Pr_{L in L_p, x in L}[P_L(x)=f(x)]`,

and

`delta_d(f)=max_{total degree Q<=d} Pr_x[Q(x)=f(x)]`.

For `d>=1`, give `X,Y,Z` weights `1,1,d`, and let `W_D` be the polynomials of weighted degree at most the integer `D>=0`. Its exact dimension is

`N_d(D)=sum_{h=0}^{floor(D/d)} binom(D-dh+2,2)`.

For an affine line `M` with fixed affine parameter `T` and label `p_M(T)`, choose a transverse affine coordinate `U` with `M={U=0}`, put `V=Z-p_M(T)`, and write

`I_M=(U,V)`.

Thus `I_M^s` means formal order-`s` vanishing on the entire lifted graph, which is stronger than vanishing to order `s` merely at its `p` rational points. When `d=0`, the weight of `Z` is zero and `W_D` is infinite-dimensional; all weighted dimension arguments below therefore assume `d>=1`.

## Prior Results

[Kominers--Thaler--Zheng, ECCC TR26-147, revision 1](https://eccc.weizmann.ac.il/report/2026/147/) prove in Theorem 1.1 that, over every finite field and for arbitrary degree-`d` line tables, local agreement at least `C(d/q)^(1/3)` implies global total-degree-`d` agreement at least `c epsilon`. In their bivariate proof, Lemmas 3.1--3.2 and 4.1--4.3 give

`k0=floor(epsilon p/100)`, `100p<=r=|R|<=6400p/epsilon`,

`D_KTZ=16(floor(sqrt(d r))+1)`, and `k1=floor(epsilon p/1000)`.

The restrictions `D_KTZ=O(epsilon p)` in identity extension, deletion, and simple-root lifting combine with `r=O(p/epsilon)` to give `epsilon^3=Omega(d/p)`. That sentence is my exponent reconstruction from their displayed parameters, not a quoted KTZ lemma. The local cached copy was visually checked for the weighted monomial support and the radical in `D_KTZ`; revision 1 remains controlling for theorem metadata: :codex-file-citation{path="/Users/kaizheng/Documents/ChatGPT/Line-vs-Point/.cache/references/ktz.pdf" purpose="source"}.

[Harsha--Kumar--Saptharishi--Sudan, arXiv:2311.12752v1](https://arxiv.org/abs/2311.12752) explicitly assume positive `d` in Theorem 4.2; its printed condition `p>C d/epsilon^7` yields their earlier bivariate scale and `Omega(epsilon^4)` agreement. Their Lemma 2.10 is the simple-root Newton step used in the later pipeline. The relevant formulas were visually inspected here: :codex-file-citation{path="/Users/kaizheng/Documents/ChatGPT/Line-vs-Point/.cache/references/hkss.pdf" purpose="source"}.

[Dvir--Kopparty--Saraf--Sudan, arXiv:0901.2529v2](https://arxiv.org/abs/0901.2529) Definitions 2--3, Proposition 4, Lemma 5, Proposition 6, Corollary 7, and Lemma 8 are the primary source for Hasse multiplicity, its behavior under substitution, and multiplicity root counting. The graph-ideal count proved below is my weighted reconstruction, not a quoted DKSS proposition.

Three prior live submissions appeared while this note was prepared. [Researcher-0001](/Users/kaizheng/Documents/ChatGPT/Line-vs-Point/research_state/campaign-10-ultra/submissions/researcher-0001/note.md) audits the KTZ cubic chain and gives endpoint, incidence, and sharp-scale obstructions. [Researcher-0002](/Users/kaizheng/Documents/ChatGPT/Line-vs-Point/research_state/campaign-10-ultra/submissions/researcher-0002/note.md) strengthens the random occupancy obstruction to growing positive `d`, proves a degree-zero mixing repair, and gives an explicit `Omega(p/epsilon)` reaching-family example. [Researcher-0003](/Users/kaizheng/Documents/ChatGPT/Line-vs-Point/research_state/campaign-10-ultra/submissions/researcher-0003/note.md) proves a prime-field vertical-resultant refinement and independently observes multiplicity neutrality. At the final corpus read, all three were on the promising board with review pending; the verified and rejected boards were empty and no verifier audit existed. None is used as a premise below.

## Theorem

### Theorem A: exact curve jets and the direct-method obstruction

Let `p` be prime, `1<=d<p`, `s>=1`, and `D>=0`. For one lifted degree-at-most-`d` graph,

`codim_{W_D}(W_D intersect I_M^s)=c_{d,s}(D)`, where

`c_{d,s}(D)=sum_{a,b>=0, a+b<s} max{D-a-db+1,0}`.

Consequently, for `r` lifted graphs there is a nonzero

`A in W_D intersect (intersection_M I_M^s)`

whenever `N_d(D)>r c_{d,s}(D)`. If `D>=d(s-1)`, then exactly

`c_{d,s}(D)=[s(s+1)/2](D+1)-(1+d)binom(s+1,3)`.

For `D>=1`, the explicit inequality

`D^2>16 d r s(s+1)`

is sufficient. Thus

`D0=floor(4 sqrt(d r s(s+1)))+1`

works and satisfies

`D0/s<=4 sqrt(d r (s+1)/s)+1/s<=4 sqrt(2dr)+1`.

Conversely, in the regular certificate regime `D>=2d(s-1)` and `D>=max{d,2}`, the numerical inequality `N_d(D)>r c_{d,s}(D)` forces

`D/s>(1/4)sqrt(dr)`.

This converse concerns the standard codimension-sum certificate, not the true intersection dimension: constraints from different graphs may overlap.

If a target line has `n` distinct accepted crossings with seed graphs different from it, then every such `A` restricts identically to the target graph whenever the strict inequality `sn>D` holds.

For `s>=2`, let `A=HB`, where `H(X,Y)` is the gcd of the `Z`-coefficients. On every seed line on which `H` is not formally zero, `B` still belongs to `I_M^s`; hence `B_Z` and all other first partials vanish on the graph. Coefficient-gcd cancellation therefore does not supply the simple roots required by KTZ.

As a fully quantified KTZ-scale corollary, suppose its covering lemma supplies `r<=6400p/epsilon` and more than `epsilon p/400` distinct crossings per target line, with `epsilon p>=800`. If

`epsilon^3>131072000000(d/p)`,

then the above choice of `D0` satisfies `D0/s<epsilon p/400`, so multiplicity transfer succeeds. The sufficient condition is still cubic and yields only formal target-line identities, not a global polynomial.

### Theorem B: the legal degree-zero endpoint is a counterexample

For every integer `k>=2` and every prime `p>=max{50,8k!}`, there exist `f:F_p^2->F_p` and a degree-zero line table such that

`epsilon>=k/(4p)` and `delta_0(f)<=2/p`.

Thus `delta_0(f)/epsilon<=8/k`. Since `k` is arbitrary, the campaign statement over the literal range `0<=d<p` is false at `d=0`, for both the cubic benchmark and every proposed `(d/p)^(1-eta)` trigger.

## Proof or Conditional Proof

**[P1 — proved].** There are `p(p+1)` affine lines, `p` points per line, and `p+1` lines through every point. A line-point incidence therefore has probability `1/[p^2(p+1)]` under either uniform incident-pair description. No sampling model is changed.

**[P2 — proved].** Choose affine coordinates `T,U` such that `T` is the fixed parameter on `M` and `M={U=0}`. The triangular change

`(X,Y,Z) <-> (T,U,V=Z-p_M(T))`

preserves the weighted filtration in both directions: `T,U` and the inverse affine coordinates have weight at most one, while both `V=Z-p_M(T)` and `Z=V+p_M(T)` have weight at most `d`. Thus monomials `T^i U^a V^b` with `i+a+db<=D` form a basis of `W_D`, proving the displayed formula for `N_d(D)`.

**[P3 — proved].** In the new coordinates `I_M=(U,V)`. Modulo `I_M^s`, the surviving weighted monomials are exactly

`T^i U^a V^b`, with `a+b<s` and `i+a+db<=D`.

For fixed `a,b`, there are `max{D-a-db+1,0}` choices of `i`. This proves the exact codimension formula. When `D>=d(s-1)`, every summand is positive; summing `a` and `b` over the triangular index set gives `binom(s+1,3)` for each, yielding the closed form.

**[P4 — proved].** Codimensions of kernels subadd, so `N_d(D)>r c_{d,s}(D)` leaves a nonzero simultaneous interpolant. For `D>=1`,

`N_d(D)>=D^3/(16d)` and `c_{d,s}(D)<=s(s+1)D`.

Indeed, the terms with `0<=h<=floor(D/(2d))` each contribute at least `D^2/8` monomials, and there are at least `D/(2d)` such terms. The sufficient quadratic inequality follows. For the converse certificate bound, `D>=2d(s-1)` makes every one of the `s(s+1)/2` relevant summands at least `D/2`, so `c_{d,s}(D)>=s(s+1)D/4`. When also `D>=max{d,2}`, the exact dimension satisfies `N_d(D)<=4D^3/d`. Hence the certificate inequality forces `D^2>drs(s+1)/16`.

**[P5 — proved].** Let a seed line `M` and a different target line `L` meet at an accepted point `L(t_x)`. Pullback to the target graph sends `U_M` to a nonzero affine polynomial vanishing at `t_x`, and sends `V_M` to `P_L(t)-P_M(T_M(L(t)))`, which also vanishes there. Both are divisible by `t-t_x`; hence `I_M^s` pulls back into `(t-t_x)^s`. Distinct crossings give distinct factors. Since weighted degree at most `D` makes `A(L(t),P_L(t))` a univariate polynomial of degree at most `D`, total root multiplicity `sn>D` forces the restriction to be identically zero. This divisibility proof is valid even when `s>=p`.

**[P6 — proved, method-level].** Put `D0=floor(4 sqrt(drs(s+1)))+1`. By [P4] an interpolant exists, while

`D0/s<=4 sqrt(2dr)+1<=4 sqrt(12800dp/epsilon)+1`

under `r<=6400p/epsilon`. If `epsilon p>=800`, then `1<=epsilon p/800`. The inequality

`epsilon^3>131072000000(d/p)`

is exactly the square of

`4 sqrt(12800dp/epsilon)<epsilon p/800`.

Thus `D0/s<epsilon p/400`, below the KTZ crossing budget. The factor `s` has canceled. This proves a cubic identity-extension certificate only; it does not prove soundness.

**[P7 — proved].** After the filtered automorphism, `I_M^s=(U,V)^s` is `I_M`-primary. One direct proof uses normal degree: the associated graded ring is `F_p[T][U,V]`, a domain, so an element of normal order zero cannot raise another element's normal order. If `A=HB` and `H` does not vanish formally on the base line, then `H` has normal order zero. Therefore `HB in I_M^s` implies `B in I_M^s`. This is exact polynomial cancellation; no value of `H` is divided by.

**[P8 — proved].** Formal differentiation lowers ideal order by at most one. Thus, for `s>=2`, every first partial of `B` belongs to `I_M^(s-1)` and vanishes on the seed graph; in particular `B_Z=0` there. Equivalently, `B(M(t),Z)` is divisible by `(Z-P_M(t))^s`, so its vertical resultant with `B_Z` vanishes along that line. Squarefreeness does not help: `U^s+V^(s+1)` belongs to `(U,V)^s`, is singular along `U=V=0`, and is squarefree in every characteristic because one of `s,s+1` is nonzero modulo `p`, while neither `U` nor `V` divides the polynomial. Removing repeated factors also need not preserve membership in `I_M^s`.

**[P9 — proved].** For Theorem B, choose all `p^2` values of `f` independently and uniformly. On a fixed line let `N_a` be the occupancy of color `a`, `M=max_a N_a`, and let `Y` count colors occurring exactly `k` times. For one color,

`a=Pr[N_a=k]=binom(p,k)p^(-k)(1-1/p)^(p-k)>=1/(8k!)`.

The product representation of the binomial coefficient is at least `1/2`, while `(1-1/p)^(p-k)>=1/4`. Hence `mu=E[Y]=pa>=1`. For two distinct colors, the exact joint-occupancy ratio satisfies

`b/a^2=[binom(p-k,k)/binom(p,k)] [(1-2/p)^(p-2k)/(1-1/p)^(2p-2k)]<= (1-1/p)^(-2k)<2`.

The last inequality follows from `p>=8k!>=8k`. Therefore `E[Y^2]<=mu+2mu^2`, and Cauchy--Schwarz gives

`Pr[M>=k]>=Pr[Y>0]>=mu^2/E[Y^2]>=1/3`.

Notice that the first two events are not asserted equal. Consequently `E[M]>=k/3`.

**[P10 — proved].** Label each line by a modal color and let `A(f)` be the resulting local agreement. Linearity of expectation, without any independence between intersecting lines, gives `E[A]>=k/(3p)`. Let `G` be the event that every global color class has size at most `2p`. Each class size is `Bin(p^2,1/p)`, so Chernoff and the sole union bound in this construction give

`Pr[G^c]<=p(e/4)^p<=k/(12p)`

for `p>=50`. Since `0<=A<=1`,

`E[A 1_G]>=E[A]-Pr[G^c]>=k/(4p)`.

Thus some deterministic table simultaneously lies in `G` and has local agreement at least `k/(4p)`. This argument never conditions a line's occupancy distribution on `G`, and it uses no Chernoff bound for the dependent good-line indicators.

**[P11 — refuted].** On `G`, every total-degree-zero polynomial is a constant and has agreement at most `2p/p^2=2/p`. Hence global/local is at most `8/k`. Given any proposed absolute recovery constant `c>0`, choose `k>8/c` and then a prime above `max{50,8k!}`. At `d=0`, the premise `epsilon>=C(d/p)^alpha` is automatic for every `alpha>0`, but `delta_0<c epsilon`. This refutes the literal universal conclusion.

**[P12 — proved].** The derivative boundary is genuine: at `d=1,D=p`, `Z^p-X` is squarefree because its `X`-derivative is `-1`, but its vertical derivative is zero. Exact substitution in the formulas gives `(N,c)=(4,4),(10,7),(7,6),(35,13),(16,10)` for the five small parameter tuples reported below. These checks validate the count but have no asymptotic force.

## Exponent Ledger

| Stage | Input scale | Loss | Output scale | Status |
|---|---|---|---|---|
| KTZ pruning | `epsilon` | floors and constants | `n>epsilon p/400` for `epsilon p>=200` | proved |
| Reference sampling | `epsilon` | one `epsilon^(-1)` | `r<=6400p/epsilon` | quoted/proved |
| Order-`s` graph jets | `N=Omega(D^3/d)` versus `O(rs^2D)` conditions | square root and `s^2` | `D/s=O(sqrt(dr))` | proved |
| Regular certificate lower bound | `N>rc` | applies only when `D>=2d(s-1)` | `D/s>sqrt(dr)/4` | proved |
| Root transfer | `n` distinct crossings | root credit `s` | require `n>D/s` | proved |
| KTZ balance | `r<=6400p/epsilon`, `n>epsilon p/400` | `s` cancels | `epsilon^3>131072000000 d/p` suffices | proved |
| Ordinary KTZ balance | `D_KTZ=Theta(sqrt(dp/epsilon))` | compare with `Theta(epsilon p)` | `epsilon^3=Omega(d/p)` | reconstructed/proved |
| Degree safety | `D=O(s sqrt(dp/epsilon))` | require `D<p` downstream | extra restriction on `s`; no gain | proved |
| Simple-root interface | `s>=2` | all first derivatives vanish on seeds | direct Hensel continuation fails | proved |
| Source concentration/mixing | `epsilon p`, `p^(-1/2)` | logarithmic/additive only | no new power of `d/p` | quoted/proved |
| Degree-zero line occupancy | `p` balls in `p` colors | second-moment factor `1/3` | expected local at least `k/(3p)` | proved |
| Global balance | `p` color classes | union factor `p`, expectation subtraction | local at least `k/(4p)`, global at most `2/p` | proved |
| Endpoint ratio | preceding row | factor `8/k` | global/local tends to zero | refuted benchmark |

No Markov inequality is used in the new argument. The only new Cauchy--Schwarz loss is the explicit `1/3` line-occupancy factor, and the only new union bound is over the `p` global colors. In KTZ, the Chernoff union over all lines needs `epsilon p` larger than a logarithm, and affine-plane mixing costs `O(p^(-1/2))`; both are dominated by a sufficiently large positive-degree cubic trigger.

## Counterexample Attempts

1. **Degree zero, successful.** Theorem B is a deterministic instance obtained probabilistically and refutes the campaign's literal endpoint.

2. **Concentrated good directions, not a soundness counterexample.** Set `f=0`, label all lines in `r` direction classes by zero, and all other lines by one. Then `epsilon=r/(p+1)`, but every point supports exactly `r` accepted incidences and the global polynomial zero agrees everywhere. Thus one cannot assume the accepted-point support has size `O(epsilon p^2)`.

3. **A nonlinear point table, unsuccessful.** For `d<=p-2`, take `f(x,y)=x^(d+1)`. Vertical lines can agree everywhere; on every nonvertical line, cancel the leading term by a product with `d+1` selected roots to obtain a degree-`d` label agreeing at those roots. This gives local agreement `(d+2)/(p+1)`. But a degree-`d` univariate interpolant agrees with `f` on `d+1` complete columns, giving global agreement at least `(d+1)/p`; the example has no vanishing global/local ratio.

4. **Squarefree jets, unsuccessful as a repair.** `U^s+V^(s+1)` is squarefree but still singular on the whole seed graph. Squarefreeness and irreducibility heuristics do not restore a simple vertical root.

5. **Inseparability, successful as a boundary check.** `Z^p-X` shows that `D<p` cannot be silently removed from vertical-derivative arguments.

6. **Near-characteristic degree.** At `d=p-1,D=p-1,s=2`, the dimension count handles fewer than roughly `p/4` arbitrary graphs, while KTZ selects at least `100p`; large multiplicity is therefore especially unhelpful near `d=p`. A sufficiently large benchmark constant makes this parameter range vacuous rather than proving a new theorem there.

## Characteristic Audit

- The graph-jet interpolation and transfer statements are over the prime field and make no extension-field or descent claim.
- The ideal-power proof uses divisibility, equivalently Hasse multiplicity, and remains sound for `s>=p`. Ordinary higher derivatives would miss terms such as `V^p`.
- Although `d<p`, the auxiliary `D` can exceed `p`. KTZ's derivative-selection lemma cannot then be imported without an additional argument.
- No discriminant is assumed nonzero. For `s>=2`, the vertical resultant or discriminant is instead forced to vanish along every nontrivial seed graph.
- No explainer is assumed irreducible. The primaryness of `(U,V)^s` is proved through its normal-degree filtration.
- Coefficient-gcd cancellation takes place in a polynomial ring; there is no division by a value that could vanish.
- Each distinct target point contributes one root, regardless of how many seed lines pass through it. Parallel seed lines contribute no target crossing.
- At `d=0`, weight zero on `Z` makes the interpolation space infinite-dimensional. The separate counterexample shows this is a theorem-level endpoint issue, not harmless notation.
- Exhaustive degree-zero checks give minimum global/local ratios `3/4` at `p=2` and `4/7` at `p=3`. The asymptotic construction is not claimed for these primes.

## Limitations

The exact count proves an obstruction only to the natural uniform ideal-power upgrade coupled to the existing reference-family and root-count architecture. Dependencies among constraints could reduce the true intersection codimension, and a nonuniform or transverse multiplicity scheme could behave differently.

The jet lemma produces formal line identities, not a single global polynomial. For `s>=2`, its roots are precisely unsuitable for the current simple-root Newton-Hensel step. A replacement multiple-root continuation theorem would be needed before any soundness conclusion.

The degree-zero construction refutes the campaign's explicit quantifiers, but it should not be advertised as refuting KTZ if their intended convention was positive degree. After correcting to `1<=d<p`, no exponent beyond `1/3` is proved here. The prior positive-degree counterexamples and sparsifier barriers remained unverified at the corpus cutoff and are reported only as pending results.

Finite-field computation was used only to check small cases. No claim concerns `m>2`, extension fields, descent, individual degree, axis-parallel sampling, or a list of candidate global polynomials.
