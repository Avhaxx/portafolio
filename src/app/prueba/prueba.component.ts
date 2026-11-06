import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-prueba',
  imports: [],
  templateUrl: './prueba.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './prueba.component.css'
})
export class PruebaComponent {
  ngOnInit(): void {
    console.log('El script mínimo se está ejecutando en el componente prueba.');
  }

}
