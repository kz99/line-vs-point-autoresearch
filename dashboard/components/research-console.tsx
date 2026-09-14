'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BrainCircuit,
  Check,
  ChevronRight,
  CircleDashed,
  Clock3,
  FileText,
  FlaskConical,
  RefreshCw,
  Search,
  ShieldCheck,
  Sigma,
  Target,
  Trophy,
  Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress, ProgressLabel, ProgressValue } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

function compactTime(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? 'unknown'
    : `${date.toISOString().slice(11, 16)} UTC`;
}

function candidateStatus(candidate: Candidate) {
  if (candidate.audit?.verdict === 'accept') return 'Verified';
  if (candidate.audit?.verdict === 'reject') return 'Rejected';
  if (candidate.audit?.verdict === 'revise') return 'Needs revision';
  return candidate.result_status === 'proved' ? 'Awaiting audit' : 'Promising lead';
}

function statusBadge(status: JobStatus) {
  const variants = {
    queued: 'border-slate-700 bg-slate-800/70 text-slate-300',
    running: 'border-sky-500/40 bg-sky-500/10 text-sky-300',
    succeeded: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
    failed: 'border-rose-500/40 bg-rose-500/10 text-rose-300',
  };
  return variants[status];
}

function EmptyCandidates() {
  return (
    <div className="empty-grid flex min-h-[340px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-700/80 px-8 text-center">
      <div className="mb-5 grid size-14 place-items-center rounded-2xl border border-slate-700 bg-slate-900 text-lime-300 shadow-[0_0_40px_rgba(190,242,100,0.08)]">
        <FlaskConical className="size-6" />
      </div>
      <h3 className="font-heading text-lg font-semibold text-slate-100">No candidates yet</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
        The trial is ready but has not started. As proof notes arrive, candidates will appear here
        with their claimed exponent, proof status, and independent verifier verdict.
      </p>
      <div className="mt-6 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
        <CircleDashed className="size-4" /> Waiting for the first submission
      </div>
    </div>
  );
}

