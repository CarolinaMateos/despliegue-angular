import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SerieModel } from '../models/serie';

@Injectable({
  providedIn: 'root',
})
export class SeriesService {
  private readonly url = 'https://peticiones.online/api/series';

  constructor(private http: HttpClient){}

  //GET completo
  getAll(): Observable<SerieModel[]>{
    return this.http.get<SerieModel[]>(this.url);
  }

  //POST para crear una nueva serie
  create(series: SerieModel): Observable<SerieModel>{
    return this.http.post<SerieModel>(this.url, series);
  }
}
