Sobre o Projeto

O SkillConnect é uma plataforma colaborativa projetada para mapear, visualizar e conectar competências técnicas e interesses de aprendizado dos alunos de uma instituição de ensino. O objetivo é reduzir barreiras de comunicação e criar um ecossistema acadêmico mais colaborativo, onde cada estudante tenha visibilidade sobre o capital intelectual da comunidade.

O sistema facilita a formação de grupos de estudo, a conexão entre mentores e aprendizes e a identificação de lacunas de conhecimento dentro de uma turma. Professores também podem utilizar essas informações para planejar atividades pedagógicas mais direcionadas.

Conceito Central

A plataforma se baseia na ideia de que os alunos podem declarar:

Suas competências técnicas e respectivos níveis de proficiência (iniciante, intermediário, avançado)

Suas áreas de interesse e aprendizado

Sua disponibilidade para atuar como mentor

Com essas informações, o sistema é capaz de gerar:

Mapa visual de competências

Sugestões de grupos equilibrados para projetos

Conexões entre mentores e aprendizes

Relatórios sobre pontos fortes da comunidade acadêmica

Funcionalidades Principais
Perfil de Usuário

Cadastro de nome, e-mail acadêmico e nível.

Registro de competências e interesses separados por vírgula.

Indicação opcional de disponibilidade para mentoria.

Mapa de Competências

Representação da distribuição de habilidades (na versão completa).

Identificação de tecnologias mais populares.

Motor de Sugestão de Grupos (versão completa)

Formação de grupos balanceados considerando níveis e habilidades.

Indicação de participantes ideais para atividades específicas.

Sistema de Mentoria

Combinação entre mentees iniciantes e mentores disponíveis.

Lógica baseada na interseção entre interesses e competências.

Exibição clara das tecnologias que tornam o match relevante.

Gamificação (versão futura)

Pontuação por contribuir ensinando ou aprendendo.

Conquistas temáticas e participação em ranking colaborativo.

Integrações Futuras

GitHub para exibir projetos reais no perfil.

LinkedIn para exportação de competências.

Sistema de notificações personalizadas.

Versão Utilizada no MVP

Para esta entrega, foi desenvolvida uma versão mínima funcional da plataforma, implementada inteiramente com:

HTML

CSS

JavaScript

Essa abordagem permitiu uma demonstração clara, rápida e funcional da ideia central, mantendo as principais interações e permitindo visualizar o conceito de forma navegável.

O MVP implementa:

Cadastro de perfis

Armazenamento em memória

Exibição da base de perfis

Dashboard de indicadores

Sistema de mentoria

Exibição de tecnologias em comum entre mentor e mentee

Perfis de exemplo pré-carregados para facilitar a demonstração

Esse MVP é totalmente client-side e pode ser executado simplesmente abrindo o arquivo HTML em qualquer navegador moderno. Dessa forma, atende ao objetivo principal da entrega: demonstrar a aplicação central do SkillConnect.

Como Executar o MVP

Baixe ou copie o arquivo index.html para seu computador.

Abra o arquivo no navegador (Google Chrome, Firefox, Edge ou outro).

Utilize o menu superior para navegar pelas seções:

Início

Novo Perfil

Perfis

Mentoria

Não é necessário instalar bibliotecas, configurar servidor ou utilizar backend.

Seções do MVP
Início

Apresenta indicadores gerais:

Total de perfis

Total de mentores

Número de iniciantes

Número de avançados

Novo Perfil

Formulário para criar novos registros. Campos:

Nome

E-mail

Nível

Competências

Interesses

Disponibilidade como mentor

Perfis

Listagem completa com:

Competências em forma de badges

Interesses segmentados

Indicação de disponibilidade para mentoria

Mentoria

Apresenta sugestões de:

Mentor

Mentee

Tecnologias em comum

A lógica utiliza interseção entre interesses e competências para gerar recomendações consistentes.

Justificativa Técnica da Solução

Dado o curto prazo e a necessidade de entregar um protótipo funcional demonstrável, optou-se pela implementação de um MVP utilizando HTML, CSS e JavaScript. Isso permite apresentar ao professor:

Fluxos completos de uso

Interface navegável

Lógica funcional de recomendação

Fidelidade conceitual ao projeto original

A arquitetura simplificada garante execução imediata, sem dependências externas, facilitando a apresentação e evitando problemas de infraestrutura ou deploy.

Sobre o Uso de Programação em Par

Durante o desenvolvimento do projeto, não foi adotada a prática de programação em par. A decisão ocorreu devido à diferença de níveis técnicos dentro da equipe, o que poderia prejudicar o ritmo de produção e dificultar a contribuição individual de cada membro. A opção escolhida permitiu que todos colaborassem de maneira autônoma e eficiente dentro do prazo disponível.


### Diagrama de Atividades do Sistema

Aqui está o fluxo de atividades para o matchmaking de mentoria em nossa plataforma SkillConnect.

![Diagrama que mostra o fluxo de atividades para encontrar um mentor](https://github.com/arthurlleitee/SkillConnect/blob/main/Sem%20t%C3%ADtulo%20(1).jpg?raw=true)
