import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private route : Router, private authService : AuthService,
    private messageService : MessageService) { }

  ngOnInit(): void {
  }
  logoutTest(){
   
    this.messageService.add({severity:'info', summary:'Logout', detail:'Logout efetuado com sucesso!'})
    this.route.navigate(['login']);
    this.authService.logout();
    }
}
