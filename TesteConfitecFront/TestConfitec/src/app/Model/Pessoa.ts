import { Escolaridade } from './EscolaridadeEnum'

export type Pessoa = {
   id: string;
   nome: string;
   sobrenome: string;
   email: string;
   dataNascimento: Date;
   escolaridade: Escolaridade;
}