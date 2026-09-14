import snapshot from '../public/research-data.json';
import { ResearchConsole, type ResearchSnapshot } from '@/components/research-console';

export default function Home() {
  return <ResearchConsole initialData={snapshot as ResearchSnapshot} />;
}
