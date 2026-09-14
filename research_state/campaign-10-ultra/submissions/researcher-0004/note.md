# Uniform Normal Multiplicity Is Exponent-Neutral in the Bivariate KTZ Interpolation Step

## Abstract

Fix a prime p and an integer 100<d<p, with dimension m=2. I prove an exact, characteristic-safe interpolation lemma for order-s vanishing along lifted line graphs. One selected graph costs Θ(s²D) normal-jet equations inside weighted degree D, while each compatible transverse intersection contributes only an s-fold univariate root. The raw coefficient-count construction therefore requires D=Θ(s√(dn)) for n selected lines, and transfer across h covered points requires sh>D. The factor s cancels. A quantitative converse for this proof architecture gives h²>dn/12. On the worst-case KTZ scales n=Θ(p/epsilon) and h=Θ(epsilon p), this is exactly epsilon³=Ω(d/p).

This is a proved obstruction to a natural proof strategy, not a counterexample to the target theorem. It gives no new global decoder and does not improve the benchmark. Under the existing benchmark hypothesis, the only final conclusion used here is the KTZ bivariate agreement bound epsilon/8000.

## Test and Notation

The test samples L uniformly among the p(p+1) affine lines of F_p² and then samples x uniformly from L. A point table is f:F_p²→F_p, and each line L has a polynomial P_L of degree at most d. Write epsilon for the resulting acceptance probability.

Give X,Y,Z weights 1,1,d. For a parameterized line M(t)=b_M+t v_M, choose a transverse vector u_M and introduce adapted coordinates

`(X,Y)=b_M+T v_M+S u_M,   Z=P_M(T)+W`.

This is a filtered polynomial automorphism. The lifted graph of P_M has ideal I_M=(S,W), independent of the auxiliary transverse vector. Genuine normal multiplicity s means A belongs to I_M^s; it is equivalent to vanishing of all normal Hasse coefficients S^aW^b with a+b<s.

Define

`N_d(D)=sum_{j=0}^{floor(D/d)} binom(D-dj+2,2)`

and

`C_s(D,d)=sum_{a,b>=0, a+b<s} max(D-a-db+1,0)`.

Here N_d(D) is the exact number of monomials of weighted degree at most D, and C_s(D,d) is the exact one-graph jet codimension in the full weighted space.

## Prior Results

