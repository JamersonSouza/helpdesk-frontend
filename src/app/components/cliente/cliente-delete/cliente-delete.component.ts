import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {


  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfil: [],
    dataCriacao: new Date().getDate
  }
  constructor(private clienteService : ClienteService, private messageService : MessageService
    , private router : Router, private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.cliente.id = this.activatedRoute.snapshot.paramMap.get('id')
    this.findById();
  }
  findById(): void {
    this.clienteService.findById(this.cliente.id).subscribe(resposta => {
      this.cliente.id = this.activatedRoute.snapshot.paramMap.get('id');
      this.cliente = resposta;
    })
  }


  delete():void{
    this.clienteService.delete(this.cliente).subscribe(() => {
      this.messageService.add({
        severity: "success",
        summary: "Remoção Cliente",
        detail: "realizada com sucesso!."
      });
      this.router.navigate(['clientes'])
    }, ex => {
      console.log(ex)
        //pegando um array de errors ou somente 1 único erro encontrado
         if(ex.error.errorsValidations){
           ex.error.errorsValidations.forEach(element => {
             //percorrendo array e mostrando todos os errors
             this.messageService.add({
               severity: "error",
               summary: "Error de validação",
               detail: element.message
             });
           });
         }else{
        //   //mostrando um único erro
          this.messageService.add({
            severity: "error",
            summary: "Error de validação",
            detail: ex.error.message
          });

        }
    })
  }


}
