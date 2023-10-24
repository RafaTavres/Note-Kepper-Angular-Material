import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../models/categoria';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.scss']
})
export class EditarCategoriaComponent implements OnInit{
  
  form!: FormGroup
  categoriaSelecionada!:Categoria
  idSelecionado!:number;

  constructor(private fb:FormBuilder, private categoriaService:CategoriaService, private router:Router,private route: ActivatedRoute){

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      titulo: [''],
    })
    this.idSelecionado =parseInt(this.route.snapshot.paramMap.get('id')!);

    this.categoriaSelecionada = this.route.snapshot.data['categoria']; 
  }

  gravar():void {
      this.categoriaService.editar(this.idSelecionado,this.form?.value).subscribe({
        next: res => this.processarSucesso(res),
        error: err => this.processarErro(err)
      })
  }

  processarSucesso(res: Categoria){
    console.clear()
    console.log(res);
    this.router.navigate(['/categorias', 'listar']);
  }

  processarErro(err: any){
    console.error('Erro:', err);
  }
}
