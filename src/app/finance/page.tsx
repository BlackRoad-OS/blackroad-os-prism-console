'use client';

import { useEffect, useState } from 'react';
import { StatCard } from '@/components/cards/StatCard';
import { GenericTable } from '@/components/tables/GenericTable';
import { fetchCashForecast, fetchStatements } from '@/services/financeService';
import { useFinanceSummary } from '@/hooks/useFinanceSummary';
import type { CashForecast, FinancialStatements, StatementLineItem } from '@/types/finance';

const demoPeriods = ['2025-01', '2025-Q1', '2024-12'];

function formatMoney(amount: number | undefined, currency = 'USD') {
  if (amount === undefined) return '—';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
}

function renderLineItems(items: StatementLineItem[]) {
  return items.map((item) => (
    <tr key={item.account}>
      <td>{item.label}</td>
      <td>{formatMoney(item.amount)}</td>
    </tr>
  ));
}

export default function FinancePage() {
  const { data: summary, isLoading: summaryLoading, error: summaryError } = useFinanceSummary();
  const [forecast, setForecast] = useState<CashForecast | null>(null);
  const [statements, setStatements] = useState<FinancialStatements | null>(null);
  const [period, setPeriod] = useState(demoPeriods[0]);
  const [loadingForecast, setLoadingForecast] = useState(true);
  const [loadingStatements, setLoadingStatements] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoadingForecast(true);
    fetchCashForecast()
      .then(setForecast)
      .catch((err) => setError(err.message))
      .finally(() => setLoadingForecast(false));
  }, []);

  useEffect(() => {
    setLoadingStatements(true);
    fetchStatements(period)
      .then((result) => {
        setStatements(result);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoadingStatements(false));
  }, [period]);

  return (
    <div className="grid">
      <div className="card" style={{ gridColumn: 'span 2' }}>
        <h1>Finance</h1>
        <p className="muted">Runway, burn, and statements pulled from blackroad-os-api.</p>
      </div>

      <div className="card stat-grid" style={{ gridColumn: 'span 2' }}>
        <h3>Summary</h3>
        {summaryError && <div className="error-banner">{summaryError.message}</div>}
        <div className="stat-grid-inner">
          <StatCard
            label="Cash balance"
            value={summaryLoading ? 'Loading…' : formatMoney(summary?.cashBalance, summary?.currency)}
            helpText="Available cash"
          />
          <StatCard
            label="Runway"
            value={summaryLoading ? 'Loading…' : `${summary?.runwayMonths ?? '—'} months`}
            helpText="Based on monthly burn"
          />
          <StatCard
            label="Monthly burn"
            value={summaryLoading ? 'Loading…' : formatMoney(summary?.monthlyBurnRate, summary?.currency)}
          />
          <StatCard
            label="MRR / ARR"
            value={summaryLoading ? 'Loading…' : `${formatMoney(summary?.mrr, summary?.currency)} / ${formatMoney(summary?.arr, summary?.currency)}`}
          />
        </div>
      </div>

      <div className="card" style={{ gridColumn: 'span 2' }}>
        <h3>Cash Forecast</h3>
        {loadingForecast && <p className="muted">Loading forecast…</p>}
        {forecast && (
          <table className="table">
            <thead>
              <tr>
                <th>Start</th>
                <th>End</th>
                <th>Net change</th>
                <th>Ending balance</th>
              </tr>
            </thead>
            <tbody>
              {forecast.buckets.map((bucket) => (
                <tr key={`${bucket.startDate}-${bucket.endDate}`}>
                  <td>{bucket.startDate}</td>
                  <td>{bucket.endDate}</td>
                  <td>{formatMoney(bucket.netChange, forecast.currency)}</td>
                  <td>{formatMoney(bucket.endingBalance, forecast.currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="card" style={{ gridColumn: 'span 2' }}>
        <h3>Statements</h3>
        <label className="muted" htmlFor="period-select">
          Period
        </label>
        <select id="period-select" value={period} onChange={(e) => setPeriod(e.target.value)}>
          {demoPeriods.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
        {loadingStatements && <p className="muted">Loading statements…</p>}
        {error && <div className="error-banner">{error}</div>}
        {statements && (
          <div className="grid" style={{ marginTop: 12 }}>
            <div className="card">
              <h4>Income Statement</h4>
              <table className="table">
                <tbody>
                  {renderLineItems(statements.incomeStatement.revenue)}
                  {renderLineItems(statements.incomeStatement.cogs)}
                  {renderLineItems(statements.incomeStatement.operatingExpenses)}
                  {renderLineItems(statements.incomeStatement.otherIncomeExpenses)}
                  <tr>
                    <td>
                      <strong>Net Income</strong>
                    </td>
                    <td>{formatMoney(statements.incomeStatement.netIncome, statements.incomeStatement.currency)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="card">
              <h4>Balance Sheet</h4>
              <table className="table">
                <tbody>
                  <tr>
                    <td colSpan={2}>
                      <strong>Assets</strong>
                    </td>
                  </tr>
                  {renderLineItems(statements.balanceSheet.assets)}
                  <tr>
                    <td colSpan={2}>
                      <strong>Liabilities</strong>
                    </td>
                  </tr>
                  {renderLineItems(statements.balanceSheet.liabilities)}
                  <tr>
                    <td colSpan={2}>
                      <strong>Equity</strong>
                    </td>
                  </tr>
                  {renderLineItems(statements.balanceSheet.equity)}
                </tbody>
              </table>
            </div>

            <div className="card">
              <h4>Cash Flow</h4>
              <table className="table">
                <tbody>
                  <tr>
                    <td colSpan={2}>
                      <strong>Operating</strong>
                    </td>
                  </tr>
                  {renderLineItems(statements.cashFlowStatement.operatingActivities)}
                  <tr>
                    <td colSpan={2}>
                      <strong>Investing</strong>
                    </td>
                  </tr>
                  {renderLineItems(statements.cashFlowStatement.investingActivities)}
                  <tr>
                    <td colSpan={2}>
                      <strong>Financing</strong>
                    </td>
                  </tr>
                  {renderLineItems(statements.cashFlowStatement.financingActivities)}
                  <tr>
                    <td>
                      <strong>Net change</strong>
                    </td>
                    <td>{formatMoney(statements.cashFlowStatement.netChangeInCash, statements.cashFlowStatement.currency)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
