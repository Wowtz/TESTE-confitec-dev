import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListaPessoasComponent } from '../lista-pessoas/lista-pessoas.component';
import { Escolaridade } from '../Model/EscolaridadeEnum';
import { Pessoa } from '../Model/Pessoa';
import { CadastroServiceService } from '../Services/cadastro-service.service';

@Component({
  selector: 'app-atualizar-pessoa',
  templateUrl: './atualizar-pessoa.component.html',
  styleUrls: ['./atualizar-pessoa.component.scss']
})
export class AtualizarPessoaComponent implements OnInit {

  pessoa!: Pessoa;
  cadastroForm: FormGroup;
  enumsEscolaridade = Escolaridade;
  enumKeys!: any[];
  dt = this.data.dataNascimento;

  constructor(
    public dialogRef: MatDialogRef<ListaPessoasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pessoa,
    private formBuilder: FormBuilder,
    private pessoaService: CadastroServiceService,
  ) {
    this.enumKeys = Object.keys(this.enumsEscolaridade).filter(k => !isNaN(Number(k))).map(Number);
    console.log(data)
    this.cadastroForm = this.formBuilder.group(
      {
        nome: [data.nome, [Validators.required]],
        sobrenome: [data.sobrenome, [Validators.required]],
        email: [data.email, [Validators.required, Validators.email]],
        dataNascimento: [data.dataNascimento, [Validators.required, this.dataValidator]],
        escolaridade: [data.escolaridade, [Validators.required]],
      }
    );
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

  dataValidator(control: AbstractControl): { [key: string]: boolean } | null {
    let date = new Date(control.value);
    let hoje = new Date();

    if (isNaN(date.getFullYear()) || hoje <= date) {
        return { 'dataValidator': true };
    }
    return null;
  }

  atualizar(pessoa: Pessoa): void {
    pessoa = this.cadastroForm.getRawValue() as Pessoa;
    pessoa.id = this.data.id;

    this.pessoaService.atualizar(pessoa)
      .subscribe(
        data => {
          console.log(data)
        });

    this.close();
  }
}
