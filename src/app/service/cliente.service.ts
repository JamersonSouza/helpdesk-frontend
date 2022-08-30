import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../config/api.config';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http : HttpClient) { }

  findById(id: any):Observable<Cliente>{
    return this.http.get<Cliente>(`${API_URL.baseURL}/clientes/${id}`);
  }

  findAll(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${API_URL.baseURL}/clientes`);
  }

  create(cliente : Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(`${API_URL.baseURL}/clientes`, cliente)
  }
  

  update(cliente: Cliente): Observable<void>{
    return this.http.put<void>(`${API_URL.baseURL}/clientes/${cliente.id}`, cliente);
  }

  delete(cliente: Cliente): Observable<Cliente> {
    return this.http.delete<Cliente>(`${API_URL.baseURL}/clientes/${cliente.id}`);
  }
}
