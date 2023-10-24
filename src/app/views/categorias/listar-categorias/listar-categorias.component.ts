import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-listar-categorias',
  templateUrl: './listar-categorias.component.html',
  styleUrls: ['./listar-categorias.component.scss']
})
export class ListarCategoriasComponent implements OnInit {

  categorias$?:Observable<Categoria[]>;


  constructor(private categoriaService: CategoriaService){}

  ngOnInit(): void {
    this.categorias$ = this.categoriaService.selecionarTodos();
  }

}
