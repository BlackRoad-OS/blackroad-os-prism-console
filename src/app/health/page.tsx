import { getStaticServiceHealth } from '@/lib/config';

export const revalidate = 0;

export default async function HealthPage() {
  const health = await getStaticServiceHealth();
  return (
    <div>
      <h1>Health Check</h1>
      <pre>{JSON.stringify(health, null, 2)}</pre>
    </div>
  );
}
