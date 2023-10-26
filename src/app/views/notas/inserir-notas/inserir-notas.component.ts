import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { Categoria } from '../../categorias/models/categoria';
import { CategoriaService } from '../../categorias/services/categoria.service';
import { NotasService } from '../services/nota.service';


@Component({
  selector: 'app-inserir-notas',
  templateUrl: './inserir-notas.component.html',
  styleUrls: ['./inserir-notas.component.scss']
})
export class InserirNotasComponent implements OnInit{
  form!: FormGroup
  categorias$?: Observable<Categoria[]>
  constructor(
    private fb:FormBuilder, 
    private notasService:NotasService, 
    private router:Router,
    private route:ActivatedRoute,
    private notificationService: NotificationService){

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      titulo: ['',[Validators.required]],
      conteudo: [''],
      tema: [''],

      categoriaId: [undefined,[Validators.required]],
    })

    this.categorias$ = this.route.data.pipe(map(dados => dados['categorias']))
  }

  gravar():void {
      this.notasService.criar(this.form?.value).subscribe({
        next: res => this.processarSucesso(res),
        error: err => this.processarErro(err)
      })
  }

  processarSucesso(res: Categoria){
    this.notificationService.sucesso(`Nota ${res.titulo} cadastrada com sucesso!`);
    this.router.navigate(['/notas', 'listar']);
  }

  processarErro(err: any){
    this.notificationService.erro(`Erro ${err}`);
  }
}
