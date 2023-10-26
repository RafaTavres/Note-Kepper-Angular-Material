import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { Categoria } from '../models/categoria';

@Component({
  selector: 'app-listar-categorias',
  templateUrl: './listar-categorias.component.html',
  styleUrls: ['./listar-categorias.component.scss']
})
export class ListarCategoriasComponent implements OnInit {

  categorias$?:Observable<Categoria[]>;


  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.categorias$ = this.route.data.pipe(map(dados => dados['categorias']));
  }

}
