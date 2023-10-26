import { inject, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { Categoria } from '../categorias/models/categoria';
import { listarcategoriaResolver } from '../categorias/services/listar-categorias.resolver';
import { EditarNotasComponent } from './editar-notas/editar-notas.component';
import { ExcluirNotasComponent } from './excluir-notas/excluir-notas.component';
import { InserirNotasComponent } from './inserir-notas/inserir-notas.component';
import { ListarNotasComponent } from './listar-notas/listar-notas.component';
import { Nota } from './models/nota';
import { NotasService } from './services/nota.service';

const formsnotasResolver: ResolveFn<Nota> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(NotasService).selecionarPorId(parseInt(route.paramMap.get('id')!));
};

const listarnotasResolver: ResolveFn<Categoria[]> = () => {
  return inject(NotasService).selecionarTodos();
};
const routes: Routes = [
  {
    path:'',
    redirectTo:'listar',
    pathMatch:'full'
  },
  {
    path:'listar',
    component:ListarNotasComponent,
    resolve: {notas: listarnotasResolver}
  },
  {
    path:'inserir',
    component:InserirNotasComponent,
    resolve: {categorias: listarcategoriaResolver}
  }, 
  {
    path:'editar/:id',
    component:EditarNotasComponent,
    resolve: {categorias: listarcategoriaResolver,nota: formsnotasResolver},
    
  },
  {
    path:'excluir/:id',
    component:ExcluirNotasComponent,
    resolve: {nota: formsnotasResolver},
    
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotasRoutingModule { }
