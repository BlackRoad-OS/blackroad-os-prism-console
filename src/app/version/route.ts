import { NextResponse } from 'next/server';

export async function GET() {
  const version = process.env.npm_package_version ?? 'unknown';
  return NextResponse.json({
    version,
    timestamp: new Date().toISOString(),
  });
}
