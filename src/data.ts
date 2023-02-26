export interface Report {
  id: string;
  type: ReportType;
  source: string;
  amount: number;
  created_at: Date;
  updated_at: Date;
}

export enum ReportType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

type Data = {
  report: Report[];
};

export const data: Data = {
  report: [
    {
      id: 'uuid1',
      source: 'Salary',
      amount: 7500,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.INCOME,
    },
    {
      id: 'uuid2',
      source: 'YouTube',
      amount: 2500,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.INCOME,
    },
    {
      id: 'uuid3',
      source: 'Food',
      amount: 500,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.EXPENSE,
    },
  ],
};
