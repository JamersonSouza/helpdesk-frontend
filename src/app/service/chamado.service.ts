import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../config/api.config';
import { Chamado } from '../models/chamado';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  constructor(private http: HttpClient) { }

  findById(id : any):Observable<Chamado>{
    return this.http.get<Chamado>(`${API_URL.baseURL}/chamados/${id}`)
  }

  findAll(): Observable<Chamado[]>{
    return this.http.get<Chamado[]>(`${API_URL.baseURL}/chamados`);
  }

  create(chamado: Chamado):Observable<Chamado>{
    return this.http.post<Chamado>(`${API_URL.baseURL}/chamados`, chamado);
  }
  
  update(chamado : Chamado): Observable<void>{
    return this.http.put<void>(`${API_URL.baseURL}/chamados/${chamado.id}`, chamado);
  }
}
