export interface FinanceSummary {
  currency: string;
  cashBalance: number;
  monthlyBurnRate: number;
  runwayMonths: number;
  mrr?: number;
  arr?: number;
  generatedAt: string;
}

export interface CashForecastBucket {
  startDate: string;
  endDate: string;
  netChange: number;
  endingBalance: number;
}

export interface CashForecast {
  currency: string;
  buckets: CashForecastBucket[];
  generatedAt: string;
}

export interface StatementLineItem {
  account: string;
  label: string;
  amount: number;
}

export interface IncomeStatement {
  period: string;
  currency: string;
  revenue: StatementLineItem[];
  cogs: StatementLineItem[];
  operatingExpenses: StatementLineItem[];
  otherIncomeExpenses: StatementLineItem[];
  netIncome: number;
}

export interface BalanceSheet {
  period: string;
  currency: string;
  assets: StatementLineItem[];
  liabilities: StatementLineItem[];
  equity: StatementLineItem[];
}

export interface CashFlowStatement {
  period: string;
  currency: string;
  operatingActivities: StatementLineItem[];
  investingActivities: StatementLineItem[];
  financingActivities: StatementLineItem[];
  netChangeInCash: number;
}

export interface FinancialStatements {
  period: string;
  incomeStatement: IncomeStatement;
  balanceSheet: BalanceSheet;
  cashFlowStatement: CashFlowStatement;
}
