import { NextResponse } from 'next/server';
import { products, getProductsByCategory } from '@/lib/stripe';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  const result = category ? getProductsByCategory(category) : products;

  return NextResponse.json({ products: result });
}
