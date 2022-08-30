import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/service/tecnico.service';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  nome: FormControl = new FormControl(null, Validators.minLength(4));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(8));

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfil: [],
    dataCriacao: new Date().getDate
  }
  constructor(private tecService : TecnicoService, private messageService : MessageService
    , private router : Router) { }

  ngOnInit(): void {
  }

  create():void{
    this.tecService.create(this.tecnico).subscribe(() => {
      this.messageService.add({
        severity: "success",
        summary: "Cadastro",
        detail: "realizado com sucesso!."
      });
      this.router.navigate(['tecnicos'])
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
    if(this.tecnico.perfil.includes(perfil)){
      this.tecnico.perfil.splice(this.tecnico.perfil.indexOf(perfil), 1)
    }else{
      this.tecnico.perfil.push(perfil);
    }
    console.log(this.tecnico.perfil)
  }

  validaCampos(): boolean{
    if(this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid){
      return true;
    }else{
      return false;
    }
  }

}
