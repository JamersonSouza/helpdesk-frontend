import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/service/tecnico.service';

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css'],
})
export class TecnicoListComponent implements OnInit {

  listTecnicos: Tecnico[] = [
    // {
    //   id: 1,
    //   nome: 'teste',
    //   cpf: '123.456.789.10',
    //   email: 'email-teste@gmail.com',
    //   senha: '12345678989',
    //   perfils: ['0'],
    //   dataCriacao: '20/05/2022'
    // }
   ]


   statuses: any[];

   loading: boolean = true;

   activityValues: number[] = [0, 100];
   first = 0;

   rows = 5;

  constructor(private serviceTecnico : TecnicoService) { }

  ngOnInit(): void {
    this.loading = false;
    this.findAll();
  }

  findAll(){
    return this.serviceTecnico.findAll().subscribe(res => {
      this.listTecnicos = res;
    })
  }
  

  clear(table: Table) {
    table.clear();
    }

 next() {
   this.first = this.first + this.rows;
 }

 prev() {
   this.first = this.first - this.rows;
 }

 reset() {
     this.first = 0;
 }

 isLastPage(): boolean {
     return this.listTecnicos ? this.first === (this.listTecnicos.length - this.rows): true;
 }

 isFirstPage(): boolean {
     return this.listTecnicos ? this.first === 0 : true;
 }

}
