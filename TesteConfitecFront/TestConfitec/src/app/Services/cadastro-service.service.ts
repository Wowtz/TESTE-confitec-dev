import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Pessoa } from "../Model/Pessoa";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastroServiceService {

  constructor(
    private http: HttpClient
  ) { }

  private readonly baseURL = environment["endPoint"];

  cadastrar(cadastro: any) {
    return this.http.post(`${this.baseURL}/cadastrar`, cadastro);
  }

  listarUsuarios(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${this.baseURL}/listar`);
  }

  pegarPorId(id: any): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.baseURL}/buscarPorId?id=${id}`);
  }

  atualizar(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.put<Pessoa>(`${this.baseURL}/atualizar`, pessoa);
  }

  deletar(id: any): Observable<any> {
    return this.http.delete(`${this.baseURL}/excluir?id=${id}`);
  }
}
