import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { Categoria } from '../models/categoria';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-excluir-categoria',
  templateUrl: './excluir-categoria.component.html',
  styleUrls: ['./excluir-categoria.component.scss']
})
export class ExcluirCategoriaComponent implements OnInit{
 

  categoria$!: Observable<Categoria>;
  
  constructor(private route:ActivatedRoute,private categoriaService: CategoriaService,private router:Router){

  }

  ngOnInit(): void {
    this.categoria$ = this.route.data.pipe(map(dado => dado['categoria'])); 
    }
    
    
    excluir(){
      this.route.paramMap
        .pipe
        (
          map(params => params.get('id')!),
          switchMap(id => this.categoriaService.excluir(parseInt(id)))
        ).subscribe
        ({
          next: res => this.processarSucesso(),
          error: err => this.processarErro(err)
        });


     }
  
     processarErro(error: Error): void {

  
    }
  
    processarSucesso(){
      this.router.navigate(['/categorias/listar'])
    }

}
