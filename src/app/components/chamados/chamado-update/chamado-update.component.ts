import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/service/chamado.service';
import { ClienteService } from 'src/app/service/cliente.service';
import { TecnicoService } from 'src/app/service/tecnico.service';

@Component({
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.css']
})
export class ChamadoUpdateComponent implements OnInit {

  clientes : Cliente[]= [];
  tecnicos: Tecnico[] = [];
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

  constructor(private chamadoService : ChamadoService, private messageService : MessageService
    , private router : Router, private activatedRoute : ActivatedRoute, private clienteService : ClienteService, 
    private tecnicoService : TecnicoService) { }

  ngOnInit(): void {
    this.chamado.id = this.activatedRoute.snapshot.paramMap.get('id')
    this.findById();
    this.findAllClientes();
    this.findAllTecnicos();
  }

  update():void{
    this.chamadoService.update(this.chamado).subscribe(resposta => {

      this.messageService.add({
        severity: "success",
        summary: "Atualização",
        detail: "Chamado Criado Com Sucesso!."
      });
      this.router.navigate(['chamados'])
    } , ex => {
      this.messageService.add({
        severity: "error",
        summary: "Erro Atualização",
        detail: "Erro na atualização do chamado"
      });
      console.log(ex);
    })
  }

  findById():void{
    this.chamadoService.findById(this.chamado.id).subscribe(resposta => {
      this.chamado = resposta;
      console.log(this.chamado);
    })
  }
  findAllClientes(): void{
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
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
