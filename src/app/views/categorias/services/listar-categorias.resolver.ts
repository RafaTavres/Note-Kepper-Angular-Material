import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { Categoria } from "../models/categoria";
import { CategoriaService } from "./categoria.service";

export const listarcategoriaResolver: ResolveFn<Categoria[]> = () => {
    return inject(CategoriaService).selecionarTodos();
  };