# Research Target

Let \(p\) be prime and let \(d\) be an integer satisfying \(100<d<p\). The dimension is fixed at \(m=2\). Degrees \(d\le 100\), including the degenerate case \(d=0\), are outside the campaign scope and must not be treated as obstructions to the target. A point table is a function

\[
f:\mathbb F_p^2\to\mathbb F_p.
\]

For every affine line \(L\subseteq\mathbb F_p^2\), a line table supplies a univariate polynomial \(P_L\) of degree at most \(d\), interpreted on \(L\). Define the test agreement

\[
\operatorname{Agr}_{\mathrm{LVP}}(f,P)
=\Pr_{L,\,x\in L}[P_L(x)=f(x)],
\]

where \(L\) is uniform among affine lines and \(x\) is uniform on \(L\).

## Current benchmark

Kominers--Thaler--Zheng prove that there are absolute constants \(C,c>0\) such that

\[
\operatorname{Agr}_{\mathrm{LVP}}(f,P)\ge C(d/p)^{1/3}
\]

implies the existence of a total-degree-at-most-\(d\) polynomial \(Q\) satisfying

\[
\Pr_x[Q(x)=f(x)]\ge c\operatorname{Agr}_{\mathrm{LVP}}(f,P).
\]

## Target theorem

The campaign seeks progress toward the following deliberately explicit research target.

For every fixed \(\eta>0\), prove constants \(C_\eta,c_\eta>0\) and a fully stated admissible parameter regime with \(100<d<p\) such that

\[
\operatorname{Agr}_{\mathrm{LVP}}(f,P)
\ge C_\eta(d/p)^{1-\eta}
\]

implies

\[
\max_{\deg Q\le d}\Pr_x[Q(x)=f(x)]
\ge c_\eta\operatorname{Agr}_{\mathrm{LVP}}(f,P).
\]

Equivalent or stronger list-decoding conclusions are admissible only when the conversion to a single polynomial and its loss are proved.

## Milestones

- **Bivariate exponent improvement:** replace \(1/3\) by an explicit \(\alpha>1/3\) over prime fields.
- **Combinatorial improvement:** strengthen the incidence/concentration stage with its full parameter range.
- **Algebraic improvement:** strengthen the interpolation/factorization stage with complete prime-characteristic handling.
- **Near-linear exponent:** prove \((d/p)^{1-\eta}\) for every fixed \(\eta>0\).
- **Sharp threshold:** identify matching examples or prove a theorem at \(\Theta(d/p)\), if true.

Because \(d/p<1\), a larger exponent is a stronger result: it permits smaller local agreement.

The general-dimensional lift is standard once the bivariate statement is known. It is a downstream corollary, not a research milestone, and the campaign spends no agents on it.

## Lemma writing rule

**A lemma statement contains only its quantified objects, hypotheses, and conclusion. It contains no motivation, derivation, commentary, proof sketch, interpretation, history, or explanation; all such material belongs in the proof.**

The dedicated Lemma Writer post-edits every structured proof step without changing its mathematical content or status. It may split a source lemma into ordered pieces when that makes the logical structure easier to understand. Raw submissions remain immutable, and every edited statement is source-linked and checked deterministically with KaTeX before publication in the Lemma Book.

## Proof roadmap policy

Three synchronized roadmap agents maintain complete dependency DAGs for the algebraic engine, incidence engine, and end-to-end soundness chain. They share all submissions, audits, Lemma Book entries, peer roadmaps, and informal messages; each gives a majority of its attention to its assigned route. Roadmap progress is harness-derived. A node is verified only when it cites an exact source job, proof-step id, and response hash whose claim was independently accepted, and all of its dependencies are verified or external inputs. Agent work states and message-board claims never confer verification.

## Non-results

The following do not count as achieving an exponent milestone:

- a theorem only for fixed \(d\), unless clearly labeled;
- a hidden assumption \(p\ge d^C\) that makes the stated threshold vacuous;
- a list of many global polynomials without a proved single-polynomial conclusion;
- an exponent obtained after suppressing characteristic- or logarithmic losses;
- numerical success on small fields;
- a proof for line-versus-line, plane-versus-point, or axis-parallel tests presented as a line-versus-point theorem without a proved reduction.
- a result whose substantive advance concerns \(m\ne2\), extension fields, or dimension bootstrapping rather than the bivariate prime-field theorem.
