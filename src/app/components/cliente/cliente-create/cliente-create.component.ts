import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  nome: FormControl = new FormControl(null, Validators.minLength(4));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(8));

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
    , private router : Router) { }

  ngOnInit(): void {
  }

  create():void{
    this.clienteService.create(this.cliente).subscribe(() => {
      this.messageService.add({
        severity: "success",
        summary: "Cadastro",
        detail: "realizado com sucesso!."
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

  addPerfil(perfil: any):void{
   //condição de adicionar ao clicar e remover ao desmarcar a opção clicada
    if(this.cliente.perfil.includes(perfil)){
      this.cliente.perfil.splice(this.cliente.perfil.indexOf(perfil), 1)
    }else{
      this.cliente.perfil.push(perfil);
    }
    console.log(this.cliente.perfil)
  }

  validaCampos(): boolean{
    if(this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid){
      return true;
    }else{
      return false;
    }
  }

}
