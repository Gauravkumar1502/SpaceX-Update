import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Launch } from '../models/Launch';
import { Launchpad } from '../models/Launchpad';
import { Rocket } from '../models/Rocket';
@Injectable({
  providedIn: 'root',
})
export class SpacexService {
  private readonly baseUrl: string = 'https://api.spacexdata.com/v4';
  constructor(private readonly http: HttpClient) {}

  getLaunches() {
    return this.http.get<Launch[]>(`${this.baseUrl}/launches`);
  }

  getLatestLaunch() {
    return this.http.get<Launch>(`${this.baseUrl}/launches/latest`);
  }

  getLaunchpad(id: string) {
    return this.http.get<Launchpad>(`${this.baseUrl}/launchpads/${id}`);
  }

  getRocket(id: string) {
    return this.http.get<Rocket>(`${this.baseUrl}/rockets/${id}`);
  }
}
