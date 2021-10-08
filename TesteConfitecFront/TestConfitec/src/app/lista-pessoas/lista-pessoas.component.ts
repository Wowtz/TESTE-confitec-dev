import { Component, OnInit } from '@angular/core';
import { Escolaridade } from '../Model/EscolaridadeEnum';
import { Pessoa } from '../Model/Pessoa';
import { CadastroServiceService } from '../Services/cadastro-service.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AtualizarPessoaComponent } from '../atualizar-pessoa/atualizar-pessoa.component';

@Component({
  selector: 'app-lista-pessoas',
  templateUrl: './lista-pessoas.component.html',
  styleUrls: ['./lista-pessoas.component.scss']
})
export class ListaPessoasComponent implements OnInit {

  escolaridadeEnum = Escolaridade;
  pessoasLista?: Pessoa[];
  pessoaAtt!: Pessoa;

  constructor(
    private pessoaService: CadastroServiceService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.atualizarLista();
  }

  atualizarLista(): void {
    this.pessoaService.listarUsuarios()
      .subscribe(
        data => {
          this.pessoasLista = data;
          console.log(data);
        });
  }

  deletar(id: any): void {
    this.pessoaService.deletar(id)
      .subscribe(
        data => {
          console.log(data);
          this.atualizarLista();
        });
  }

  editar(id: any): void {
    this.pessoaService.pegarPorId(id)
      .subscribe(
        data => {
          this.pessoaAtt = data;
          this.atualizarPessoa();
        });
  }

  atualizarPessoa(): void {
    const dialogRef = this.dialog.open(AtualizarPessoaComponent, {
      data: this.pessoaAtt
    });

    dialogRef.afterClosed().subscribe(result => {
      this.atualizarLista();
    });
  }

}
