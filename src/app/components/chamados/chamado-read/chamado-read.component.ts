import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/service/chamado.service';
import { ClienteService } from 'src/app/service/cliente.service';
import { TecnicoService } from 'src/app/service/tecnico.service';

@Component({
  selector: 'app-chamado-read',
  templateUrl: './chamado-read.component.html',
  styleUrls: ['./chamado-read.component.css']
})
export class ChamadoReadComponent implements OnInit {
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

  constructor(private chamadoService : ChamadoService, private messageService : MessageService
    , private router : Router, private activatedRoute : ActivatedRoute, private clienteService : ClienteService, 
    private tecnicoService : TecnicoService) { }

  ngOnInit(): void {
    this.chamado.id = this.activatedRoute.snapshot.paramMap.get('id')
    this.findById();
    this.findAllClientes();
    this.findAllTecnicos();
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


  
}
