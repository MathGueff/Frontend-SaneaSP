import { Component, inject, OnInit } from '@angular/core';
import { ComentarioBaixoComponent } from '../comentario-baixo/comentario-baixo.component';
import { ComentarioCimaComponent } from '../comentario-cima/comentario-cima.component';
import { CommonModule } from '@angular/common';
import { ComentarioInputComponent } from '../comentario-input/comentario-input.component';
import { Comentario } from '../../models/class/comentario';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Reclamacao } from '../../models/class/reclamacao';
import { UserService } from '../../Services/user.service';
import { NotFoundComponent } from '../../Common/not-found/not-found.component';

@Component({
  selector: 'app-comentario-central',
  standalone: true,
  imports: [
    CommonModule,
    ComentarioCimaComponent,
    ComentarioBaixoComponent,
    ComentarioInputComponent,
    RouterModule,
    NotFoundComponent
  ],
  templateUrl: './comentario-central.component.html',
  styleUrl: './comentario-central.component.css',
})
export class ComentarioCentralComponent implements OnInit {
  private userService = inject(UserService);

  private usuarios = this.userService.getAllUsers();

   //variaveis para poder controlar o componente NotFound
   protected vazio: boolean = true;
   erro: string = "" // mensaagem de erro
   caminhoVoltar : string = ""; //caminho para voltar para reclamação descricao


  //Observable Comentário
  private comentarioSubject: BehaviorSubject<Comentario[]> =
    new BehaviorSubject([] as any);
  comentario$: Observable<Comentario[]> = this.comentarioSubject.asObservable();

  //Observable Reclamacao
  private reclamacaoSubject: BehaviorSubject<Reclamacao> = new BehaviorSubject(
    Reclamacao as any
  );
  reclamacao$: Observable<Reclamacao> = this.reclamacaoSubject.asObservable();

  //Array para os objetos de Reclamação
  reclamacoes: Reclamacao [] = [
    {
      id: 1,
      titulo: "Falta de abastecimento de água",
      descricao: "Há três dias o bairro está sem água, afetando diversas famílias. A situação está insustentável, pois as pessoas não conseguem realizar atividades básicas como cozinhar, tomar banho ou lavar roupas. Entramos em contato com a companhia de saneamento, mas até agora não houve retorno sobre o motivo da interrupção ou previsão de normalização.",
      data: new Date("2024-11-28"),
      Tag: ["Abastecimento"],
      Imagem : ["img/paginas/reclamacoes/user1.jpg"],
      Usuario :{
        id: 1,
        nome: 'Matheus',
        email: 'gueff@gmail.com',
        senha: 'math',
        endereco:{
          cep: '18075718',
          bairro : 'Jardim Brasilândia',
          logradouro : 'Rua Alonco Muchon',
          cidade : 'Sorocaba'
        }
      },
      pontuacao: 200,
      status : 1
    }
  ];

  //Array para os objetos de Comentario
  comentarios: Comentario[] = [
    {
    id: 1,
    descricaoComentario: "Estamos há três dias sem água no bairro, precisamos de uma solução urgente.",
    dataComentario: "2024-11-28T10:00:00",
    objAdmin: null,
    objReclamacao: this.reclamacoes[0],
    objUsuario: this.usuarios[0]
  },
  {
    id: 2,
    descricaoComentario: "Olá, João. Estamos cientes do problema e nossa equipe está trabalhando para resolver. A previsão é que o abastecimento normalize até o final do dia.",
    dataComentario: "2024-11-28T11:00:00",
    objAdmin: "Carlos Almeida",
    objReclamacao: this.reclamacoes[0],
    objUsuario: this.usuarios[0]
  },
  {
    id: 3,
    descricaoComentario: "Obrigado pela resposta, espero que normalizem mesmo, pois está difícil sem água.",
    dataComentario: "2024-11-28T12:00:00",
    objAdmin: null,
    objReclamacao: this.reclamacoes[0],
    objUsuario: this.usuarios[0]
  },
  {
    id: 4,
    descricaoComentario: "Tem um vazamento de esgoto na minha rua há dias e ninguém resolve. O cheiro está insuportável.",
    dataComentario: "2024-11-27T09:00:00",
    objAdmin: null,
    objReclamacao: this.reclamacoes[1],
    objUsuario: this.usuarios[1]
  },
  {
    id: 5,
    descricaoComentario: "Maria, agradecemos pelo aviso. Já acionamos a equipe de manutenção para verificar o vazamento. Vamos manter você informada.",
    dataComentario: "2024-11-27T10:00:00",
    objAdmin: "Carlos Almeida",
    objReclamacao: this.reclamacoes[1],
    objUsuario: this.usuarios[1]
  },
  {
    id: 6,
    descricaoComentario: "Espero que resolvam logo, pois está muito ruim aqui.",
    dataComentario: "2024-11-27T11:00:00",
    objAdmin: null,
    objReclamacao: this.reclamacoes[1],
    objUsuario: this.usuarios[1]
  },
  {
    id: 7,
    descricaoComentario: "A água está com cheiro forte e cor amarela. O que está acontecendo?",
    dataComentario: "2024-11-25T08:00:00",
    objAdmin: null,
    objReclamacao: this.reclamacoes[3],
    objUsuario: this.usuarios[3]
  },
  {
    id: 8,
    descricaoComentario: "Ana Paula, pedimos desculpas pelo transtorno. Houve um problema na estação de tratamento e já estamos corrigindo. Não consuma a água por enquanto.",
    dataComentario: "2024-11-25T09:00:00",
    objAdmin: "Carlos Almeida",
    objReclamacao: this.reclamacoes[3],
    objUsuario: this.usuarios[3]
  },
  {
    id: 9,
    descricaoComentario: "Obrigada pela explicação. Vou aguardar mais informações.",
    dataComentario: "2024-11-25T10:00:00",
    objAdmin: null,
    objReclamacao: this.reclamacoes[3],
    objUsuario: this.usuarios[3]
  }
  ];

  //Objeto Reclamação para colocar no título, data e descrição
  constructor(private activeroute: ActivatedRoute) {}
  ngOnInit(): void {
    this.activeroute.params.subscribe((params) => {
      // pega o valor do parametro da URL da Reclamação
      const IdParametro = Number(params['idReclamamacao']);

      // procura se existe uma reclamação com esse ID, caso não ache, retorna undefield
      const reclamacao = this.reclamacoes.find(
        (reclamacao) => reclamacao.id === IdParametro
      );

if(reclamacao !== undefined) {
        //Filtra todos os comentários de acordo com o ID da objReclamação e retorna uma Array
        const comentario = this.comentarios.filter(
          (comentario) => comentario.objReclamacao.id === IdParametro
        )
        if(comentario.length > 0) {
          //atualiza os obseblTaes
          this.comentarioSubject.next(comentario);
          this.reclamacaoSubject.next(reclamacao);
          this.vazio = false;
        } else {
   this.caminhoVoltar = "../../reclamacao/reclamacao-descricao/" + IdParametro;
          this.vazio = true;
        }
      } else {
        this.erro = "reclamação";
        this.caminhoVoltar = "../../reclamacao";
        this.vazio = true;
      }
    });
  }
}
