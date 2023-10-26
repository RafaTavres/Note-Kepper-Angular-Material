import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, map, tap, switchMap } from 'rxjs';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { Categoria } from '../../categorias/models/categoria';
import { Nota } from '../models/nota';
import { NotasService } from '../services/nota.service';

@Component({
  selector: 'app-editar-notas',
  templateUrl: './editar-notas.component.html',
  styleUrls: ['./editar-notas.component.scss']
})
export class EditarNotasComponent implements OnInit{
  form!: FormGroup
  categorias$?: Observable<Categoria[]>
  nota$?: Observable<Nota>

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


    this.categorias$ = this.route.data.pipe(
      tap((dados) => this.form.patchValue(dados['nota'])),
      map((dados) => dados['categorias'] as Categoria[])
    
      )
    
  }


  gravar():void {
      this.route.paramMap.pipe(
        map(params => parseInt(params.get('id')!)),
        switchMap(id => this.notasService.editar(id,this.form?.value)),
      )
      .subscribe({
        next: res => this.processarSucesso(res),
        error: err => this.processarErro(err)
      });  
  }

  processarSucesso(res: Categoria){
    this.notificationService.sucesso(`Nota ${res.titulo} editada com sucesso!`);
    this.router.navigate(['/notas', 'listar']);
  }

  processarErro(err: any){
    this.notificationService.erro(`Erro: ${err}`);
  }
}
