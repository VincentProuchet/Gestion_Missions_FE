import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { } from 'chart.js';
import { fr_dates } from 'src/environments/API_Vars';
import { Mission } from 'src/app/model/mission';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() mission: Mission[] = [];
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      },

    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [

  ];

  public barChartData: ChartData<'bar'> = {
    labels: fr_dates.month,
    datasets: [
      { data: [], label: 'Primes' },

    ]
  };

  ngOnInit(): void {
    this.update();
  }



  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    this.update();
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {

  }

  public update(): void {
    // Only Change 3 values
    // for each month
    for (let index = 0; index < 12; index++) {
      // we filter mission based on the current set month
      let values: Mission[] = this.mission.filter((mission) => (new Date(mission.start).getMonth() == index));
      let value: number = 0;
      values.forEach(element => {
        value += element.bonus;
      });
      this.barChartData.datasets[0].data.push(value);
    }

    this.chart?.update();
  }

}
