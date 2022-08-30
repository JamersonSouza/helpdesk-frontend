import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Chamado } from 'src/app/models/chamado';
import { ChamadoService } from 'src/app/service/chamado.service';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent implements OnInit {

  listChamados: Chamado[] = [];
  statuses: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];
  first = 0;

  rows = 5;

  constructor(private chamadoService : ChamadoService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(){

    this.chamadoService.findAll().subscribe(resposta => {
        this.listChamados = resposta;
    })
  }

  retornaStatus(status: any): string{
    if(status == 0 ){
      return 'ABERTO'
    }else if(status == 1){
      return 'EM ANDAMENTO'
    }else{
      return 'ENCERRADO'
    }
  }

  retornaPrioridade(prioridade: any): string{
    if(prioridade == 0){
      return 'BAIXA'
    }else if(prioridade == 1){
      return 'MÉDIA'
    }else{
      return 'ALTA'
    }
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
     return this.listChamados ? this.first === (this.listChamados.length - this.rows): true;
 }

 isFirstPage(): boolean {
     return this.listChamados ? this.first === 0 : true;
 }

}
