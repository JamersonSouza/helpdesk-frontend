import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {
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
    , private router : Router, private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.cliente.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.clienteService.findById(this.cliente.id).subscribe(resposta => {
      resposta.perfil = [];
      this.cliente = resposta;
    })
  }

  update():void{
    this.clienteService.update(this.cliente).subscribe(() => {
      this.messageService.add({
        severity: "success",
        summary: "Atualização Cliente",
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

  addPerfil(perfil: any): void {
    if(this.cliente.perfil.includes(perfil)) {
      this.cliente.perfil.splice(this.cliente.perfil.indexOf(perfil), 1);
    } else {
      this.cliente.perfil.push(perfil);
    }
    
  }

  // addPerfil(perfil: any):void{
  //  //condição de adicionar ao clicar e remover ao desmarcar a opção clicada
  //   if(this.cliente.perfils.includes(perfil)){
  //     this.cliente.perfils.splice(this.cliente.perfils.indexOf(perfil), 1)
  //   }else{
  //     this.cliente.perfils.push(perfil);
  //   }
  //   console.log(this.cliente.perfils)
  // }

  validaCampos(): boolean{
    if(this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid){
      return true;
    }else{
      return false;
    }
  }


}
