import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SerieModel } from '../../models/serie';
import { SeriesService } from '../../services/series.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {

  series$: Observable<SerieModel[]>;

  constructor(private seriesService: SeriesService){
    this.series$ = this.seriesService.getAll();
  }

}
