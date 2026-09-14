'use client';

import { useEffect, useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  CircleDashed,
  Clock3,
  FileCheck2,
  GitBranch,
  ListTree,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  XCircle,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

import { Button } from '@/components/ui/button';

type JobStatus = 'queued' | 'running' | 'succeeded' | 'failed';

type Job = {
  id: string;
  role: string;
  ordinal: number | null;
  direction: string | null;
  status: JobStatus;
  attempts: number;
  max_attempts: number;
  started_at: string | null;
  finished_at: string | null;
  error: string | null;
};

type ProofStep = {
  id: string;
  statement: string;
  status: string;
  proof: string;
  dependencies: string[];
};

type ExponentStage = {
  job_id?: string;
  stage: string;
  input_scale: string;
  output_scale: string;
  loss: string;
  justification: string;
  status: string;
};

type Audit = {
  verdict: 'accept' | 'revise' | 'reject';
  summary: string;
  verified_exponent: string | null;
  required_changes: string[];
  fatal_obstruction: string | null;
};

type Candidate = {
  job_id: string;
  role: string;
  title: string;
  result_status: string;
  claim_scope: string;
  claimed_exponent: string | null;
  benchmark_improved: boolean;
  theorem_statement: string;
  parameter_regime: string;
  sampling_model: string;
  global_conclusion: string;
  review_verdict: string;
  verified_exponent: string | null;
  proof_steps: ProofStep[];
  exponent_ledger: ExponentStage[];
  limitations: string[];
  note_markdown: string;
  audit: Audit | null;
};

type CampaignStatus = {
  campaign_dir: string;
  model: string;
  reasoning_effort: string;
  dimension: number;
  field_regime: string;
  benchmark_exponent: string;
  target_exponent: string;
  researcher_count: number;
  planned_agent_invocations: number;
  counts: Record<string, number>;
  roles: Record<string, number>;
  updated_at: string;
};

export type ResearchSnapshot = {
  schema: string;
  campaign: string;
  status: CampaignStatus;
  candidates: {
    verified: Candidate[];
    promising: Candidate[];
    rejected: Candidate[];
  };
  bottlenecks: ExponentStage[];
  jobs: Job[];
};

function MathCopy({ children, className = '' }: { children: string; className?: string }) {
  return (
    <div className={`math-copy ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
        {children}
      </ReactMarkdown>
    </div>
  );
}

function formatTimestamp(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Unknown';
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(date);
}

function jobIcon(status: JobStatus) {
  if (status === 'succeeded') return <CheckCircle2 aria-hidden="true" />;
  if (status === 'failed') return <XCircle aria-hidden="true" />;
  if (status === 'running') return <Clock3 aria-hidden="true" />;
  return <CircleDashed aria-hidden="true" />;
}

function candidateLabel(candidate: Candidate) {
  if (candidate.audit?.verdict === 'accept') return 'Verified';
  if (candidate.audit?.verdict === 'reject') return 'Rejected';
  if (candidate.audit?.verdict === 'revise') return 'Revision requested';
  return 'Awaiting review';
}

function CandidateEntry({ candidate, rank }: { candidate: Candidate; rank: number }) {
  return (
    <article className="candidate-entry">
      <div className="candidate-rank">{String(rank).padStart(2, '0')}</div>
      <div className="candidate-main">
        <div className="candidate-heading">
          <div>
            <p className="eyebrow">{candidateLabel(candidate)} · {candidate.job_id}</p>
            <h3>{candidate.title}</h3>
          </div>
          <div className="exponent-mark">
            <span>claimed exponent</span>
            <strong>{candidate.claimed_exponent ?? '—'}</strong>
          </div>
        </div>

        <section className="theorem-box" aria-label="Theorem claim">
          <p className="section-kicker">Claim</p>
          <MathCopy>{candidate.theorem_statement || 'No theorem statement supplied.'}</MathCopy>
        </section>

        {candidate.audit && (
          <section className={`audit-note audit-${candidate.audit.verdict}`}>
            <p className="section-kicker">Verifier · {candidate.audit.verdict}</p>
            <MathCopy>{candidate.audit.summary}</MathCopy>
            {candidate.audit.fatal_obstruction && (
              <MathCopy className="fatal-obstruction">{candidate.audit.fatal_obstruction}</MathCopy>
            )}
          </section>
        )}

        <details className="proof-details">
          <summary>Read the proof record</summary>
          <div className="proof-record">
            {candidate.exponent_ledger.length > 0 && (
              <section>
                <h4>Exponent ledger</h4>
                <div className="ledger-table-wrap">
                  <table>
                    <thead>
                      <tr><th>Stage</th><th>Input</th><th>Output</th><th>Loss</th></tr>
                    </thead>
                    <tbody>
                      {candidate.exponent_ledger.map((stage, index) => (
                        <tr key={`${stage.stage}-${index}`}>
                          <td>{stage.stage}</td>
                          <td><MathCopy>{stage.input_scale}</MathCopy></td>
                          <td><MathCopy>{stage.output_scale}</MathCopy></td>
                          <td><MathCopy>{stage.loss}</MathCopy></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
            <section>
              <h4>Mathematical note</h4>
              <MathCopy className="paper-note">
                {candidate.note_markdown || 'No full note was supplied.'}
              </MathCopy>
            </section>
          </div>
        </details>
      </div>
    </article>
  );
}

function EmptyCandidates() {
  return (
    <div className="quiet-empty">
      <p className="eyebrow">No submissions yet</p>
      <h3>The proof ledger is empty.</h3>
      <p>
        The trial has been prepared but not launched. Candidate theorems will be ranked here only
        after a complete mathematical note is submitted; independent verifier judgments will be
        shown beside each claim.
      </p>
    </div>
  );
}

export function ResearchConsole({ initialData }: { initialData: ResearchSnapshot }) {
  const [data, setData] = useState(initialData);
  const [refreshing, setRefreshing] = useState(false);

  async function refresh() {
    setRefreshing(true);
    try {
      const response = await fetch(`./research-data.json?t=${Date.now()}`, { cache: 'no-store' });
      if (response.ok) setData((await response.json()) as ResearchSnapshot);
    } finally {
      setRefreshing(false);
    }
  }

  useEffect(() => {
    const timer = window.setInterval(refresh, 10000);
    return () => window.clearInterval(timer);
  }, []);

  const candidates = [...data.candidates.verified, ...data.candidates.promising];
  const researchers = data.jobs.filter((job) => job.role === 'researcher');
  const genius = data.jobs.find((job) => job.role === 'genius');
  const completed = researchers.filter((job) => ['succeeded', 'failed'].includes(job.status)).length;
  const active = researchers.filter((job) => job.status === 'running').length;
  const campaignState = active > 0
    ? `${active} active`
    : completed === 0
      ? 'Not launched'
      : completed === researchers.length
        ? 'Complete'
        : 'Paused';
  const progress = researchers.length ? Math.round((completed / researchers.length) * 100) : 0;

  return (
    <main className="research-app" id="top">
      <header className="topbar">
        <a className="brand" href="#top">
          <span>LP</span>
          <div>
            <strong>Line–Point</strong>
            <small>Research observatory</small>
          </div>
        </a>
        <div className="topbar-state">
          <span className={active ? 'state-dot active' : 'state-dot'} />
          <span>{campaignState}</span>
          <small>· Updated {formatTimestamp(data.status.updated_at)}</small>
        </div>
        <Button variant="outline" size="sm" onClick={refresh} disabled={refreshing}>
          <RefreshCw className={refreshing ? 'animate-spin' : ''} aria-hidden="true" />
          Sync data
        </Button>
      </header>

      <div className="app-layout">
        <aside className="sidebar">
          <nav aria-label="Research dashboard sections">
            <a href="#overview"><BookOpen /> Overview</a>
            <a href="#candidates"><Trophy /> Candidates <span>{candidates.length}</span></a>
            <a href="#bottlenecks"><GitBranch /> Bottlenecks <span>{data.bottlenecks.length}</span></a>
            <a href="#activity"><Users /> Researchers <span>{researchers.length}</span></a>
          </nav>

          <div className="scope-card">
            <p className="ui-label">Research scope</p>
            <dl>
              <div><dt>Dimension</dt><dd>m = {data.status.dimension}</dd></div>
              <div><dt>Field</dt><dd>Prime 𝔽<sub>p</sub></dd></div>
              <div><dt>Model</dt><dd>{data.status.model}</dd></div>
              <div><dt>Reasoning</dt><dd>{data.status.reasoning_effort}</dd></div>
            </dl>
          </div>

          <div className="review-policy">
            <ShieldCheck />
            <p><strong>Proofs before scores.</strong> No result is promoted without a complete note and an independent audit.</p>
          </div>
        </aside>

        <div className="workspace">
          <section className="mission-card" id="overview">
            <div className="mission-topline">
              <span className="campaign-tag">{data.campaign}</span>
              <span>Two-variable prime-field test</span>
            </div>
            <div className="mission-body">
              <div>
                <p className="ui-label">Asymptotic objective</p>
                <h1>Push line-vs-point soundness to the natural exponent.</h1>
                <p className="mission-copy">A public, proof-first search for a genuine bivariate argument—without relying on the trivial general-dimension bootstrap.</p>
              </div>
              <div className="target-formula">
                <MathCopy>{'$$\\operatorname{snd}_{\\mathbb F_p,2}(d) \\leq \\left(\\frac{d}{p}\\right)^{1-o(1)}$$'}</MathCopy>
                <MathCopy className="benchmark-formula">{'Benchmark: $\\left(d/p\\right)^{1/3}$'}</MathCopy>
              </div>
            </div>
            <div className="metric-row">
              <div><span>Progress</span><strong>{completed}/{researchers.length}</strong></div>
              <div><span>Promising</span><strong>{data.candidates.promising.length}</strong></div>
              <div><span>Verified</span><strong>{data.candidates.verified.length}</strong></div>
              <div><span>Rejected</span><strong>{data.candidates.rejected.length}</strong></div>
              <div><span>Max invocations</span><strong>{data.status.planned_agent_invocations}</strong></div>
            </div>
            <div className="progress-track" aria-label={`${progress}% of researchers completed`}><span style={{ width: `${progress}%` }} /></div>
            <div className="pipeline" aria-label="Research review pipeline">
              <span><Users /> Researcher</span><i>→</i><span><FileCheck2 /> Proof note</span><i>→</i><span><ShieldCheck /> Verifier</span><i>→</i><span><Trophy /> Leaderboard</span>
            </div>
          </section>

          <div className="content-grid">
            <div className="main-column">
              <section className="panel" id="candidates">
                <div className="panel-header">
                  <div><p className="ui-label">Proof leaderboard</p><h2>Candidate arguments</h2></div>
                  <span>{candidates.length} total</span>
                </div>
                <div className="candidate-list">
                  {candidates.length ? candidates.map((candidate, index) => (
                    <CandidateEntry key={candidate.job_id} candidate={candidate} rank={index + 1} />
                  )) : <EmptyCandidates />}
                </div>
              </section>

              <section className="panel" id="bottlenecks">
                <div className="panel-header">
                  <div><p className="ui-label">Loss accounting</p><h2>Exponent bottlenecks</h2></div>
                  <span>{data.bottlenecks.length} recorded</span>
                </div>
                {data.bottlenecks.length ? (
                  <div className="bottleneck-list">
                    {data.bottlenecks.map((item, index) => (
                      <article key={`${item.stage}-${index}`}>
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        <div>
                          <h3>{item.stage}</h3>
                          <MathCopy>{`$${item.input_scale} \\longrightarrow ${item.output_scale}$`}</MathCopy>
                          <MathCopy className="muted-copy">{item.justification}</MathCopy>
                        </div>
                        <em>{item.status}</em>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="compact-empty"><ListTree /><p><strong>No loss ledger yet</strong><span>The first submitted proof will populate this section.</span></p></div>
                )}
              </section>
            </div>

            <aside className="activity-column" id="activity">
              <section className="panel activity-panel">
                <div className="panel-header">
                  <div><p className="ui-label">Live queue</p><h2>Researchers</h2></div>
                  <span>{data.status.counts.queued ?? 0} queued</span>
                </div>

                {genius && (
                  <article className="genius-card">
                    <div className="genius-title"><Sparkles /><span>GENIUS</span><em>{genius.status}</em></div>
                    <p>{genius.direction}</p>
                  </article>
                )}

                <div className="job-list">
                  {researchers.map((job) => (
                    <article key={job.id} className={`job-row job-${job.status}`}>
                      <div className="job-state">{jobIcon(job.status)}</div>
                      <div><strong>{job.id.replace('researcher-', 'R')}</strong><p>{job.direction}</p></div>
                      <span>{job.status}</span>
                    </article>
                  ))}
                </div>
              </section>
            </aside>
          </div>

          <footer><span>Public snapshot · {data.campaign}</span><span>KaTeX-enabled proof rendering</span></footer>
        </div>
      </div>
    </main>
  );
}
