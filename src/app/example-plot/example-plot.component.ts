import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-example-plot',
  templateUrl: './example-plot.component.html',
  styleUrls: ['./example-plot.component.css']
})
export class ExamplePlotComponent implements OnInit {

  // lineChart
  public lineChartData1: Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];

  public lineChartData2: Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];

  public lineChartLabels: Array<any> = [
    new Date().setMinutes(10),
    new Date().setMinutes(11),
    new Date().setMinutes(12),
    new Date().setMinutes(13),
    new Date().setMinutes(14),
    new Date().setMinutes(15),
    new Date().setMinutes(16)];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  constructor() { }

  ngOnInit() {}


  public randomize(q): void {
    //const _lineChartData: Array<any> = new Array(this.lineChartData1.length);
    /*for (let i = 0; i < this.lineChartData1.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData1[i].data.length), label: this.lineChartData1[i].label};
      for (let j = 0; j < this.lineChartData1[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }*/

    console.log('push to chart: ' + q);
    if (q === 1) {

      console.log('add to chart1');
      this.lineChartData1[1].data.push(Math.floor((Math.random() * 100) + 1));

    } else {
      console.log('add to chart2');
      this.lineChartData2[1].data.push(Math.floor((Math.random() * 100) + 1));
    }

    this.lineChartLabels.push(new Date().toUTCString());
  }



  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
