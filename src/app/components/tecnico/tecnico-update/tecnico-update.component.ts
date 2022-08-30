import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/service/tecnico.service';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {
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
    , private router : Router, private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.tecnico.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.tecService.findById(this.tecnico.id).subscribe(resposta => {
      resposta.perfil = [];
      this.tecnico = resposta;
    })
  }

  update():void{
    this.tecService.update(this.tecnico).subscribe(() => {
      this.messageService.add({
        severity: "success",
        summary: "Atualização Técnico",
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

  addPerfil(perfil: any): void {
    if(this.tecnico.perfil.includes(perfil)) {
      this.tecnico.perfil.splice(this.tecnico.perfil.indexOf(perfil), 1);
    } else {
      this.tecnico.perfil.push(perfil);
    }
    
  }

  // addPerfil(perfil: any):void{
  //  //condição de adicionar ao clicar e remover ao desmarcar a opção clicada
  //   if(this.tecnico.perfils.includes(perfil)){
  //     this.tecnico.perfils.splice(this.tecnico.perfils.indexOf(perfil), 1)
  //   }else{
  //     this.tecnico.perfils.push(perfil);
  //   }
  //   console.log(this.tecnico.perfils)
  // }

  validaCampos(): boolean{
    if(this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid){
      return true;
    }else{
      return false;
    }
  }


}
