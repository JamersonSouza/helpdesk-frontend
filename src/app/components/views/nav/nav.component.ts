import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: [MessageService]
})
export class NavComponent implements OnInit {

  visualizarSideBar;

  constructor(private route : Router, private authService : AuthService,
    private messageService : MessageService) { }

  ngOnInit(): void {
    this.route.navigate(['home'])
  }

  logout(){
    this.route.navigate(['login']);
    this.authService.logout();
    this.messageService.add({
      severity: "info",
      summary: "Logout Account",
      detail: "Logout efetuado com sucesso."
    });
  }

}
