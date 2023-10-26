import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Nota } from "../models/nota";

@Injectable()

export class NotasService{
    private API_URL = `${environment.API_URL}notas`;

  constructor(private http: HttpClient) {}

  criar(Nota: Nota): Observable<Nota> {
    return this.http.post<Nota>(this.API_URL, Nota);
  }

  editar(id:number, Nota: Nota): Observable<Nota> {
    const url = `${this.API_URL}/${id}`;

    return this.http.put<Nota>(url, Nota);
  }

  excluir(id: number): Observable<any> {
    const url = `${this.API_URL}/${id}`;

    return this.http.delete<Nota>(url);
  }

  selecionarPorId(id: number): Observable<Nota> {
    const url = `${this.API_URL}/${id}?_expand=categoria`;

    return this.http.get<Nota>(url);
  }

  selecionarTodos(): Observable<Nota[]> {
    return this.http.get<Nota[]>(this.API_URL);
  }
}