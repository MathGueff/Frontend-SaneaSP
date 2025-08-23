import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
  cid_questions = [
    {title: 'Em quanto tempo minha denuncia será respondida?', content: 'O tempo médio de resposta varia de região para região, verifique a página principal da sua região para obter essas informações'},
    {title: 'Como posso excluir minha denúncia?', content: 'Após publicar uma denúncia, caso ela já esteja em andamento, é necessária permissão tanto da organização associada quanto do próprio usuário criador'},
    {title: 'Como posso melhorar a qualidade da minha denúncia?', content: 'Quanto mais detalhada a descrição e mais informações forem especificadas, como imagens e categorias da denúncia, melhor será sua classificação e terá maior velocidade na resposta'}
  ]

  org_questions = [
    {title: 'Quais são os benefícios de ser um parceiro da SaneaSP?', content: 'Os benefícios estão listados detalhadamente na nossa página dos parceiros'},
    {title: 'O serviço é gratuito?', content: 'Sim'},
    {title: 'Como adiciono minha equipe ao meu dashboard?', content: 'Após acessar o dashboard de administração, os administradores permitidos podem adicionar novos administradores'}
  ]
}
