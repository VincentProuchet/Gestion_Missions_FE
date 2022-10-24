import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { } from 'chart.js';
import { fr_dates } from 'src/environments/API_Vars';
import { Mission } from 'src/app/model/mission';
import { MissionsService } from 'src/app/service/missions.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  missions: Mission[] = [];

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0,

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
      { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Primes' },

    ]
  };
  public constructor(private srvMission: MissionsService) { }

  ngOnInit(): void {
    this.missions = this.srvMission.missions;
    this.update(new Date(Date.now()).getFullYear());
  }



  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    this.update(new Date(Date.now()).getFullYear());
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {

  }

  public update(year: number): void {
    this.missions = this.srvMission.missions
    let missionsofyear: Mission[] = this.missions.filter((mission) => {
      let date = (new Date(mission.start)).getFullYear();
      if ((new Date(mission.start)).getFullYear() == year) {
        return true;
      }
      return false;
    });

    console.log(missionsofyear);

    // Only Change 3 values
    // for each month
    for (let index = 0; index < 12; index++) {
      this.barChartData.datasets[0].data[index] = 0;
    }
    missionsofyear.forEach(element => {
      let date = (new Date(element.start));
      console.log(date.getMonth());

      this.barChartData.datasets[0].data[date.getMonth()] += element.bonus;
    });

    console.log(`data char ${year}`);

    console.log(this.barChartData.datasets);

    this.chart?.update();
  }

}
