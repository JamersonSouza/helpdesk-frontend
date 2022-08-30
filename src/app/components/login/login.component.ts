import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';

import { Credenciais } from 'src/app/models/credenciais';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  credenciais : Credenciais = {
    email: '',
    senha: ''
  }

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

  constructor(private messageService : MessageService,
    private service : AuthService,
    private router : Router) {}

  ngOnInit(): void {
 
  }

  login():void {
        this.service.authenticate(this.credenciais)
        .subscribe(resposta => {
          // this.messageService.add({severity: "success",
          // summary: "TOKEN", detail: resposta.headers.get('Authorization')}
          this.service.successFulLogin(resposta.headers.get('Authorization').substring(7));
          this.router.navigate(['']);
          
        }, () => {
          this.messageService.add({
              severity: "error",
              summary: "Falha ao Logar",
              detail: "Credenciais inválidas."
            });
        })
    }
    
      // this.messageService.add({
      //   severity: "error",
      //   summary: "Falha ao Logar",
      //   detail: "Credenciais inválidas."
      // });
  


  validaCampos(): boolean{
    if(this.email.valid && this.senha.valid){
      return true;
    }else {
      return false;
    }
  }

}
