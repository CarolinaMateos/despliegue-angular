import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SeriesService } from '../../services/series.service';
import { SerieModel } from '../../models/serie';

@Component({
  selector: 'app-serie-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './serie-form.html',
  styleUrl: './serie-form.css',
})
export class SerieFormComponent {
  createdId: number | null = null;
  errorMsg: string | null = null;
  submitting = false;

  form = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    channel: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    rating: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0), Validators.max(10)],
    }),
  });

  constructor(private seriesService: SeriesService, private router: Router) {}

  save() {
    this.errorMsg = null;

    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const payload: SerieModel = {
      title: this.form.controls.title.value,
      channel: this.form.controls.channel.value,
      rating: Number(this.form.controls.rating.value),
    };

    this.submitting = true;

    this.seriesService.create(payload).subscribe({
      next: (created) => {
        // Intuyo que la API genera id
        const id = created.id!;

        // Redirige a /home
        this.router.navigate(['/home'], { queryParams: { created: id } });
      },
      error: (e) => {
        console.error('Error creando:', e);
        this.errorMsg = 'Error al crear la serie.';
        this.submitting = false;
      },
      complete: () => {
        this.submitting = false;
      }
    });
  }
}
