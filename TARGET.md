# Research Target

Let \(\mathbb F_q\) be a finite field, let \(m\ge 2\), and let \(0\le d<q\). A point table is a function

\[
f:\mathbb F_q^m\to\mathbb F_q.
\]

For every affine line \(L\subseteq\mathbb F_q^m\), a line table supplies a univariate polynomial \(P_L\) of degree at most \(d\), interpreted on \(L\). Define the test agreement

\[
\operatorname{Agr}_{\mathrm{LVP}}(f,P)
=\Pr_{L,\,x\in L}[P_L(x)=f(x)],
\]

where \(L\) is uniform among affine lines and \(x\) is uniform on \(L\).

## Current benchmark

Kominers--Thaler--Zheng prove that there are absolute constants \(C,c>0\) such that

\[
\operatorname{Agr}_{\mathrm{LVP}}(f,P)\ge C(d/q)^{1/3}
\]

implies the existence of a total-degree-at-most-\(d\) polynomial \(Q\) satisfying

\[
\Pr_x[Q(x)=f(x)]\ge c\operatorname{Agr}_{\mathrm{LVP}}(f,P).
\]

## Target theorem

The campaign seeks progress toward the following deliberately explicit research target.

For every fixed \(\eta>0\), prove constants \(C_\eta,c_\eta>0\) and a fully stated admissible parameter regime such that

\[
\operatorname{Agr}_{\mathrm{LVP}}(f,P)
\ge C_\eta(d/q)^{1-\eta}
\]

implies

\[
\max_{\deg Q\le d}\Pr_x[Q(x)=f(x)]
\ge c_\eta\operatorname{Agr}_{\mathrm{LVP}}(f,P).
\]

Equivalent or stronger list-decoding conclusions are admissible only when the conversion to a single polynomial and its loss are proved.

## Milestones

- **Exponent improvement:** replace \(1/3\) by an explicit \(\alpha>1/3\).
- **Bivariate improvement:** establish an improved threshold for \(m=2\) with complete characteristic handling.
- **Lossless bootstrapping:** lift a bivariate exponent to general \(m\) without degrading it.
- **Near-linear exponent:** prove \((d/q)^{1-\eta}\) for every fixed \(\eta>0\).
- **Sharp threshold:** identify matching examples or prove a theorem at \(\Theta(d/q)\), if true.

Because \(d/q<1\), a larger exponent is a stronger result: it permits smaller local agreement.

## Non-results

The following do not count as achieving an exponent milestone:

- a theorem only for fixed \(d\), unless clearly labeled;
- a hidden assumption \(q\ge d^C\) that makes the stated threshold vacuous;
- a list of many global polynomials without a proved single-polynomial conclusion;
- an exponent obtained after suppressing dimension-, characteristic-, or logarithmic losses;
- numerical success on small fields;
- a proof for line-versus-line, plane-versus-point, or axis-parallel tests presented as a line-versus-point theorem without a proved reduction.
