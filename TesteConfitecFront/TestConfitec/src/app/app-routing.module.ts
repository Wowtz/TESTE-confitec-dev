import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroPessoaComponent } from './cadastro-pessoa/cadastro-pessoa.component';
import { ListaPessoasComponent } from './lista-pessoas/lista-pessoas.component';

const routes: Routes = [
  { path: 'cadastrar', component: CadastroPessoaComponent },
  { path: 'listar', component: ListaPessoasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
