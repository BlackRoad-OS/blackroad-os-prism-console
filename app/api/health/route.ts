import { NextResponse } from 'next/server';

const startTime = Date.now();
export const runtime = 'edge';

export async function GET() {
  const uptime = Math.round((Date.now() - startTime) / 1000);
  return NextResponse.json({
    status: 'ok',
    service: 'blackroad-prism-console',
    uptime
  });
}
