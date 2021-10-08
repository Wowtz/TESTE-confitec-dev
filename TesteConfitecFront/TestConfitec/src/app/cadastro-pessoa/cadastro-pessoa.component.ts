import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CadastroServiceService } from '../Services/cadastro-service.service';
import { Escolaridade } from '../Model/EscolaridadeEnum';
import { Pessoa } from '../Model/Pessoa';

@Component({
  selector: 'app-cadastro-pessoa',
  templateUrl: './cadastro-pessoa.component.html',
  styleUrls: ['./cadastro-pessoa.component.scss']
})
export class CadastroPessoaComponent implements OnInit {

  cadastroForm!: FormGroup;
  enumsEscolaridade = Escolaridade;
  enumKeys: any[];
  invalidForm: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private cadastroSevice: CadastroServiceService
  ) {
    this.enumKeys = Object.keys(this.enumsEscolaridade).filter(k => !isNaN(Number(k))).map(Number);
    this.cadastroForm = this.formBuilder.group(
      {
        nome: ['', [Validators.required]],
        sobrenome: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        dataNascimento: ['', [Validators.required, this.dataValidator]],
        escolaridade: ['', [Validators.required]],
      }
    );
  }

  ngOnInit(): void {
  }

  cadastrar() {
    if(this.cadastroForm.invalid){
      return this.invalidForm = true;
    }
    var cadastro = this.cadastroForm.getRawValue() as Pessoa;

    this.cadastroSevice.cadastrar(cadastro)
      .subscribe(
        data => {
          console.log(data)
          return this.invalidForm = false;
        })
    alert("Cadastro criado com sucesso")
    return this.invalidForm = false;
  }

  dataValidator(control: AbstractControl): { [key: string]: boolean } | null {
    let date = new Date(control.value);
    let hoje = new Date();

    if (isNaN(date.getFullYear()) || hoje <= date) {
        return { 'dataValidator': true };
    }
    return null;
  }
}
