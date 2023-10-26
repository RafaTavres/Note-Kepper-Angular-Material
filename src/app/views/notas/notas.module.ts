import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotasRoutingModule } from './notas-routing.module';
import { ListarNotasComponent } from './listar-notas/listar-notas.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExcluirNotasComponent } from './excluir-notas/excluir-notas.component';
import { EditarNotasComponent } from './editar-notas/editar-notas.component';
import { InserirNotasComponent } from './inserir-notas/inserir-notas.component';
import { NotasService } from './services/nota.service';
import { CategoriasModule } from '../categorias/categorias.module';


@NgModule({
  declarations: [
    ListarNotasComponent,
    ExcluirNotasComponent,
    EditarNotasComponent,
    InserirNotasComponent
  ],
  imports: [
    NotasRoutingModule,
    SharedModule,
    CategoriasModule
  ],
  providers:[NotasService]
})
export class NotasModule { }
