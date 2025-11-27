import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'environments/environment.prod';
import { DataLocation } from '@core/models/data-location';

@Injectable({ providedIn: 'root' })
export class GeocodingService {


  constructor(private http: HttpClient) {}

  geolocation(endereco: string): Observable<DataLocation> {
   const url = `https://back-saneasp.onrender.com/location/geoconding?endereco=${encodeURIComponent(endereco)}, São Paulo, Brazil`;
    console.log(url)
    return this.http.get<DataLocation>(url)
  }
}