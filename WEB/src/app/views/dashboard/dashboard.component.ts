import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ClimateService } from 'src/app/services/climate.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  mq!: number
  humidity!: number
  temperature!: number

  constructor(private climateService: ClimateService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.climateService.getActualClimateData().pipe(map( (resp: any) => resp.variables)).subscribe( resp => {
      this.mq = resp.pollution;
      this.humidity = resp.humidity;
      this.temperature = resp.temperature;
    })
  }
}
