import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/service/tecnico.service';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {


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
    this.tecnico.id = this.activatedRoute.snapshot.paramMap.get('id')
    this.findById();
  }
  findById(): void {
    this.tecService.findById(this.tecnico.id).subscribe(resposta => {
      this.tecnico.id = this.activatedRoute.snapshot.paramMap.get('id');
      this.tecnico = resposta;
    })
  }


  delete():void{
    this.tecService.delete(this.tecnico).subscribe(() => {
      this.messageService.add({
        severity: "success",
        summary: "Remoção Técnico",
        detail: "realizada com sucesso!."
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


}
