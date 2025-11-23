import { apiGet } from '../lib/apiClient';
import type { CashForecast, FinanceSummary, FinancialStatements } from '../types/finance';

export async function fetchFinanceSummary(): Promise<FinanceSummary> {
  return apiGet<FinanceSummary>('/finance/summary');
}

export async function fetchCashForecast(): Promise<CashForecast> {
  return apiGet<CashForecast>('/finance/cash-forecast');
}

export async function fetchStatements(period: string): Promise<FinancialStatements> {
  return apiGet<FinancialStatements>(`/finance/statements/${encodeURIComponent(period)}`);
}
