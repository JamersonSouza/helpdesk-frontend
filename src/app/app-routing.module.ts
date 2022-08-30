import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ChamadoCreateComponent } from './components/chamados/chamado-create/chamado-create.component';
import { ChamadoListComponent } from './components/chamados/chamado-list/chamado-list.component';
import { ChamadoReadComponent } from './components/chamados/chamado-read/chamado-read.component';
import { ChamadoUpdateComponent } from './components/chamados/chamado-update/chamado-update.component';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { ClienteDeleteComponent } from './components/cliente/cliente-delete/cliente-delete.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { LoginComponent } from './components/login/login.component';
import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';
import { TecnicoDeleteComponent } from './components/tecnico/tecnico-delete/tecnico-delete.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { TecnicoUpdateComponent } from './components/tecnico/tecnico-update/tecnico-update.component';
import { HomeComponent } from './components/views/home/home.component';
import { NavComponent } from './components/views/nav/nav.component';

const routes: Routes = [
  {
    path: '',
    component: NavComponent, canActivate: [AuthGuard] ,children: [ {path: 'home', component: HomeComponent},
    {path: 'tecnicos', component: TecnicoListComponent},
    {path: 'tecnicos/create', component: TecnicoCreateComponent},
    {path: 'tecnicos/update/:id', component: TecnicoUpdateComponent},
    {path: 'tecnicos/delete/:id', component: TecnicoDeleteComponent},

    {path: 'clientes', component: ClienteListComponent},
    {path: 'clientes/create', component: ClienteCreateComponent},
    {path: 'clientes/update/:id', component: ClienteUpdateComponent},
    {path: 'clientes/delete/:id', component: ClienteDeleteComponent},

    {path: 'chamados', component: ChamadoListComponent},
    {path: 'chamados/create', component: ChamadoCreateComponent},
    {path: 'chamados/update/:id', component: ChamadoUpdateComponent},
    {path: 'chamados/read/:id', component: ChamadoReadComponent},
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
