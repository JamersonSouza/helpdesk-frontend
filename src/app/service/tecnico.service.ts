import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../config/api.config';
import { Tecnico } from '../models/tecnico';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  constructor(private http : HttpClient) { }

  findById(id: any):Observable<Tecnico>{
    return this.http.get<Tecnico>(`${API_URL.baseURL}/tecnicos/${id}`);
  }

  findAll(): Observable<Tecnico[]>{
    return this.http.get<Tecnico[]>(`${API_URL.baseURL}/tecnicos`);
  }

  create(tecnico : Tecnico):Observable<Tecnico>{
    return this.http.post<Tecnico>(`${API_URL.baseURL}/tecnicos`, tecnico)
  }
  

  update(tecnico: Tecnico): Observable<void>{
    return this.http.put<void>(`${API_URL.baseURL}/tecnicos/${tecnico.id}`, tecnico);
  }

  delete(tecnico: Tecnico): Observable<Tecnico> {
    return this.http.delete<Tecnico>(`${API_URL.baseURL}/tecnicos/${tecnico.id}`);
  }
}
