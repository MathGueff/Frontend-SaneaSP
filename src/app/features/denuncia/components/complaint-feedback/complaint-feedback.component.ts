import { Component } from '@angular/core';
import { IComment } from '@features/denuncia/models/comment.model';
import { ComplaintStatus } from '@features/denuncia/models/complaint.model';

@Component({
  selector: 'app-complaint-feedback',
  standalone: true,
  imports: [],
  templateUrl: './complaint-feedback.component.html',
  styleUrl: './complaint-feedback.component.css'
})
export class ComplaintFeedbackComponent {
  protected MAX_COMMENTS = 6;
  description:string = "Fiquei impressionado com a rapidez e a eficiência na solução do problema que relatei. O esgoto irregular que denunciei foi removido, e agora a região está limpa e segura. Acompanhar o processo pelo sistema foi simples e transparente. Agradeço à equipe responsável e espero que continuem mantendo esse nível de atenção às denúncias da comunidade."
  protected comments: IComment[] = [
  {
    id: 1,
    description: "Produto chegou quebrado.",
    date: "2025-09-30",
    complaint: {
      id: 201,
      title: "Produto danificado",
      description: "Recebi o produto com a tela trincada.",
      date: new Date("2025-09-29"),
      status: ComplaintStatus.Aberto,
      score: 1,
      address: {
        cep: "12345-678",
        logradouro: "Rua das Flores",
        bairro: "Centro",
        cidade: "São Paulo"
      },
      user: {
        name: "João Silva",
        password: "joaos123",
        email: "joao.silva@example.com"
      }
    },
    user: {
      name: "João Silva",
      password: "joaos123",
      email: "joao.silva@example.com"
    }
  },
  {
    id: 2,
    description: "Demora na entrega.",
    date: "2025-09-28",
    complaint: {
      id: 202,
      title: "Atraso na entrega",
      description: "O pedido demorou 10 dias além do prazo.",
      date: new Date("2025-09-26"),
      status: ComplaintStatus.Analise,
      score: 2,
      address: {
        cep: "87654-321",
        logradouro: "Avenida Brasil",
        bairro: "Jardim",
        cidade: "Rio de Janeiro"
      },
      user: {
        name: "Maria Oliveira",
        password: "mariao456",
        email: "maria.oliveira@example.com"
      }
    },
    user: {
      name: "Maria Oliveira",
      password: "mariao456",
      email: "maria.oliveira@example.com"
    }
  },
  {
    id: 3,
    description: "Cobrança indevida no cartão.",
    date: "2025-09-25",
    complaint: {
      id: 203,
      title: "Cobrança duplicada",
      description: "Fui cobrado duas vezes pelo mesmo pedido.",
      date: new Date("2025-09-24"),
      status: ComplaintStatus.Visualizada,
      score: 1,
      address: {
        cep: "45678-901",
        logradouro: "Rua das Palmeiras",
        bairro: "Vila Nova",
        cidade: "Belo Horizonte"
      },
      user: {
        name: "Carlos Dias",
        password: "carlos123",
        email: "carlos.dias@example.com"
      }
    },
    user: {
      name: "Carlos Dias",
      password: "carlos123",
      email: "carlos.dias@example.com"
    }
  },
  {
    id: 4,
    description: "Produto diferente do anunciado.",
    date: "2025-09-22",
    complaint: {
      id: 204,
      title: "Produto errado",
      description: "Comprei um celular e recebi um carregador.",
      date: new Date("2025-09-20"),
      status: ComplaintStatus.Aberto,
      score: 1,
      address: {
        cep: "65432-109",
        logradouro: "Rua do Comércio",
        bairro: "Industrial",
        cidade: "Curitiba"
      },
      user: {
        name: "Fernanda Costa",
        password: "fcosta456",
        email: "fernanda.costa@example.com"
      }
    },
    user: {
      name: "Fernanda Costa",
      password: "fcosta456",
      email: "fernanda.costa@example.com"
    }
  },
  {
    id: 5,
    description: "Atendimento ruim pelo suporte.",
    date: "2025-09-20",
    complaint: {
      id: 205,
      title: "Suporte ineficiente",
      description: "Fiquei mais de 1 hora esperando no chat.",
      date: new Date("2025-09-19"),
      status: ComplaintStatus.Analise,
      score: 2,
      address: {
        cep: "78901-234",
        logradouro: "Rua A",
        bairro: "Residencial",
        cidade: "Fortaleza"
      },
      user: {
        name: "Bruno Almeida",
        password: "brunozx",
        email: "bruno.almeida@example.com"
      }
    },
    user: {
      name: "Bruno Almeida",
      password: "brunozx",
      email: "bruno.almeida@example.com"
    }
  },
  {
    id: 6,
    description: "Pedido cancelado sem aviso.",
    date: "2025-09-18",
    complaint: {
      id: 206,
      title: "Cancelamento indevido",
      description: "Meu pedido foi cancelado sem minha autorização.",
      date: new Date("2025-09-17"),
      status: ComplaintStatus.Resolvida,
      score: 3,
      address: {
        cep: "32109-876",
        logradouro: "Rua B",
        bairro: "Centro",
        cidade: "Salvador"
      },
      user: {
        name: "Aline Ramos",
        password: "alinepass",
        email: "aline.ramos@example.com"
      }
    },
    user: {
      name: "Aline Ramos",
      password: "alinepass",
      email: "aline.ramos@example.com"
    }
  },
  {
    id: 7,
    description: "Produto sem garantia.",
    date: "2025-09-15",
    complaint: {
      id: 207,
      title: "Garantia não informada",
      description: "Produto chegou e não tem garantia como anunciado.",
      date: new Date("2025-09-14"),
      status: ComplaintStatus.Visualizada,
      score: 2,
      address: {
        cep: "23456-789",
        logradouro: "Rua C",
        bairro: "Zona Sul",
        cidade: "Porto Alegre"
      },
      user: {
        name: "Rodrigo Lopes",
        password: "rodpass",
        email: "rodrigo.lopes@example.com"
      }
    },
    user: {
      name: "Rodrigo Lopes",
      password: "rodpass",
      email: "rodrigo.lopes@example.com"
    }
  },
  {
    id: 8,
    description: "Erro na emissão da nota fiscal.",
    date: "2025-09-13",
    complaint: {
      id: 208,
      title: "Nota fiscal errada",
      description: "A nota fiscal foi emitida em nome incorreto.",
      date: new Date("2025-09-12"),
      status: ComplaintStatus.Aberto,
      score: 2,
      address: {
        cep: "56789-012",
        logradouro: "Rua D",
        bairro: "Comercial",
        cidade: "Manaus"
      },
      user: {
        name: "Paula Souza",
        password: "paulinha",
        email: "paula.souza@example.com"
      }
    },
    user: {
      name: "Paula Souza",
      password: "paulinha",
      email: "paula.souza@example.com"
    }
  },
  {
    id: 9,
    description: "Não recebi o código de rastreio.",
    date: "2025-09-10",
    complaint: {
      id: 209,
      title: "Sem rastreamento",
      description: "Não consigo acompanhar meu pedido.",
      date: new Date("2025-09-09"),
      status: ComplaintStatus.Visualizada,
      score: 3,
      address: {
        cep: "09876-543",
        logradouro: "Rua E",
        bairro: "Nova Esperança",
        cidade: "Belém"
      },
      user: {
        name: "Eduardo Martins",
        password: "edmartins",
        email: "eduardo.martins@example.com"
      }
    },
    user: {
      name: "Eduardo Martins",
      password: "edmartins",
      email: "eduardo.martins@example.com"
    }
  },
  {
    id: 10,
    description: "Produto esgotado após a compra.",
    date: "2025-09-08",
    complaint: {
      id: 210,
      title: "Estoque inconsistente",
      description: "Comprei o item e depois disseram que estava esgotado.",
      date: new Date("2025-09-07"),
      status: ComplaintStatus.Resolvida,
      score: 2,
      address: {
        cep: "11223-445",
        logradouro: "Rua F",
        bairro: "São João",
        cidade: "Recife"
      },
      user: {
        name: "Luciana Ferreira",
        password: "lucyfer",
        email: "luciana.ferreira@example.com"
      }
    },
    user: {
      name: "Luciana Ferreira",
      password: "lucyfer",
      email: "luciana.ferreira@example.com"
    }
  }
];
}
