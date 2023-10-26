import { inject, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';
import { ExcluirCategoriaComponent } from './excluir-categoria/excluir-categoria.component';
import { InserirCategoriaComponent } from './inserir-categoria/inserir-categoria.component';
import { ListarCategoriasComponent } from './listar-categorias/listar-categorias.component';
import { Categoria } from './models/categoria';
import { CategoriaService } from './services/categoria.service';
import { listarcategoriaResolver } from './services/listar-categorias.resolver';

  const formscategoriaResolver: ResolveFn<Categoria> = (
    route: ActivatedRouteSnapshot
  ) => {
    return inject(CategoriaService).selecionarPorId(parseInt(route.paramMap.get('id')!));
  };

const routes: Routes = [
  {
    path:'',
    redirectTo:'listar',
    pathMatch:'full'
  },
  {
    path:'listar',
    component:ListarCategoriasComponent,
    resolve: { categorias: listarcategoriaResolver}
  }
  ,
  {
    path:'inserir',
    component:InserirCategoriaComponent
  }
  ,
  {
    path:'editar/:id',
    component:EditarCategoriaComponent,
    resolve: { categoria: formscategoriaResolver },
  }
  ,
  {
    path:'excluir/:id',
    component:ExcluirCategoriaComponent,
    resolve: { categoria: formscategoriaResolver },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
