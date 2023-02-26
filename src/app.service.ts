import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { ReportType, Report, data } from './data';
import { ReportResponseDto } from './dtos/report.dto';

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
  getAllReports(type: ReportType): ReportResponseDto[] {
    return data.report
      .filter((report) => report.type === type)
      .map((report) => new ReportResponseDto(report));
  }

  getReportById(type: ReportType, id: string) {
    const report = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);

    if (!report) return;

    return new ReportResponseDto(report);
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

    return new ReportResponseDto(newReport);
  }

  updateReport(type: ReportType, id: string, body: UpdateReportData) {
    const report = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);

    if (!report) return;

    Object.assign(report, body, { updated_at: new Date() });

    return new ReportResponseDto(report);
  }

  deleteReport(type: ReportType, id: string) {
    const reportIndex = data.report
      .filter((report) => report.type === type)
      .findIndex((report) => report.id === id);

    data.report.splice(reportIndex, 1);
  }
}
