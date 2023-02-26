import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { data, ReportType, Report } from './data';

@Controller('/report/:type')
export class AppController {
  @Get()
  getAllReports(@Param('type') type: string) {
    return data.report.filter((report) => report.type === type);
  }

  @Get(':id')
  getReportById(@Param('type') type: string, @Param('id') id: string) {
    const reportType: ReportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return data.report
      .filter((report) => report.type === reportType)
      .find((report) => report.id === id);
  }

  @Post()
  createReport(
    @Param('type') type: string,
    @Body() body: { source: string; amount: number },
  ) {
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

  @Put(':id')
  updateReport(
    @Param('type') type: string,
    @Param('id') id: string,
    @Body() body: { source: string; amount: number },
  ) {
    const reportType: ReportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    const report = data.report
      .filter((report) => report.type === reportType)
      .find((report) => report.id === id);

    if (!report) return;

    Object.assign(report, body);

    return report;
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('type') type: string, @Param('id') id: string) {
    const reportType: ReportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    const reportIndex = data.report
      .filter((report) => report.type === reportType)
      .findIndex((report) => report.id === id);

    data.report.splice(reportIndex, 1);

    return;
  }
}
