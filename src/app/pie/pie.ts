import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pie',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './pie.html',
  styleUrls: ['./pie.css']
})
export class Pie {
  currentYear: number = new Date().getFullYear();

  volverArriba(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}