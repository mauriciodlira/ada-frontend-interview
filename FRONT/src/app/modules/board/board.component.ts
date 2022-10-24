import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * TODO - ROADMAP
 * [ ] Adicionar as colunas ao template
 * [ ] Implementar lógica de exibição dos cartões
 * [ ] Implementar service que terá lógica de negócios relacionadas
 */
@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
