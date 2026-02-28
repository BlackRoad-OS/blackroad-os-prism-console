import type { Product, ProductCategory } from '@/types';
import catalog from '@/stripe-config.json';

/** The set of valid product categories. */
export const PRODUCT_CATEGORIES: readonly ProductCategory[] = [
  'console',
  'platform',
  'drive',
  'addon'
] as const;

/**
 * Server-side Stripe environment configuration.
 * All values are read from environment variables at runtime — never hard-coded.
 */
export const stripeEnv = {
  secretKey: process.env.STRIPE_SECRET_KEY ?? '',
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '',
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? ''
} as const;

/**
 * Map of product IDs → Stripe Price IDs sourced from environment variables.
 * Operators must set these after creating the corresponding products in the
 * Stripe Dashboard (test or live mode).
 */
export const stripePriceIds: Record<string, string> = {
  prism_basic: process.env.STRIPE_PRICE_PRISM_BASIC ?? '',
  prism_pro: process.env.STRIPE_PRICE_PRISM_PRO ?? '',
  prism_enterprise: process.env.STRIPE_PRICE_PRISM_ENTERPRISE ?? '',
  platform_starter: process.env.STRIPE_PRICE_PLATFORM_STARTER ?? '',
  platform_growth: process.env.STRIPE_PRICE_PLATFORM_GROWTH ?? '',
  platform_scale: process.env.STRIPE_PRICE_PLATFORM_SCALE ?? '',
  drive_100gb: process.env.STRIPE_PRICE_DRIVE_100GB ?? '',
  drive_1tb: process.env.STRIPE_PRICE_DRIVE_1TB ?? '',
  drive_10tb: process.env.STRIPE_PRICE_DRIVE_10TB ?? '',
  operator_seat: process.env.STRIPE_PRICE_OPERATOR_SEAT ?? '',
  agent_pack_10: process.env.STRIPE_PRICE_AGENT_PACK_10 ?? ''
};

/** Full product catalog loaded from stripe-config.json. */
export const products: Product[] = catalog.products as Product[];

/** Check whether a string is a valid ProductCategory. */
export function isValidCategory(value: string): value is ProductCategory {
  return (PRODUCT_CATEGORIES as readonly string[]).includes(value);
}

/** Retrieve products filtered by category. */
export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}
