Este documento descreve como contribuir para o desenvolvimento do SkillConnect na versão MVP apresentada nesta entrega. O objetivo é manter o projeto organizado, compreensível e fácil de evoluir em futuras versões.

Visão Geral do Modelo de Contribuição

O SkillConnect (versão MVP) foi desenvolvido utilizando apenas:

HTML

CSS

JavaScript

A aplicação é totalmente executada do lado do cliente (client-side), sem backend e sem banco de dados real. Todas as contribuições devem manter esse padrão simples e funcional, para facilitar manutenção e continuidade do projeto.

Contribuições podem incluir:

Melhorias visuais

Ajustes na lógica JavaScript

Adição de novas funcionalidades da plataforma original

Organização ou refatoração do código

Comentários e documentação adicional

Estrutura Atual do Projeto
index.html         # Arquivo principal contendo HTML, CSS e JavaScript


Todo o MVP está centralizado em um único arquivo, com:

HTML: estrutura das páginas

CSS: estilização embutida no <style>

JavaScript: lógica da aplicação (armazenamento, cadastro, mentoria)

Contribuições futuras poderão separar essas partes se necessário, mas para esta versão recomenda-se manter tudo unificado.

Como Contribuir
1. Organização do Código

As contribuições devem:

Preservar a lógica atual

Evitar duplicação de funções

Comentar trechos complexos

Testar manualmente no navegador após alterações

2. Adição de Novos Perfis ou Ajustes de Interface

Melhorias no formulário, visualização de listas ou no layout das seções são bem-vindas.
Mudanças visuais devem manter o estilo simples e coerente do MVP.

3. Extensão da Lógica de Mentoria

A lógica atual utiliza interseção entre:

interesses do mentee

competências do mentor

Para calcular compatibilidade.

Contribuições podem incluir:

Pesos por nível (iniciante, intermediário, avançado)

Pontuações adicionais

Filtragem de tecnologias mais relevantes

Novas regras devem ser documentadas claramente dentro do arquivo.

4. Adição de Novas Funcionalidades

A plataforma original prevê recursos adicionais, como:

Formação automática de grupos

Heatmap de competências

Ranking ou gamificação

Visualização em grafo

Qualquer implementação deve manter a simplicidade e evitar aumentar o escopo além do viável dentro de um único arquivo.

5. Garantir Integridade da Interface

Toda mudança deve ser testada manualmente para verificar:

Navegação entre seções

Criação de novos perfis

Atualização da lista de perfis

Atualização da lista de mentorias

Atualização do dashboard

6. Documentação das Alterações

Cada contribuinte deve atualizar este documento quando adicionar:

Novas funções

Novos módulos ou seções

Alterações significativas de layout

Mudanças na lógica de mentoria

Descrever brevemente:

O que foi alterado

Por que foi alterado

Como testar a nova funcionalidade

Fluxo de Trabalho Sugerido

Duplicar o arquivo index.html para backup.

Realizar alterações incrementalmente.

Testar o arquivo localmente abrindo no navegador.

Validar se todas as seções funcionam após mudanças.

Atualizar README e CONTRIBUTING conforme necessário.

Boas Práticas

Manter o código organizado e com identação consistente.

Utilizar nomes de variáveis claros e descritivos.

Separar responsabilidades quando possível (HTML, CSS e JS bem delimitados).

Documentar a lógica de match de mentoria caso seja expandida.

Manter a simplicidade e a integridade do MVP.

Futuras Versões do Projeto

As próximas etapas previstas incluem:

Migração para uma arquitetura completa com backend

Uso de Python (Django ou Flask) ou Node.js

Banco de dados real

Deploy na nuvem (Azure)

API de recomendação mais robusta

Dashboard interativo com gráficos

Autenticação de usuários

Contribuições devem respeitar o estágio atual, mas já podem preparar a base para evoluções futuras.
