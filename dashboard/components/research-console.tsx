'use client';

import { useEffect, useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  CircleDashed,
  Clock3,
  FileCheck2,
  ListTree,
  Map,
  MessageSquare,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  XCircle,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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

type LemmaEntry = {
  id: string;
  source_job_id: string;
  source_step_id: string;
  part: number;
  title: string;
  statement_markdown: string;
  proof_markdown: string;
  status: 'proved' | 'conditional' | 'conjectural' | 'refuted';
  dependencies: string[];
  editorial_status: 'polished' | 'awaiting edit';
};

type LemmaBook = {
  editorial_rule: string;
  model: string;
  reasoning_effort: string;
  source_count: number;
  edited_source_count: number;
  lemma_count: number;
  updated_at: string;
  lemmas: LemmaEntry[];
};

type RoadmapEvidenceRef = {
  source_job_id: string;
  source_step_id: string;
  source_response_sha256: string;
};

type RoadmapNode = {
  id: string;
  label: string;
  statement_markdown: string;
  kind: string;
  work_state: string;
  proof_state: 'verified' | 'provisional' | 'open' | 'blocked' | 'invalid' | 'external';
  dependencies: string[];
  evidence_refs: RoadmapEvidenceRef[];
  resolved_lemma_ids: string[];
  owner: string;
  notes: string;
};

type ProofRoadmap = {
  roadmap_id: string;
  title: string;
  focus: string;
  target_statement: string;
  summary: string;
  goal_node_id: string;
  nodes: RoadmapNode[];
  critical_path: string[];
  round: number;
  progress: {
    percent: number;
    verified: number;
    provisional: number;
    open: number;
    blocked: number;
    invalid: number;
    mapped: number;
    total: number;
  };
  updated_at: string;
};

type ProofRoadmaps = {
  model: string;
  reasoning_effort: string;
  status: string;
  round: number;
  active_roadmaps: string[];
  roadmaps: ProofRoadmap[];
  updated_at: string;
};

type BoardMessage = {
  id: string;
  author: string;
  roadmap_id: string;
  round: number;
  created_at: string;
  informal: boolean;
  channel: string;
  kind: string;
  subject: string;
  body_markdown: string;
  in_reply_to: string | null;
  related_node_ids: string[];
  references: string[];
};

type MessageBoard = {
  updated_at?: string;
  messages: BoardMessage[];
};

type CampaignStatus = {
  campaign_dir: string;
  model: string;
  reasoning_effort: string;
  dimension: number;
  field_regime: string;
  degree_lower_bound_exclusive: number;
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
  lemma_book?: LemmaBook;
  proof_roadmaps?: ProofRoadmaps;
  message_board?: MessageBoard;
  jobs: Job[];
};

type WorkspaceView = 'research' | 'lemmas' | 'roadmaps' | 'messages';

const viewHashes: Record<WorkspaceView, string> = {
  research: 'research',
  lemmas: 'lemma-book',
  roadmaps: 'proof-roadmaps',
  messages: 'message-board',
};

function viewFromHash(hash: string): WorkspaceView {
  const entry = Object.entries(viewHashes).find(([, value]) => `#${value}` === hash);
  return (entry?.[0] as WorkspaceView | undefined) ?? 'research';
}

function normalizeMathMarkdown(source: string) {
  const repaired = source
    .split(String.fromCharCode(3)).join('\\n')
    .split(String.fromCharCode(8)).join('\\b')
    .split(String.fromCharCode(12)).join('\\f')
    .split(String.fromCharCode(13)).join('\\r');

  return repaired
    .replace(/\\\[([\s\S]*?)\\\]/g, '\n\n$$$$\n$1\n$$$$\n\n')
    .replace(/\\\(([\s\S]*?)\\\)/g, '$$$1$$')
    .replace(
      /\\begin\{equation\*?\}([\s\S]*?)\\end\{equation\*?\}/g,
      '\n\n$$$$\n$1\n$$$$\n\n',
    )
    .replace(
      /\\begin\{align\*?\}([\s\S]*?)\\end\{align\*?\}/g,
      '\n\n$$$$\n\\begin{aligned}$1\\end{aligned}\n$$$$\n\n',
    );
}

function stripMathDelimiters(value: string) {
  return value
    .trim()
    .replace(/^\$\$?|\$\$?$/g, '')
    .replace(/^\\\(|\\\)$/g, '')
    .replace(/^\\\[|\\\]$/g, '')
    .trim();
}

function MathCopy({ children, className = '' }: { children: string; className?: string }) {
  return (
    <div className={`math-copy ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
        {normalizeMathMarkdown(children)}
      </ReactMarkdown>
    </div>
  );
}

function DisplayFormula({ math }: { math: string }) {
  return (
    <div className="display-formula">
      <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
        {`$$${stripMathDelimiters(math)}$$`}
      </ReactMarkdown>
    </div>
  );
}

function InlineFormula({ math }: { math: string }) {
  return (
    <span className="inline-formula">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{ p: ({ children }) => <>{children}</> }}
      >
        {`$${stripMathDelimiters(math)}$`}
      </ReactMarkdown>
    </span>
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
  const conciseExponent = Boolean(
    candidate.claimed_exponent &&
    /^(?:\d+(?:\/\d+)?|1[-−]o\(1\))$/.test(candidate.claimed_exponent.trim()),
  );

  return (
    <article className="candidate-entry">
      <div className="candidate-rank">{String(rank).padStart(2, '0')}</div>
      <div className="candidate-main">
        <div className="candidate-heading">
          <div>
            <p className="eyebrow">{candidateLabel(candidate)} · {candidate.job_id}</p>
            <h3>{candidate.title}</h3>
          </div>
          <div className={`exponent-mark ${conciseExponent ? '' : 'exponent-mark-prose'}`}>
            <span>claimed exponent</span>
            {candidate.claimed_exponent ? (
              conciseExponent
                ? <strong><InlineFormula math={`\\alpha=${candidate.claimed_exponent}`} /></strong>
                : <MathCopy className="exponent-copy">{candidate.claimed_exponent}</MathCopy>
            ) : <strong>—</strong>}
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

function LemmaBookEntry({ lemma, index }: { lemma: LemmaEntry; index: number }) {
  const splitLabel = lemma.part > 1 ? ` · part ${lemma.part}` : '';
  return (
    <article className="lemma-entry">
      <div className="lemma-number">L{String(index + 1).padStart(3, '0')}</div>
      <div className="lemma-body">
        <header>
          <div>
            <p className="eyebrow">{lemma.source_job_id} · {lemma.source_step_id}{splitLabel}</p>
            <h3>{lemma.title}</h3>
          </div>
          <div className="lemma-badges">
            <span className={`lemma-status status-${lemma.status}`}>{lemma.status}</span>
            <span>{lemma.editorial_status}</span>
          </div>
        </header>
        <section className="lemma-statement" aria-label={`${lemma.title} statement`}>
          <MathCopy>{lemma.statement_markdown}</MathCopy>
        </section>
        <details className="lemma-proof">
          <summary>Proof</summary>
          <MathCopy>{lemma.proof_markdown}</MathCopy>
          {lemma.dependencies.length > 0 && (
            <p className="lemma-dependencies">Depends on {lemma.dependencies.join(', ')}</p>
          )}
        </details>
      </div>
    </article>
  );
}

function RoadmapCard({
  roadmap,
  active,
}: {
  roadmap: ProofRoadmap;
  active: boolean;
}) {
  return (
    <article className="roadmap-card">
      <header className="roadmap-heading">
        <div>
          <p className="eyebrow">Round {roadmap.round} · {active ? 'agent working' : 'shared roadmap'}</p>
          <h2>{roadmap.title}</h2>
          <p>{roadmap.focus}</p>
        </div>
        <strong>{roadmap.progress.percent}%</strong>
      </header>
      <div className="roadmap-progress" aria-label={`${roadmap.progress.percent}% verified`}>
        <span style={{ width: `${roadmap.progress.percent}%` }} />
      </div>
      <div className="roadmap-counts">
        <span><strong>{roadmap.progress.verified}</strong> verified</span>
        <span><strong>{roadmap.progress.provisional}</strong> provisional</span>
        <span><strong>{roadmap.progress.open + roadmap.progress.blocked}</strong> open</span>
        <span><strong>{roadmap.progress.mapped}/{roadmap.progress.total}</strong> mapped</span>
      </div>
      <section className="roadmap-target">
        <p className="section-kicker">Target</p>
        <MathCopy>{roadmap.target_statement}</MathCopy>
      </section>
      {roadmap.summary && <MathCopy className="roadmap-summary">{roadmap.summary}</MathCopy>}
      {roadmap.critical_path.length > 0 && (
        <div className="critical-path">
          <span>Critical path</span>
          <div>{roadmap.critical_path.map((nodeId, index) => (
            <span key={nodeId}>{index > 0 && <i>→</i>}<code>{nodeId}</code></span>
          ))}</div>
        </div>
      )}
      {roadmap.nodes.length ? (
        <div className="roadmap-nodes">
          {roadmap.nodes.map((node, index) => (
            <article className="roadmap-node" key={node.id}>
              <div className="node-rail"><span>{String(index + 1).padStart(2, '0')}</span><i /></div>
              <div className="node-content">
                <header>
                  <div><code>{node.id}</code><h3>{node.label}</h3></div>
                  <span className={`proof-state proof-${node.proof_state}`}>{node.proof_state}</span>
                </header>
                <MathCopy className="node-statement">{node.statement_markdown}</MathCopy>
                {(node.dependencies.length > 0 || node.resolved_lemma_ids.length > 0) && (
                  <div className="node-links">
                    {node.dependencies.length > 0 && <span>depends on {node.dependencies.join(', ')}</span>}
                    {node.resolved_lemma_ids.length > 0 && <span>lemmas {node.resolved_lemma_ids.join(', ')}</span>}
                  </div>
                )}
                {node.notes && <p className="node-notes">{node.notes}</p>}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="compact-empty"><Map /><p><strong>Dependency audit running</strong><span>The first synchronized roadmap round will appear here.</span></p></div>
      )}
    </article>
  );
}

function MessageBoardView({ board }: { board?: MessageBoard }) {
  const messages = [...(board?.messages ?? [])].reverse();
  return (
    <section className="panel message-board-panel">
      <div className="panel-header">
        <div><p className="ui-label">Shared informal channel</p><h2>Agent message board</h2></div>
        <span>{messages.length} posts</span>
      </div>
      <div className="board-notice">
        <MessageSquare aria-hidden="true" />
        <p>Discussion is exploratory and does not count as proof. Roadmap progress moves only when a cited source lemma has an exact accepted audit.</p>
      </div>
      {messages.length ? (
        <div className="message-list">
          {messages.map((message) => (
            <article className="message-card" key={message.id}>
              <header>
                <div><strong>{message.author}</strong><span>#{message.channel} · {message.kind}</span></div>
                <time>{formatTimestamp(message.created_at)}</time>
              </header>
              <h3>{message.subject}</h3>
              <MathCopy>{message.body_markdown}</MathCopy>
              {(message.related_node_ids.length > 0 || message.references.length > 0) && (
                <p className="message-refs">{[...message.related_node_ids, ...message.references].join(' · ')}</p>
              )}
            </article>
          ))}
        </div>
      ) : (
        <div className="quiet-empty"><p className="eyebrow">No posts yet</p><h3>The shared board is quiet.</h3><p>The three roadmap agents will post questions, objections, and lemma requests after their first parallel round.</p></div>
      )}
    </section>
  );
}

export function ResearchConsole({ initialData }: { initialData: ResearchSnapshot }) {
  const [data, setData] = useState(initialData);
  const [refreshing, setRefreshing] = useState(false);
  const [lemmaQuery, setLemmaQuery] = useState('');
  const [lemmaStatus, setLemmaStatus] = useState('all');
  const [activeView, setActiveView] = useState<WorkspaceView>('research');

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

  useEffect(() => {
    const syncView = () => setActiveView(viewFromHash(window.location.hash));
    syncView();
    window.addEventListener('hashchange', syncView);
    return () => window.removeEventListener('hashchange', syncView);
  }, []);

  function selectView(view: WorkspaceView) {
    setActiveView(view);
    window.history.replaceState(null, '', `#${viewHashes[view]}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const candidates = [...data.candidates.verified, ...data.candidates.promising];
  const lemmas = data.lemma_book?.lemmas ?? [];
  const visibleLemmas = (() => {
    const needle = lemmaQuery.trim().toLowerCase();
    return lemmas.filter((lemma) => {
      const matchesStatus = lemmaStatus === 'all' || lemma.status === lemmaStatus;
      const haystack = [
        lemma.title,
        lemma.statement_markdown,
        lemma.source_job_id,
        lemma.source_step_id,
      ].join(' ').toLowerCase();
      return matchesStatus && (!needle || haystack.includes(needle));
    });
  })();
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
        <button className="brand" type="button" onClick={() => selectView('research')}>
          <span>LP</span>
          <div>
            <strong>Line–Point</strong>
            <small>Research observatory</small>
          </div>
        </button>
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
          <div className="sidebar-tabs" aria-label="Research workspace" role="tablist">
            <button className={activeView === 'research' ? 'active' : ''} type="button" role="tab" aria-selected={activeView === 'research'} onClick={() => selectView('research')}>
              <ListTree /> Research <span>{candidates.length}</span>
            </button>
            <button className={activeView === 'lemmas' ? 'active' : ''} type="button" role="tab" aria-selected={activeView === 'lemmas'} onClick={() => selectView('lemmas')}>
              <BookOpen /> Lemma Book <span>{lemmas.length}</span>
            </button>
            <button className={activeView === 'roadmaps' ? 'active' : ''} type="button" role="tab" aria-selected={activeView === 'roadmaps'} onClick={() => selectView('roadmaps')}>
              <Map /> Proof Roadmaps <span>{data.proof_roadmaps?.roadmaps.length ?? 3}</span>
            </button>
            <button className={activeView === 'messages' ? 'active' : ''} type="button" role="tab" aria-selected={activeView === 'messages'} onClick={() => selectView('messages')}>
              <MessageSquare /> Message Board <span>{data.message_board?.messages.length ?? 0}</span>
            </button>
          </div>

          <div className="scope-card">
            <p className="ui-label">Research scope</p>
            <dl>
              <div><dt>Dimension</dt><dd>m = {data.status.dimension}</dd></div>
              <div><dt>Field</dt><dd>Prime 𝔽<sub>p</sub></dd></div>
              <div><dt>Degree</dt><dd>{data.status.degree_lower_bound_exclusive} &lt; d &lt; p</dd></div>
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
          {activeView === 'research' && (
            <>
              <section className="mission-card">
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
                    <DisplayFormula math={'\\text{soundness} \\leq (\\frac{d}{p})^{1-o(1)}'} />
                    <p className="benchmark-formula">Benchmark: <InlineFormula math={'(d/p)^{1/3}'} /></p>
                  </div>
                </div>
                <div className="metric-row">
                  <div><span>Progress</span><strong>{completed}/{researchers.length}</strong></div>
                  <div><span>Promising</span><strong>{data.candidates.promising.length}</strong></div>
                  <div><span>Verified</span><strong>{data.candidates.verified.length}</strong></div>
                  <div><span>Rejected</span><strong>{data.candidates.rejected.length}</strong></div>
                  <div><span>Lemmas</span><strong>{lemmas.length}</strong></div>
                </div>
                <div className="progress-track" aria-label={`${progress}% of researchers completed`}><span style={{ width: `${progress}%` }} /></div>
                <div className="pipeline" aria-label="Research review pipeline">
                  <span><Users /> Researcher</span><i>→</i><span><FileCheck2 /> Proof note</span><i>→</i><span><ShieldCheck /> Verifier</span><i>→</i><span><BookOpen /> Lemma Writer</span>
                </div>
              </section>

              <div className="content-grid">
                <div className="main-column">
                  <section className="panel">
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

                  <section className="panel">
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
                              <div className="ledger-flow">
                                <div className="ledger-term"><span>Input</span><MathCopy>{item.input_scale}</MathCopy></div>
                                <span className="ledger-arrow" aria-hidden="true">→</span>
                                <div className="ledger-term"><span>Output</span><MathCopy>{item.output_scale}</MathCopy></div>
                              </div>
                              <div className="ledger-loss"><span>Loss</span><MathCopy>{item.loss}</MathCopy></div>
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

                <aside className="activity-column">
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
            </>
          )}

          {activeView === 'lemmas' && (
            <section className="panel lemma-book single-view">
              <div className="panel-header lemma-book-header">
                <div><p className="ui-label">Typeset reference</p><h2>Lemma Book</h2></div>
                <span>{data.lemma_book?.edited_source_count ?? 0}/{data.lemma_book?.source_count ?? 0} notes polished</span>
              </div>
              <div className="lemma-rule">
                <BookOpen aria-hidden="true" />
                <p><strong>Statement rule.</strong> {data.lemma_book?.editorial_rule ?? 'Statements contain only hypotheses and conclusions; explanation belongs in the proof.'}</p>
              </div>
              <div className="lemma-tools">
                <div className="lemma-search">
                  <Search aria-hidden="true" />
                  <Input value={lemmaQuery} onChange={(event) => setLemmaQuery(event.target.value)} placeholder="Search lemmas, statements, or sources" aria-label="Search the lemma book" />
                </div>
                <div className="lemma-filters" aria-label="Filter lemmas by status">
                  {['all', 'proved', 'conditional', 'conjectural', 'refuted'].map((status) => (
                    <Button key={status} type="button" size="sm" variant={lemmaStatus === status ? 'default' : 'outline'} onClick={() => setLemmaStatus(status)}>{status}</Button>
                  ))}
                </div>
              </div>
              {visibleLemmas.length ? (
                <div className="lemma-list">{visibleLemmas.map((lemma, index) => <LemmaBookEntry key={lemma.id} lemma={lemma} index={index} />)}</div>
              ) : (
                <div className="compact-empty"><BookOpen /><p><strong>No matching lemmas</strong><span>The Lemma Writer publishes entries only after deterministic math-rendering checks.</span></p></div>
              )}
            </section>
          )}

          {activeView === 'roadmaps' && (
            <section className="single-view roadmap-view">
              <header className="view-header">
                <div>
                  <p className="ui-label">Lean-style dependency ledgers</p>
                  <h1>Proof Roadmaps</h1>
                  <p>Three agents maintain distinct proof routes over one shared lemma corpus. Progress is computed from exact source hashes and independent audits, never from an agent’s confidence.</p>
                </div>
                <div className="view-status">
                  <span className={data.proof_roadmaps?.status === 'running' ? 'state-dot active' : 'state-dot'} />
                  <strong>{data.proof_roadmaps?.status ?? 'queued'}</strong>
                  <small>{data.proof_roadmaps?.reasoning_effort ?? 'ultra'} reasoning</small>
                </div>
              </header>
              <div className="roadmap-grid">
                {(data.proof_roadmaps?.roadmaps ?? []).map((roadmap) => (
                  <RoadmapCard key={roadmap.roadmap_id} roadmap={roadmap} active={data.proof_roadmaps?.active_roadmaps.includes(roadmap.roadmap_id) ?? false} />
                ))}
              </div>
            </section>
          )}

          {activeView === 'messages' && (
            <div className="single-view"><MessageBoardView board={data.message_board} /></div>
          )}

          <footer><span>Public snapshot · {data.campaign}</span><span>KaTeX-enabled proof rendering</span></footer>
        </div>
      </div>
    </main>
  );
}
