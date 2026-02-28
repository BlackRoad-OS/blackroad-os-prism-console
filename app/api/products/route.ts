import { NextResponse } from 'next/server';
import { products, getProductsByCategory, isValidCategory } from '@/lib/stripe';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  if (category !== null) {
    if (!isValidCategory(category)) {
      return NextResponse.json(
        { error: `Invalid category. Must be one of: console, platform, drive, addon` },
        { status: 400 }
      );
    }
    return NextResponse.json({ products: getProductsByCategory(category) });
  }

  return NextResponse.json({ products });
}
