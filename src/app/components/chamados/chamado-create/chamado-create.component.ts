import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/service/chamado.service';
import { ClienteService } from 'src/app/service/cliente.service';
import { TecnicoService } from 'src/app/service/tecnico.service';


@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})



export class ChamadoCreateComponent implements OnInit {

  clientes : Cliente[]= [];
  tecnicos: Tecnico[] = [];
  chamados: Chamado[] = [];
  chamado: Chamado = {
    prioridade:  '',
    status:      '',
    titulo:      '',
    observacoes: '',
    tecnico:     '',
    cliente:     '',
    nomeCliente: '',
    nomeTecnico: '',
  }

  prioridadeChamado: FormControl = new FormControl(null, Validators.required);
  statusChamado: FormControl = new FormControl(null, Validators.required);
  titulo: FormControl = new FormControl(null,Validators.required);
  observacoes: FormControl = new FormControl(null, Validators.required);
  tecnico: FormControl = new FormControl(null, Validators.required);
  cliente: FormControl = new FormControl(null, Validators.required);


  constructor(private clienteService : ClienteService, private tecnicoService : TecnicoService,
    private chamadoService : ChamadoService, private messageService : MessageService, 
    private route : Router) {}

  ngOnInit(): void {
    this.findAllClientes();
    this.findAllTecnicos();
    this.findAllChamados();
  }

  create():void{
    this.chamadoService.create(this.chamado).subscribe(resposta => {
      this.messageService.add({
        severity: "success",
        summary: "NOVO CHAMADO",
        detail: "Chamado Criado Com Sucesso!."
      });
      this.route.navigate(['chamados']);
    }, ex => {
      console.log(ex)
      this.messageService.add({
        severity: "error",
        summary: "Erro ao Criar Chamado",
        detail: ex.error.error
      });
    })
  }

  findAllClientes(): void{
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    })
  }

  findAllChamados():void{
    this.chamadoService.findAll().subscribe(resposta => {
      this.chamados = resposta;
      console.log(this.chamados);
    })
  }

  findAllTecnicos(): void{
    this.tecnicoService.findAll().subscribe(resposta => {
        this.tecnicos = resposta;
    })
  }
  

  validaCampos(): boolean{
    if(this.prioridadeChamado.valid && this.statusChamado.valid && this.titulo.valid
      && this.observacoes.valid && this.tecnico.valid && this.cliente.valid){
        return true;
      }else{
        return false;
      }
  }

  
}