The authoritative benchmark source is [Kominers–Thaler–Zheng, ECCC TR26-147, Revision 1, 16 August 2026](https://eccc.weizmann.ac.il/report/2026/147/revision/1/download). Theorem 1.1 says that epsilon>=C(d/p)^(1/3) implies one total-degree-at-most-d polynomial with agreement at least c epsilon. In the m=2 proof, Lemmas 6.2-6.3 give the explicit value epsilon/8000. The theorem statement itself records only an absolute c.

The exact reconstructed bottleneck is as follows. Lemma 3.2 supplies n=|R|=O(p/epsilon) selected lines and h=Ω(epsilon p) covered points on every retained line. Lemmas 2.2 and 4.2 compare Θ(D³/d) monomials against n(D+1) equations, producing D=Θ(√(dn))=O(√(dp/epsilon)). Lemma 4.3, the degeneracy deletion in Lemmas 5.1-5.2, and the lifting step in Lemma 6.1 all require D=O(epsilon p). Therefore epsilon³=Ω(d/p). This exponent calculation is my reconstruction from the cited lemmas, not a separately quoted KTZ theorem.

[HKSS, arXiv:2311.12752v1](https://arxiv.org/html/2311.12752v1), Lemmas 2.10 and 3.1, likewise uses Newton lifting from a simple Z-root. Its Theorem 4.2 explicitly has q>C d/epsilon^7 and global agreement Ω(epsilon^4); the headline Theorem 1.4 leaves its exponent unspecified. I do not import its quantitative proof.

At the start of this run, both active campaigns had empty promising, rejected, bottleneck, and verified boards, and the campaign databases contained no completed submission or verifier-output path. There was therefore no prior durable claim to inherit or override. The generic cached KTZ download was not used because it is not Revision 1.

## Theorem

**Transverse-jet interpolation and rank-blind barrier.** Let p be prime, 100<d<p, and let R be n distinct affine lines with degree-at-most-d line polynomials. Let s>=1 and d<=D<p.

1. Membership A∈I_M^s for every M∈R imposes at most n C_s(D,d) homogeneous linear equations. If N_d(D)>n C_s(D,d), a nonzero weighted-degree-at-most-D interpolant exists.
2. If D<sn, every nonzero such interpolant depends on Z and hence has A_Z nonzero. If n>D, then every such interpolant has deg_Z A>=s and D>=sd.
3. Let L be another affine line. Suppose h distinct points of L have witnesses M∈R, M≠L, for which the two line labels agree at the intersection. Then A(L(t),P_L(t)) has multiplicity at least s at each of those h parameters. Consequently, sh>D implies the formal identity A(L(t),P_L(t))=0.
4. Put D_0=floor(4 sqrt(d n s(s+1)))+1. If d<=D_0<p and D_0<sh, the interpolant and transfer conclusions hold.
5. In the KTZ regime n>D, any argument which certifies interpolation solely through N_d(D)>n C_s(D,d) and certifies transfer solely through sh>D must satisfy h²>dn/12. This bound is independent of s.

For an exact insertion of the KTZ numerical bounds, let k_0=floor(epsilon p/100), h_0=floor(k_0/2)+1, and

`D_s=floor(4 sqrt((6400 d p/epsilon) s(s+1)))+1`.

The multiplicity interpolation-and-extension module is valid whenever d<=D_s<p and D_s<s h_0. Dividing the leading inequality by s leaves a factor sqrt(1+1/s), which changes only a constant. Its exponent remains epsilon³=Ω(d/p).

## Proof

[P1] **Proved.** In the adapted coordinates, write A as sum c_{a,b}(T)S^aW^b. Substitution preserves the weighted filtration because T and S have weight one and both P_M(T) and W have weight at most d. Thus deg c_{a,b}<=D-a-db.

[P2] **Proved.** The condition A∈(S,W)^s is exactly c_{a,b}=0 for a+b<s. Equating coefficients of T gives at most max(D-a-db+1,0) scalar equations. Summing gives C_s(D,d). The quotient by (S,W)^s has the corresponding monomial basis, so this is the exact codimension for one line in the full weighted space. Across n lines, n C_s is an upper bound on joint rank; cross-line dependencies may reduce it.

[P3] **Proved.** The weighted space has N_d(D) unknown coefficients. Therefore N_d(D)>n C_s(D,d) leaves a nonzero common kernel.

[P4] **Proved.** If A is independent of Z, then A∈I_M^s forces the line equation ell_M^s to divide A. Distinct lines give pairwise nonassociate prime linear factors, so their product has degree sn. Hence D<sn rules out a Z-independent solution. Since D<p, every positive Z-exponent is below p, and the leading Z-term survives differentiation; thus A_Z is nonzero.

More generally, let z=deg_Z A<s. In adapted coordinates, the W^j coefficient is divisible by S^(s-j), hence every coefficient is divisible by S^(s-z). Thus ell_M^(s-z) divides A for every M. If n>D this is impossible unless z>=s, proving D>=sd.

[P5] **Proved.** At a compatible intersection of distinct lines M and L, S_M(L(t)) is a nonzero affine-linear polynomial with a simple zero. Also W_M(L(t),P_L(t)) vanishes there because P_M and P_L take the same value. Every term in I_M^s therefore pulls back to a multiple of (t-t_0)^s. No derivative or factorial is divided by.

[P6] **Proved.** The h covered points give distinct parameters on L, so their factors are coprime and their product to the s-th power divides g_L(t)=A(L(t),P_L(t)). Since deg g_L<=D, the inequality sh>D forces g_L=0.

[P7] **Proved.** For D>=d, use the levels 0<=j<=floor(D/(2d)). There are more than D/(2d) levels, and each contains more than D²/8 monomials; hence N_d(D)>D³/(16d). Also C_s(D,d)<=binom(s+1,2)(D+1)<=s(s+1)D. Therefore D²>16dn s(s+1) is sufficient. The stated D_0 satisfies this strictly, while D_0<sh supplies transfer.

[P8] **Proved.** Assume n>D and the raw dimension inequality. Step P4 gives D>=sd, so every term in C_s is active and

`C_s(D,d)=binom(s+1,2)(D+1)-(d+1)binom(s+1,3)>=s²D/6`.

For D>=d>100, N_d(D)<=2D³/d. Hence N_d(D)>n C_s(D,d) implies D²>dns²/12. Combining this with sh>D gives h²>dn/12. With n=Θ(p/epsilon) and h=Θ(epsilon p), this becomes epsilon³=Ω(d/p).

Finally, if s>=2 then every first derivative maps I_M^s into I_M^(s-1), so all first derivatives vanish on the constrained graph. Thus the jet interpolant does not itself satisfy the simple-root hypothesis needed by KTZ Lemmas 2.7 and 6.1. Taking a squarefree part or dividing Z-content may restore ordinary structure, but it generally discards the multiplicity just counted.

## Exponent Ledger

| Stage | Input | Loss/calculation | Output |
|---|---|---|---|
| KTZ sparse cover, quoted | epsilon | n=O(p/epsilon), h=Ω(epsilon p) | one inverse epsilon |
| Ordinary interpolation, reconstructed | N≈D³/d versus nD | D²≈dn | D≈sqrt(dp/epsilon) |
| Ordinary transfer, reconstructed | D<h≈epsilon p | dp/epsilon=O(epsilon²p²) | epsilon³=Ω(d/p) |
| Normal jets, proved here | n·Theta(s²D) equations | D²≈dns² | D≈s sqrt(dn) |
| Multiple-root transfer, proved here | sh>D | h>D/s | h=Omega(sqrt(dn)) |
| KTZ-scale insertion, proved here | n≈p/epsilon, h≈epsilon p | s cancels | epsilon³=Omega(d/p) |
| Degeneracy deletion, quoted/reconstructed | D/p+D²/p²=O(epsilon) | same D=O(epsilon p) requirement | no new exponent |
| Incidence mixing, quoted | p^(-1/2)=O(epsilon) | weaker in 100<d<p under the cubic hypothesis | constant agreement loss |
| Final global output, quoted | surviving component | KTZ Lemmas 6.2-6.3 | agreement at least epsilon/8000 |

There are no hidden logarithmic, characteristic, Markov, union-bound, or Cauchy-Schwarz losses in the new deterministic lemma. In KTZ, popularity and pruning cost constants; line sampling uses Chernoff plus a union bound over p(p+1) lines; the cubic hypothesis makes epsilon p large enough for that union bound. The final component estimate uses Cauchy-Schwarz through affine-plane incidence mixing and costs only an absolute constant.

## Counterexample Attempts

1. **Value-only transfer fails.** At p=103,d=101, take A=Z, M(t)=(t,0), P_M=0, L(t)=(0,t), and P_L=t. The selected restriction is identically zero, but the target restriction is t and has one root. Ordinary line identity supplies no hidden multiplicity.
2. **Vertical jets fail.** A=X+Z^s has all Z-Hasse derivatives below order s vanishing on X=Z=0, but a transverse zero-labelled graph can restrict it to t. Both normal generators must be controlled, causing the quadratic jet cost.
3. **Content removal loses credit.** A=YZ belongs to (Y,Z)^2, is squarefree, and has weighted degree d+1=102<103. Its Z-content is Y; division gives Z and reduces the transverse root from double to simple.
4. **Squarefree does not mean simple.** Over F_103, A=Y²+Z² is irreducible and squarefree because -1 is nonsquare. Nevertheless its gradient vanishes on Y=Z=0, and its Z-discriminant -4Y² vanishes on the whole selected line. Its weighted degree 202 also exhibits the primitive D>=2d cost.
5. **Inseparability.** If D<p is dropped, Z^p-X is smooth and absolutely irreducible but has zero Z-derivative; t^p-t vanishes at all field points without being the zero polynomial.
6. **Concentrated directions.** With f=0 and accepting lines in exactly k directions, epsilon=k/(p+1), every point has accepted degree k, and two independent incident-line acceptances occur with probability epsilon². This tests the sharpness of the squaring/concentration loss, but Q=0 gives perfect global agreement.
7. **Interpolation floor.** Every point table admits degree-d line polynomials agreeing at d+1 selected points per line, hence local agreement at least (d+1)/p. This supports d/p as the natural endpoint but is not a counterexample to a threshold with a larger absolute constant.

## Characteristic Audit

Normal multiplicity is expressed using ideal powers and Hasse coefficients, so no s! is inverted and s may cross the characteristic in the abstract definition. The working interpolation regime D<p prevents positive Z-exponents divisible by p and prevents a nonzero restriction of degree below p from vanishing at every field element. Vertical directions require no slope division.

No discriminant, irreducibility, or derivative division is used in the theorem. For downstream KTZ lifting, however, simple roots are essential. Higher graph multiplicity deliberately makes the selected graph singular. If d>p/2, D>=sd and D<p force s=1, so there is no hidden higher-multiplicity regime near d=p. The explicit p=103,d=101 checks cover both the campaign's lower boundary and a near-p instance without invoking any excluded degree.

## Limitations

The obstruction is architecture-specific. It rules out an exponent gain from uniform full normal multiplicity when interpolation is justified by summing per-line jet codimensions and propagation uses only univariate root multiplicity. It does not rule out cross-line rank dependencies, nonuniform multiplicities coupled to new combinatorics, a smaller covering family, or a genuinely singular lifting theorem.

The new lemma does not construct a global degree-d polynomial and supplies no new final agreement bound. Invoking the existing KTZ theorem still gives agreement Ω(epsilon), explicitly epsilon/8000 in its bivariate proof, only at the existing cubic threshold. Accordingly, `benchmark_improved=false`. Finite calculations above are falsification and boundary checks only; the obstruction itself is established by the symbolic proof.
