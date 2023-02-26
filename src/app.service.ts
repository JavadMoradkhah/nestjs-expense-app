import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { ReportType, Report, data } from './data';

interface ReportData {
  source: string;
  amount: number;
}

interface UpdateReportData {
  source?: string;
  amount?: number;
}

@Injectable()
export class AppService {
  getAllReports(type: ReportType) {
    return data.report.filter((report) => report.type === type);
  }

  getReportById(type: ReportType, id: string) {
    return data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);
  }

  createReport(type: ReportType, body: ReportData) {
    const newReport: Report = {
      id: uuid(),
      source: body.source,
      amount: body.amount,
      type: type === 'income' ? ReportType.INCOME : ReportType.EXPENSE,
      created_at: new Date(),
      updated_at: new Date(),
    };

    data.report.push(newReport);

    return newReport;
  }

  updateReport(type: ReportType, id: string, body: UpdateReportData) {
    const report = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);

    if (!report) return;

    Object.assign(report, body, { updated_at: new Date() });

    return report;
  }

  deleteReport(type: ReportType, id: string) {
    const reportIndex = data.report
      .filter((report) => report.type === type)
      .findIndex((report) => report.id === id);

    data.report.splice(reportIndex, 1);
  }
}
