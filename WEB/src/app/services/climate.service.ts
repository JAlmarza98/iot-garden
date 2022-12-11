import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClimateService {

  NODE1_URL = environment.NODE1_URL

  constructor( private http: HttpClient) { }

  getActualClimateData() {
    return this.http.get(this.NODE1_URL);
  }
}
