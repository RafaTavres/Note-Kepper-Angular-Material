import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, map, Observable } from 'rxjs';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { Nota } from '../models/nota';
import { NotasService } from '../services/nota.service';

@Component({
  selector: 'app-excluir-notas',
  templateUrl: './excluir-notas.component.html',
  styleUrls: ['./excluir-notas.component.scss']
})
export class ExcluirNotasComponent implements OnInit{

  nota$?:Observable<Nota>

  constructor(
    private notasService:NotasService, 
    private router:Router,
    private route:ActivatedRoute,
    private notificationService: NotificationService){

  }


  ngOnInit(): void {
    this.nota$ = this.route.data.pipe(map(dados => dados['nota']))
  }

  excluir(){
    this.route.paramMap
        .pipe
        (
          map(params => params.get('id')!),
          switchMap(id => this.notasService.excluir(parseInt(id)))
        ).subscribe
        ({
          next: res => this.processarSucesso(),
          error: err => this.processarErro(err)
        });  
  }

  processarSucesso(){
    this.notificationService.sucesso(`Nota excluida com sucesso!`);
    this.router.navigate(['/notas', 'listar']);
  }

  processarErro(err: Error){
    this.notificationService.erro(`Erro: ${err.message}`);
  }
}
