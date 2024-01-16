import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import Annotation from 'chartjs-plugin-annotation';
import {MessageService, SelectItem} from "primeng/api";
import {AccommodationService} from "../../accommodations/accommodation.service";
import {AccommodationAnalysis} from "../../model/accommodation-analysis-model";
import {ActivatedRoute} from "@angular/router";
import {Reservation} from "../../model/reservation-model";
import defaultCallbacks from "chart.js/dist/plugins/plugin.tooltip";
import {AccommodationTotalEarnings} from "../../model/accommodation-total-earnings-model";
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import * as jspdf from "jspdf";
import html2canvas from "html2canvas";
import 'jspdf-autotable';
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";

@Component({
  selector: 'app-year-analytics',
  templateUrl: './year-analytics.component.html',
  styleUrls: ['./year-analytics.component.css']
})
export class YearAnalyticsComponent implements OnInit{
  private newLabel? = 'New label';
  accommodationsAnalysis: AccommodationAnalysis[];
  hostId: number;
  selectedYear: number = 2023;
  earningsData: number[];
  reservationsData: number[];
  yearOptions: SelectItem[] = [
    {label: '2024', value: 2024},
    {label: '2023', value: 2023},
    {label: '2022', value: 2022},
    {label: '2021', value: 2021},
    {label: '2020', value: 2020},
    {label: '2019', value: 2019},
    {label: '2018', value: 2018},
    {label: '2017', value: 2017},
    {label: '2016', value: 2016},
    {label: '2015', value: 2015},

  ];
  selectedChartType: ChartType;
  chartTypes: SelectItem[] = [
    {label: 'bar', value: 'bar'},
    {label: 'line', value: 'line'},
    {label: 'pie', value: 'pie'}
  ]
  accommodations: SelectItem[] = []
  selectedAccommodationName: string = '';
  selectedAccommodation: number = 0;

  chartLabels: Array<string> = ['January', 'February', 'March', 'April', 'May', 'June', 'July',  'August', 'September', 'October', 'November', 'December'];
  chartType: ChartType = 'bar';
  chartLegend = true;
  chartEarningsData: Array<any> = [];
  chartReservationsData: Array<any> = [];

  startDate: Date;
  endDate: Date;
  pieChartType: ChartType = 'pie';
  periodEarningsChartData: Array<any> = [];
  periodReservationsChartData: Array<any> = [];
  accommodationPeriodAnalysis: AccommodationTotalEarnings[];
  periodEarningsData: number[] = [];
  periodReservationsData: number[] = [];
  periodLabels: string[] = [];
  pieChartPlugins = [DatalabelsPlugin];


