import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { Categoria } from '../models/categoria';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-inserir-categoria',
  templateUrl: './inserir-categoria.component.html',
  styleUrls: ['./inserir-categoria.component.scss']
})
export class InserirCategoriaComponent implements OnInit{
  form!: FormGroup

  constructor(private fb:FormBuilder, private categoriaService:CategoriaService, private router:Router,private notificationService: NotificationService){

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      titulo: [''],
    })
  }

  gravar():void {
      this.categoriaService.criar(this.form?.value).subscribe({
        next: res => this.processarSucesso(res),
        error: err => this.processarErro(err)
      })
  }

  processarSucesso(res: Categoria){
    this.notificationService.sucesso(`Categoria ${res.titulo} cadastrada com sucesso!`);
    this.router.navigate(['/categorias', 'listar']);
  }

  processarErro(err: any){
    this.notificationService.erro(`Erro ${err}`);
  }
}
