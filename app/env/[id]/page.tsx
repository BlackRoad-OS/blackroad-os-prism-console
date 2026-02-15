import EnvClient from './EnvClient';

// Generate static params for known environments
export function generateStaticParams() {
  return [
    { id: 'prod' },
    { id: 'staging' },
    { id: 'dev' },
  ];
}

interface EnvPageProps {
  params: { id: string };
}

export default function EnvDetailPage({ params }: EnvPageProps) {
  return <EnvClient envId={params.id} />;
}
