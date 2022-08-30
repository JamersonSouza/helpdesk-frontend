import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css'],
})
export class ClienteListComponent implements OnInit {

  listClientes: Cliente[] = [
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

  constructor(private serviceCliente : ClienteService) { }

  ngOnInit(): void {
    this.loading = false;
    this.findAll();
  }

  findAll(){
    return this.serviceCliente.findAll().subscribe(res => {
      this.listClientes = res;
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
     return this.listClientes ? this.first === (this.listClientes.length - this.rows): true;
 }

 isFirstPage(): boolean {
     return this.listClientes ? this.first === 0 : true;
 }

}