function CandidateList({
  candidates,
  selectedId,
  onSelect,
}: {
  candidates: Candidate[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  if (!candidates.length) return <EmptyCandidates />;
  return (
    <div className="space-y-2">
      {candidates.map((candidate, index) => (
        <Button
          key={candidate.job_id}
          variant="ghost"
          onClick={() => onSelect(candidate.job_id)}
          className={`h-auto w-full justify-start rounded-xl border px-4 py-4 text-left ${
            selectedId === candidate.job_id
              ? 'border-lime-300/40 bg-lime-300/[0.06]'
              : 'border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900'
          }`}
        >
          <span className="mr-3 font-mono text-xs text-slate-600">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-2">
              <span className="truncate font-medium text-slate-100">{candidate.title}</span>
              {candidate.benchmark_improved && (
                <Badge className="bg-lime-300 text-slate-950">Beats 1/3</Badge>
              )}
            </span>
            <span className="mt-1 flex gap-3 text-xs text-slate-500">
              <span>{candidate.job_id}</span>
              <span>
                {candidate.claimed_exponent
                  ? `α = ${candidate.claimed_exponent}`
                  : 'No exponent claim'}
              </span>
              <span>{candidateStatus(candidate)}</span>
            </span>
          </span>
          <ChevronRight className="ml-3 size-4 text-slate-600" />
        </Button>
      ))}
    </div>
  );
}

function CandidateDetail({ candidate }: { candidate: Candidate }) {
  return (
    <Card className="border border-slate-800 bg-slate-950/65 ring-0">
      <CardHeader className="border-b border-slate-800 pb-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="bg-lime-300 text-slate-950">{candidateStatus(candidate)}</Badge>
          <Badge variant="outline" className="border-slate-700 text-slate-300">
            {candidate.claim_scope.replaceAll('_', ' ')}
          </Badge>
          {candidate.claimed_exponent && (
            <span className="font-mono text-xs text-sky-300">α = {candidate.claimed_exponent}</span>
          )}
        </div>
        <CardTitle className="mt-3 text-xl text-slate-50">{candidate.title}</CardTitle>
        <CardDescription className="font-mono text-xs text-slate-500">
          {candidate.job_id}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-5">
        <section>
          <p className="section-label">Theorem claim</p>
          <p className="mt-2 text-sm leading-6 text-slate-200">{candidate.theorem_statement}</p>
        </section>
        {candidate.global_conclusion && (
          <section>
            <p className="section-label">Global conclusion</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{candidate.global_conclusion}</p>
          </section>
        )}
        <Separator className="bg-slate-800" />
        <section>
          <div className="mb-3 flex items-center justify-between">
            <p className="section-label">Exponent ledger</p>
            <span className="text-xs text-slate-500">
              {candidate.exponent_ledger.length} stages
            </span>
          </div>
          <div className="space-y-2">
            {candidate.exponent_ledger.map((stage, index) => (
              <div
                key={`${stage.stage}-${index}`}
                className="rounded-lg border border-slate-800 bg-slate-900/70 p-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-slate-200">{stage.stage}</span>
                  <Badge variant="outline" className="border-slate-700 text-slate-400">
                    {stage.status}
                  </Badge>
                </div>
                <p className="mt-2 font-mono text-xs text-sky-300">
                  {stage.input_scale} → {stage.output_scale} · loss {stage.loss}
                </p>
              </div>
            ))}
          </div>
        </section>
        {candidate.audit && (
          <section className="rounded-xl border border-sky-500/20 bg-sky-500/[0.06] p-4">
            <div className="flex items-center gap-2 text-sky-300">
              <ShieldCheck className="size-4" />
              <p className="section-label text-sky-300">Verifier report</p>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{candidate.audit.summary}</p>
            {candidate.audit.fatal_obstruction && (
              <p className="mt-3 text-sm text-rose-300">{candidate.audit.fatal_obstruction}</p>
            )}
          </section>
        )}
        <details className="group rounded-xl border border-slate-800 bg-slate-900/40">
          <summary className="cursor-pointer list-none px-4 py-3 text-sm font-medium text-slate-200">
            <span className="flex items-center gap-2">
              <FileText className="size-4 text-slate-500" /> Full mathematical note
            </span>
          </summary>
          <pre className="max-h-[520px] overflow-auto whitespace-pre-wrap border-t border-slate-800 px-4 py-5 font-serif text-sm leading-7 text-slate-300">
            {candidate.note_markdown}
          </pre>
        </details>
      </CardContent>
    </Card>
  );
}

export function ResearchConsole({ initialData }: { initialData: ResearchSnapshot }) {
  const [data, setData] = useState(initialData);
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  async function refresh() {
    setRefreshing(true);
    try {
      const response = await fetch(`/research-data.json?t=${Date.now()}`, { cache: 'no-store' });
      if (response.ok) setData((await response.json()) as ResearchSnapshot);
    } finally {
      setRefreshing(false);
    }
  }

  useEffect(() => {
    const timer = window.setInterval(refresh, 10000);
    return () => window.clearInterval(timer);
  }, []);

  const allCandidates = useMemo(
    () => [
      ...data.candidates.verified,
      ...data.candidates.promising,
    ],
    [data],
  );
  const selected = allCandidates.find((candidate) => candidate.job_id === selectedId) ?? null;
  const researcherJobs = data.jobs.filter((job) => job.role === 'researcher');
  const completedResearchers = researcherJobs.filter((job) =>
    ['succeeded', 'failed'].includes(job.status),
  ).length;
  const runningResearchers = researcherJobs.filter((job) => job.status === 'running').length;
  const progress = researcherJobs.length ? (completedResearchers / researcherJobs.length) * 100 : 0;
  const filteredJobs = researcherJobs.filter((job) =>
    `${job.id} ${job.direction}`.toLowerCase().includes(query.toLowerCase()),
  );
  const queuedResearchers = researcherJobs.filter((job) => job.status === 'queued').length;
  const campaignState = runningResearchers
    ? `${runningResearchers} active`
    : completedResearchers === 0
      ? 'Ready · not launched'
      : queuedResearchers
        ? 'Paused'
        : 'Complete';

  useEffect(() => {
    if (!selectedId && allCandidates.length) setSelectedId(allCandidates[0].job_id);
  }, [allCandidates, selectedId]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-slate-800/90 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-5 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-lg border border-lime-300/30 bg-lime-300/[0.07] text-lime-300">
              <Sigma className="size-5" />
            </div>
            <div>
              <p className="font-heading text-sm font-semibold tracking-tight text-slate-50">
                Line↔Point Observatory
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                bivariate prime-field research
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className={
                campaignState === 'Ready · not launched'
                  ? 'border-amber-400/30 bg-amber-400/[0.07] text-amber-300'
                  : 'border-emerald-400/30 bg-emerald-400/[0.07] text-emerald-300'
              }
            >
              <span
                className={`mr-1 size-1.5 rounded-full ${
                  campaignState === 'Ready · not launched'
                    ? 'bg-amber-300'
                    : runningResearchers
                      ? 'animate-pulse bg-emerald-300'
                      : 'bg-sky-300'
                }`}
              />
              {campaignState}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={refresh}
              disabled={refreshing}
              className="border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800"
            >
              <RefreshCw className={refreshing ? 'animate-spin' : ''} /> Refresh
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] px-5 py-6 lg:px-8 lg:py-8">
        <section className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Card className="metric-card">
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="section-label">Research progress</p>
                <p className="metric-value">
                  {completedResearchers}<span>/{researcherJobs.length}</span>
                </p>
              </div>
              <Activity className="size-5 text-sky-300" />
            </CardContent>
          </Card>
          <Card className="metric-card">
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="section-label">Promising leads</p>
                <p className="metric-value">{data.candidates.promising.length}</p>
              </div>
              <Target className="size-5 text-violet-300" />
            </CardContent>
          </Card>
          <Card className="metric-card">
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="section-label">Verified results</p>
                <p className="metric-value">{data.candidates.verified.length}</p>
              </div>
              <Trophy className="size-5 text-lime-300" />
            </CardContent>
          </Card>
          <Card className="metric-card">
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="section-label">Reasoning</p>
                <p className="metric-value capitalize">{data.status.reasoning_effort}</p>
              </div>
              <BrainCircuit className="size-5 text-amber-300" />
            </CardContent>
          </Card>
        </section>

        <section className="mb-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
          <Card className="border border-slate-800 bg-slate-900/45 ring-0">
            <CardContent className="pt-1">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="section-label">Trial campaign</p>
                  <h1 className="mt-1 font-heading text-2xl font-semibold tracking-tight text-slate-50">
                    Soundness toward (d/p)<sup>1−o(1)</sup>
                  </h1>
                  <p className="mt-2 text-sm text-slate-400">
                    m = 2 · F<sub>p</sub> · benchmark exponent 1/3
                  </p>
                </div>
                <Badge variant="outline" className="border-slate-700 font-mono text-slate-400">
                  {data.campaign}
                </Badge>
              </div>
              <Progress value={progress} className="gap-2">
                <ProgressLabel className="text-xs text-slate-400">Researchers completed</ProgressLabel>
                <ProgressValue className="text-xs text-slate-400">
                  {Math.round(progress)}%
                </ProgressValue>
              </Progress>
            </CardContent>
          </Card>

          <Card className="border border-slate-800 bg-slate-900/45 ring-0">
            <CardContent className="grid grid-cols-2 gap-x-4 gap-y-3 pt-1 text-sm">
              <div><p className="section-label">Model</p><p className="mt-1 font-mono text-xs text-slate-200">{data.status.model}</p></div>
              <div><p className="section-label">Max invocations</p><p className="mt-1 font-mono text-xs text-slate-200">{data.status.planned_agent_invocations}</p></div>
              <div><p className="section-label">Queued now</p><p className="mt-1 font-mono text-xs text-slate-200">{data.status.counts.queued ?? 0}</p></div>
              <div><p className="section-label">Last sync</p><p className="mt-1 font-mono text-xs text-slate-200">{compactTime(data.status.updated_at)}</p></div>
            </CardContent>
          </Card>
        </section>

        <Tabs defaultValue="candidates" className="gap-4">
          <TabsList variant="line" className="border-b border-slate-800 pb-2">
            <TabsTrigger value="candidates" className="px-3 text-slate-400 data-active:text-slate-50">
              Candidates <span className="count-pill">{allCandidates.length}</span>
            </TabsTrigger>
            <TabsTrigger value="bottlenecks" className="px-3 text-slate-400 data-active:text-slate-50">
              Bottlenecks <span className="count-pill">{data.bottlenecks.length}</span>
            </TabsTrigger>
            <TabsTrigger value="researchers" className="px-3 text-slate-400 data-active:text-slate-50">
              Researchers <span className="count-pill">{researcherJobs.length}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="candidates">
            <div
              className={`grid gap-4 ${
                selected ? 'xl:grid-cols-[minmax(420px,0.9fr)_minmax(520px,1.1fr)]' : ''
              }`}
            >
              <Card className="border border-slate-800 bg-slate-900/35 ring-0">
                <CardHeader className="border-b border-slate-800 pb-4">
                  <CardTitle className="flex items-center gap-2 text-slate-100">
                    <Trophy className="size-4 text-lime-300" /> Candidate leaderboard
                  </CardTitle>
                  <CardDescription className="text-slate-500">
                    Verified proofs first, then promising unaudited or repairable claims.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <CandidateList
                    candidates={allCandidates}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                  />
                </CardContent>
              </Card>
              {selected && <CandidateDetail candidate={selected} />}
            </div>
          </TabsContent>

          <TabsContent value="bottlenecks">
            <Card className="border border-slate-800 bg-slate-900/35 ring-0">
              <CardHeader>
                <CardTitle className="text-slate-100">Exponent bottleneck ledger</CardTitle>
                <CardDescription className="text-slate-500">
                  Every claimed loss, aggregated across submitted proof architectures.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {data.bottlenecks.length ? (
                  <div className="grid gap-3 lg:grid-cols-2">
                    {data.bottlenecks.map((item, index) => (
                      <div key={`${item.stage}-${index}`} className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                        <div className="flex justify-between gap-4">
                          <h3 className="font-medium text-slate-200">{item.stage}</h3>
                          <Badge variant="outline" className="border-slate-700 text-slate-400">{item.status}</Badge>
                        </div>
                        <p className="mt-2 font-mono text-xs text-sky-300">{item.input_scale} → {item.output_scale}</p>
                        <p className="mt-3 text-sm leading-6 text-slate-400">{item.justification}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-grid grid min-h-[300px] place-items-center rounded-xl border border-dashed border-slate-700">
                    <div className="text-center">
                      <AlertTriangle className="mx-auto size-6 text-amber-300" />
                      <p className="mt-3 font-medium text-slate-200">No exponent ledgers submitted</p>
                      <p className="mt-1 text-sm text-slate-500">Bottlenecks will populate after the first proof note.</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="researchers">
            <Card className="border border-slate-800 bg-slate-900/35 ring-0">
              <CardHeader className="border-b border-slate-800 pb-4">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-slate-100">
                      <Users className="size-4 text-sky-300" /> Researcher queue
                    </CardTitle>
                    <CardDescription className="text-slate-500">
                      Assignments, attempts, and current execution state.
                    </CardDescription>
                  </div>
                  <div className="relative w-full sm:w-72">
                    <Search className="absolute left-2.5 top-2 size-4 text-slate-600" />
                    <Input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search directions…"
                      className="border-slate-700 bg-slate-950 pl-9 text-slate-200"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <ScrollArea className="h-[520px]">
                  <div className="divide-y divide-slate-800/80">
                    {filteredJobs.map((job) => (
                      <div
                        key={job.id}
                        className="grid gap-3 px-2 py-4 sm:grid-cols-[130px_1fr_100px] sm:items-center"
                      >
                        <div className="font-mono text-xs text-slate-500">{job.id}</div>
                        <div className="text-sm text-slate-300">{job.direction}</div>
                        <div className="flex justify-start sm:justify-end">
                          <Badge variant="outline" className={statusBadge(job.status)}>
                            {job.status === 'succeeded' && <Check className="size-3" />}
                            {job.status === 'running' && <RefreshCw className="size-3 animate-spin" />}
                            {job.status === 'queued' && <Clock3 className="size-3" />}
                            {job.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