  pieChartEarningsOptions: ChartConfiguration['options'] = {
    plugins: {
      title: {
        display: true,
        text: "Earnings"
      },
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value: any, ctx: any) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },



    },
  };
  pieChartReservationsOptions: ChartConfiguration['options'] = {
    plugins: {
      title: {
        display: true,
        text: "Number of reservations"
      },
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value: any, ctx: any) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    },
  };


  constructor(private route: ActivatedRoute,private accommodationService: AccommodationService, private messageService: MessageService) {
    Chart.register(Annotation);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const hostId = +params["hostId"];
      this.hostId = hostId;
      console.log(hostId)
      this.accommodationService.getYearAnalytics(hostId, 2023).subscribe({
        next: (data: AccommodationAnalysis[]) => {
          this.accommodationsAnalysis = data;
          for (let i = 0; i < this.accommodationsAnalysis.length; i++) {
            this.accommodations.push({label: this.accommodationsAnalysis[i].name, value: i})
          }
          this.selectedAccommodationName = this.accommodationsAnalysis[0].name;
          this.earningsData = this.accommodationsAnalysis[0].moneyPerMonth;
          this.reservationsData = this.accommodationsAnalysis[0].reservationsPerMonth;
          this.chartEarningsData = [{data: this.earningsData, label: "Earnings", fill: 'origin'}]
          this.chartReservationsData = [{data: this.reservationsData, label:"Number of reservations" ,fill: 'origin'}]
        }
      })

    })
  }


  findAnalytics(){
    console.log(this.accommodationsAnalysis[this.selectedAccommodation].moneyPerMonth);
    this.selectedAccommodationName = this.accommodationsAnalysis[this.selectedAccommodation].name;
    this.earningsData = this.accommodationsAnalysis[this.selectedAccommodation].moneyPerMonth;
    this.reservationsData = this.accommodationsAnalysis[this.selectedAccommodation].reservationsPerMonth;
    this.chartEarningsData = [{data: this.earningsData, label: "Earnings", fill: 'origin'}]
    this.chartReservationsData = [{data: this.reservationsData, label:"Reservations", fill: 'origin'}]
    console.log(this.selectedAccommodation);
  }

  changeChartType(){
    this.chartType = this.selectedChartType;
  }

  changeYear(){
    this.accommodationService.getYearAnalytics(this.hostId, this.selectedYear).subscribe({
      next: (data: AccommodationAnalysis[]) => {
        this.accommodationsAnalysis = data;
        this.selectedAccommodationName = this.accommodationsAnalysis[this.selectedAccommodation].name;
        this.earningsData = this.accommodationsAnalysis[this.selectedAccommodation].moneyPerMonth;
        this.reservationsData = this.accommodationsAnalysis[this.selectedAccommodation].reservationsPerMonth;
        this.chartEarningsData = [{data: this.earningsData, label: "Earnings", fill: 'origin'}]
        this.chartReservationsData = [{data: this.reservationsData, label:"Reservations", fill: 'origin'}]
      }
    })
  }

  getPeriodAnalytics(){
    if(this.startDate && this.endDate){
      if(this.startDate>this.endDate){
        this.messageService.add({
          severity: 'fail',
          summary: 'Fail',
          key: 'bc',
          detail: 'Dates doesnt make sense!',
          life: 2000
        })
        return;
      }
      this.periodLabels = [];
      this.periodEarningsData = [];
      this.periodReservationsData = [];
      this.accommodationService.getPeriodAnalytics(this.hostId, this.startDate, this.endDate).subscribe({
        next: (data: AccommodationTotalEarnings[]) => {
          this.accommodationPeriodAnalysis = data;
          for (let i = 0; i < this.accommodationPeriodAnalysis.length; i++) {
            this.periodEarningsData.push(this.accommodationPeriodAnalysis[i].totalEarnings);
            this.periodReservationsData.push(this.accommodationPeriodAnalysis[i].totalReservations);
            this.periodLabels.push(this.accommodationPeriodAnalysis[i].name);
          }
          this.periodEarningsChartData = [{data: this.periodEarningsData, fill: 'origin'}];
          this.periodReservationsChartData = [{data: this.periodReservationsData, fill: 'origin'}];
        }
      })
    }else{
      this.messageService.add({
        severity: 'fail',
        summary: 'Fail',
        key: 'bc',
        detail: 'Input both dates!',
        life: 2000
      })
    }

  }

  exportYearAnalyticsToPdf(){
    const container = document.querySelector('.central-panel') as HTMLElement;
    if (container instanceof HTMLElement) {

      html2canvas(container).then((canvas) => {
        const pdf = new jspdf.jsPDF();
        pdf.text(this.selectedYear + ' Year Earnings Chart - ' + this.selectedAccommodationName, 10, 10);
        let chartHeight = 130;
        let tableY = 170;
        if(this.selectedChartType=='pie'){
          chartHeight = 180;
          tableY = 220;
        }
        pdf.addImage(this.getBase64Image('yearEarningsChart'), 'PNG', 20, 20, 180, chartHeight);


        const tableContainer = document.getElementById('table1') as HTMLElement;
        if (tableContainer instanceof HTMLElement) {
          const tableData = this.getTableData(tableContainer);
          autoTable(pdf,{
            head: [this.chartLabels], // Replace with your table headers
            body: tableData,
            startY: tableY,
            headStyles: { fillColor: [255, 160, 181], textColor: [0, 0, 0], fontSize: 9, fontStyle: 'bold' }
          });
        }

        pdf.addPage();

        pdf.text(this.selectedYear + ' Year Reservations Chart - ' + this.selectedAccommodationName, 10, 10);
        pdf.addImage(this.getBase64Image('yearEarningsChart'), 'PNG', 10, 20, 180, chartHeight);

        const tableContainer2 = document.getElementById('table2') as HTMLElement;
        if (tableContainer2 instanceof HTMLElement) {
          const tableData = this.getTableData(tableContainer2);
          autoTable(pdf,{
            head: [this.chartLabels], // Replace with your table headers
            body: tableData,
            startY: tableY,
            headStyles: { fillColor: [255, 160, 181], textColor: [0, 0, 0], fontSize: 9, fontStyle: 'bold' }
          });
        }

        pdf.save('year-analytics.pdf');

      });
    }
  }

  private getTableData(tableContainer: HTMLElement): any[] {
    const rows = tableContainer.querySelectorAll('tr');
    const tableData: any[][] = [];

    rows.forEach((row) => {
      const rowData: any[] = [];
      const cells = row.querySelectorAll('td');
      if (cells.length==0)
        return;
      cells.forEach((cell) => {
        rowData.push(cell.textContent || '');
      });
      tableData.push(rowData);
    });

    return tableData;
  }

  exportPeriodAnalyticsToPdf(){
    if (this.periodEarningsChartData.length==0 || this.periodReservationsChartData.length==0){
      this.messageService.add({
        severity: 'fail',
        summary: 'Fail',
        key: 'bc',
        detail: 'No charts to export!',
        life: 2000
      })
      return;
    }
    const container = document.querySelector('.central-panel') as HTMLElement;
    if (container instanceof HTMLElement) {

      html2canvas(container).then((canvas) => {
        const pdf = new jspdf.jsPDF();
        const formattedStartDate = this.startDate.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric' });
        const formattedEndDate = this.endDate.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric' });

        pdf.text(formattedStartDate + " - " + formattedEndDate + '      Earnings Chart ' + '\n' + this.selectedAccommodationName, 10, 10);
        pdf.addImage(this.getBase64Image('periodEarningsChart'), 'PNG', 20, 20, 180, 180);


        const tableContainer = document.getElementById('table11') as HTMLElement;
        if (tableContainer instanceof HTMLElement) {
          const tableData = this.getTableData(tableContainer);
          autoTable(pdf,{
            head: [this.periodLabels], // Replace with your table headers
            body: tableData,
            startY: 220,
            headStyles: { fillColor: [255, 160, 181], textColor: [0, 0, 0], fontSize: 9, fontStyle: 'bold' }
          });
        }

        pdf.addPage();
        pdf.text(formattedStartDate + " - " + formattedEndDate + '      Reservations Chart ' + '\n' + this.selectedAccommodationName, 10, 10);
        pdf.addImage(this.getBase64Image('periodReservationsChart'), 'PNG', 10, 20, 180, 180);

        const tableContainer2 = document.getElementById('table22') as HTMLElement;
        if (tableContainer2 instanceof HTMLElement) {
          const tableData = this.getTableData(tableContainer2);
          autoTable(pdf,{
            head: [this.periodLabels], // Replace with your table headers
            body: tableData,
            startY: 220,
            headStyles: { fillColor: [255, 160, 181], textColor: [0, 0, 0], fontSize: 9, fontStyle: 'bold' }
          });
        }

        pdf.save('period-analytics.pdf');

      });
    }
  }

  private getBase64Image(canvasId: string): string {
    console.log(canvasId);
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    const imageData = canvas.toDataURL('image/png');
    return imageData.replace(/^data:image\/(png|jpg);base64,/, '');
  }

}
