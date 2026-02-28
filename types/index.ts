export type EnvStatus = 'healthy' | 'warning' | 'degraded';

export interface Env {
  id: string;
  name: string;
  region: string;
  status: EnvStatus;
  updatedAt: string;
}

export interface HealthResponse {
  status: string;
  uptime: number;
}

export interface VersionResponse {
  version: string;
  commit: string;
}

export interface DeploySummary {
  envId: string;
  lastDeploy: string;
  artifact: string;
}

export type ProductCategory = 'console' | 'platform' | 'drive' | 'addon';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: 'month' | 'year';
  category: ProductCategory;
  features: string[];
}
