import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../models/categoria';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-excluir-categoria',
  templateUrl: './excluir-categoria.component.html',
  styleUrls: ['./excluir-categoria.component.scss']
})
export class ExcluirCategoriaComponent implements OnInit{
 

  categoria!: Categoria;
  idSelecionado!:number;
  
  constructor(private route:ActivatedRoute,private categoriaService: CategoriaService,private router:Router){

  }

  ngOnInit(): void {
  
    this.idSelecionado = parseInt(this.route.snapshot.paramMap.get('id')!);
  
    this.categoria = this.route.snapshot.data['categoria']; 
  
    }
    
    
    excluir(){
      this.categoriaService.excluir(this.idSelecionado!).subscribe( 
        {
        next:(res: Categoria) => this.processarSucesso(),
        error: (error: Error) => this.processarErro(error)
      })
     }
  
     processarErro(error: Error): void {

  
    }
  
    processarSucesso(){
      this.router.navigate(['/categorias/listar'])
    }

}
