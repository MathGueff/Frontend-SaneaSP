import { Component } from '@angular/core';
import { IComment } from '@features/denuncia/models/comment.model';
import { ComplaintStatus } from '@features/denuncia/models/complaint.model';

@Component({
    selector: 'app-complaint-feedback',
    imports: [],
    templateUrl: './complaint-feedback.component.html',
    styleUrl: './complaint-feedback.component.css'
})
export class ComplaintFeedbackComponent {
  protected MAX_COMMENTS = 6;
  descricao:string = "Fiquei impressionado com a rapidez e a eficiência na solução do problema que relatei. O esgoto irregular que denunciei foi removido, e agora a região está limpa e segura. Acompanhar o processo pelo sistema foi simples e transparente. Agradeço à equipe responsável e espero que continuem mantendo esse nível de atenção às denúncias da comunidade."
  protected comments: IComment[] = [
  //{
  //   id: 1,
  //   descricao: "Produto chegou quebrado.",
  //   dataPublicacao: "2025-09-30",
  //   denuncia: {
  //     id: 201,
  //     titulo: "Produto danificado",
  //     descricao: "Recebi o produto com a tela trincada.",
  //     dataPublicacao: "2025-09-29",
  //     status: ComplaintStatus.Aberto,
  //     pontuacao: 1,
  //     endereco: {
  //       cep: "12345-678",
  //       logradouro: "Rua das Flores",
  //       bairro: "Centro",
  //       cidade: "São Paulo"
  //     },
  //     usuario: {
  //       nome: "João Silva",
  //       senha: "joaos123",
  //       email: "joao.silva@example.com"
  //     }
  //   },
  //   usuario: {
  //     nome: "João Silva",
  //     senha: "joaos123",
  //     email: "joao.silva@example.com"
  //   }
  // },
  // {
  //   id: 2,
  //   descricao: "Demora na entrega.",
  //   dataPublicacao: "2025-09-28",
  //   denuncia: {
  //     id: 202,
  //     titulo: "Atraso na entrega",
  //     descricao: "O pedido demorou 10 dias além do prazo.",
  //     dataPublicacao: "2025-09-26",
  //     status: ComplaintStatus.Analise,
  //     pontuacao: 2,
  //     endereco: {
  //       cep: "87654-321",
  //       logradouro: "Avenida Brasil",
  //       bairro: "Jardim",
  //       cidade: "Rio de Janeiro"
  //     },
  //     usuario: {
  //       nome: "Maria Oliveira",
  //       senha: "mariao456",
  //       email: "maria.oliveira@example.com"
  //     }
  //   },
  //   usuario: {
  //     nome: "Maria Oliveira",
  //     senha: "mariao456",
  //     email: "maria.oliveira@example.com"
  //   }
  // },
  // {
  //   id: 3,
  //   descricao: "Cobrança indevida no cartão.",
  //   dataPublicacao: "2025-09-25",
  //   denuncia: {
  //     id: 203,
  //     titulo: "Cobrança duplicada",
  //     descricao: "Fui cobrado duas vezes pelo mesmo pedido.",
  //     dataPublicacao: "2025-09-24",
  //     status: ComplaintStatus.Visualizada,
  //     pontuacao: 1,
  //     endereco: {
  //       cep: "45678-901",
  //       logradouro: "Rua das Palmeiras",
  //       bairro: "Vila Nova",
  //       cidade: "Belo Horizonte"
  //     },
  //     usuario: {
  //       nome: "Carlos Dias",
  //       senha: "carlos123",
  //       email: "carlos.dias@example.com"
  //     }
  //   },
  //   usuario: {
  //     nome: "Carlos Dias",
  //     senha: "carlos123",
  //     email: "carlos.dias@example.com"
  //   }
  // },
  // {
  //   id: 4,
  //   descricao: "Produto diferente do anunciado.",
  //   dataPublicacao: "2025-09-22",
  //   denuncia: {
  //     id: 204,
  //     titulo: "Produto errado",
  //     descricao: "Comprei um celular e recebi um carregador.",
  //     dataPublicacao: "2025-09-20",
  //     status: ComplaintStatus.Aberto,
  //     pontuacao: 1,
  //     endereco: {
  //       cep: "65432-109",
  //       logradouro: "Rua do Comércio",
  //       bairro: "Industrial",
  //       cidade: "Curitiba"
  //     },
  //     usuario: {
  //       nome: "Fernanda Costa",
  //       senha: "fcosta456",
  //       email: "fernanda.costa@example.com"
  //     }
  //   },
  //   usuario: {
  //     nome: "Fernanda Costa",
  //     senha: "fcosta456",
  //     email: "fernanda.costa@example.com"
  //   }
  // },
  // {
  //   id: 5,
  //   descricao: "Atendimento ruim pelo suporte.",
  //   dataPublicacao: "2025-09-20",
  //   denuncia: {
  //     id: 205,
  //     titulo: "Suporte ineficiente",
  //     descricao: "Fiquei mais de 1 hora esperando no chat.",
  //     dataPublicacao: "2025-09-19",
  //     status: ComplaintStatus.Analise,
  //     pontuacao: 2,
  //     endereco: {
  //       cep: "78901-234",
  //       logradouro: "Rua A",
  //       bairro: "Residencial",
  //       cidade: "Fortaleza"
  //     },
  //     usuario: {
  //       nome: "Bruno Almeida",
  //       senha: "brunozx",
  //       email: "bruno.almeida@example.com"
  //     }
  //   },
  //   usuario: {
  //     nome: "Bruno Almeida",
  //     senha: "brunozx",
  //     email: "bruno.almeida@example.com"
  //   }
  // },
  // {
  //   id: 6,
  //   descricao: "Pedido cancelado sem aviso.",
  //   dataPublicacao: "2025-09-18",
  //   denuncia: {
  //     id: 206,
  //     titulo: "Cancelamento indevido",
  //     descricao: "Meu pedido foi cancelado sem minha autorização.",
  //     dataPublicacao: "2025-09-17",
  //     status: ComplaintStatus.Resolvida,
  //     pontuacao: 3,
  //     endereco: {
  //       cep: "32109-876",
  //       logradouro: "Rua B",
  //       bairro: "Centro",
  //       cidade: "Salvador"
  //     },
  //     usuario: {
  //       nome: "Aline Ramos",
  //       senha: "alinepass",
  //       email: "aline.ramos@example.com"
  //     }
  //   },
  //   usuario: {
  //     nome: "Aline Ramos",
  //     senha: "alinepass",
  //     email: "aline.ramos@example.com"
  //   }
  // },
  // {
  //   id: 7,
  //   descricao: "Produto sem garantia.",
  //   dataPublicacao: "2025-09-15",
  //   denuncia: {
  //     id: 207,
  //     titulo: "Garantia não informada",
  //     descricao: "Produto chegou e não tem garantia como anunciado.",
  //     dataPublicacao: "2025-09-14",
  //     status: ComplaintStatus.Visualizada,
  //     pontuacao: 2,
  //     endereco: {
  //       cep: "23456-789",
  //       logradouro: "Rua C",
  //       bairro: "Zona Sul",
  //       cidade: "Porto Alegre"
  //     },
  //     usuario: {
  //       nome: "Rodrigo Lopes",
  //       senha: "rodpass",
  //       email: "rodrigo.lopes@example.com"
  //     }
  //   },
  //   usuario: {
  //     nome: "Rodrigo Lopes",
  //     senha: "rodpass",
  //     email: "rodrigo.lopes@example.com"
  //   }
  // },
  // {
  //   id: 8,
  //   descricao: "Erro na emissão da nota fiscal.",
  //   dataPublicacao: "2025-09-13",
  //   denuncia: {
  //     id: 208,
  //     titulo: "Nota fiscal errada",
  //     descricao: "A nota fiscal foi emitida em nome incorreto.",
  //     dataPublicacao: "2025-09-12",
  //     status: ComplaintStatus.Aberto,
  //     pontuacao: 2,
  //     endereco: {
  //       cep: "56789-012",
  //       logradouro: "Rua D",
  //       bairro: "Comercial",
  //       cidade: "Manaus"
  //     },
  //     usuario: {
  //       nome: "Paula Souza",
  //       senha: "paulinha",
  //       email: "paula.souza@example.com"
  //     }
  //   },
  //   usuario: {
  //     nome: "Paula Souza",
  //     senha: "paulinha",
  //     email: "paula.souza@example.com"
  //   }
  // },
  // {
  //   id: 9,
  //   descricao: "Não recebi o código de rastreio.",
  //   dataPublicacao: "2025-09-10",
  //   denuncia: {
  //     id: 209,
  //     titulo: "Sem rastreamento",
  //     descricao: "Não consigo acompanhar meu pedido.",
  //     dataPublicacao: "2025-09-09",
  //     status: ComplaintStatus.Visualizada,
  //     pontuacao: 3,
  //     endereco: {
  //       cep: "09876-543",
  //       logradouro: "Rua E",
  //       bairro: "Nova Esperança",
  //       cidade: "Belém"
  //     },
  //     usuario: {
  //       nome: "Eduardo Martins",
  //       senha: "edmartins",
  //       email: "eduardo.martins@example.com"
  //     }
  //   },
  //   usuario: {
  //     nome: "Eduardo Martins",
  //     senha: "edmartins",
  //     email: "eduardo.martins@example.com"
  //   }
  // },
  // {
  //   id: 10,
  //   descricao: "Produto esgotado após a compra.",
  //   dataPublicacao: "2025-09-08",
  //   denuncia: {
  //     id: 210,
  //     titulo: "Estoque inconsistente",
  //     descricao: "Comprei o item e depois disseram que estava esgotado.",
  //     dataPublicacao: "2025-09-07",
  //     status: ComplaintStatus.Resolvida,
  //     pontuacao: 2,
  //     endereco: {
  //       cep: "11223-445",
  //       logradouro: "Rua F",
  //       bairro: "São João",
  //       cidade: "Recife"
  //     },
  //     usuario: {
  //       nome: "Luciana Ferreira",
  //       senha: "lucyfer",
  //       email: "luciana.ferreira@example.com"
  //     }
  //   },
  //   usuario: {
  //     nome: "Luciana Ferreira",
  //     senha: "lucyfer",
  //     email: "luciana.ferreira@example.com"
  //   }
  // }
];
}
