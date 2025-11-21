# CONTRIBUTING.md – Guia de Contribuição do SkillConnect

Este documento descreve de forma clara e objetiva como contribuir para o desenvolvimento do **SkillConnect (versão MVP)**, garantindo que o projeto permaneça organizado, compreensível e preparado para evoluções futuras.

O objetivo é orientar qualquer colaborador — mesmo sem conhecimento prévio do projeto — a compreender sua estrutura, montar o ambiente e realizar contribuições seguras e consistentes.

---

## 📌 Visão Geral do Modelo de Contribuição

O SkillConnect (MVP) foi desenvolvido utilizando exclusivamente tecnologias front-end:

* HTML
* CSS
* JavaScript

A aplicação é totalmente executada no lado do cliente (*client-side*), sem backend e sem banco de dados externo. Todas as informações são armazenadas via **LocalStorage**.

As contribuições devem respeitar essa arquitetura simples, visando facilitar manutenção, compreensão e continuidade do projeto.

---

## ✅ Tipos de Contribuição Aceitos

As contribuições podem incluir, mas não se limitam a:

* Melhorias visuais e de usabilidade
* Ajustes na lógica JavaScript
* Correções de bugs
* Novas funcionalidades previstas no escopo original
* Organização ou refatoração do código
* Comentários técnicos e documentação adicional

---

## 📁 Estrutura Atual do Projeto

Atualmente, o MVP está centralizado em um único arquivo:

```
index.html   # Contém HTML, CSS e JavaScript do sistema
```

Componentes internos:

* **HTML** – Estrutura das telas e seções
* **CSS** – Estilização embutida na tag `<style>`
* **JavaScript** – Lógica da aplicação (armazenamento, cadastro, mentoria, dashboard)

Embora futuras versões possam separar os arquivos, nesta entrega recomenda-se manter essa organização unificada.

---

##  Como Contribuir

### 1. Organização do Código

Todas as contribuições devem:

* Preservar a lógica existente
* Evitar duplicação de funções
* Utilizar nomes de variáveis claros e descritivos
* Manter indentação e organização consistentes
* Comentar trechos complexos ou críticos
* Testar manualmente após cada alteração

---

### 2. Melhorias de Interface e Experiência do Usuário

São bem-vindas contribuições que envolvam:

* Ajustes no formulário de cadastro
* Melhoria na visualização de listas
* Organização das seções
* Correções visuais

As alterações devem preservar o estilo simples e funcional do MVP, priorizando legibilidade e clareza.

---

### 3. Extensão da Lógica de Mentoria

A lógica atual de match baseia-se na interseção entre:

* Interesses do aprendiz (mentee)
* Competências do mentor

Possíveis melhorias incluem:

* Aplicação de pesos por nível (iniciante, intermediário, avançado)
* Sistema de pontuação por compatibilidade
* Filtros por prioridades de tecnologia
* Novas regras de recomendação

Toda nova regra implementada deve ser claramente comentada no código e descrita neste documento.

---

### 4. Adição de Novas Funcionalidades

A plataforma prevê futuras expansões, como:

* Formação automática de grupos
* Heatmap de competências
* Ranking ou gamificação
* Visualização em grafo

Qualquer implementação deve manter a simplicidade e evitar aumentar o escopo além do viável dentro do conceito de MVP.

---

## 🔍 Garantia de Integridade

Toda alteração deve ser testada manualmente, validando:

* Navegação entre seções
* Cadastro de novos perfis
* Atualização da lista de perfis
* Geração de match de mentoria
* Atualização do dashboard
* Funcionamento do LocalStorage

---

## 📝 Documentação das Alterações

Sempre que realizar modificações relevantes, atualize este documento informando:

* O que foi alterado
* Por que foi alterado
* Como testar a modificação

Inclua também, se necessário:

* Novas funções adicionadas
* Novas seções ou módulos
* Mudanças na lógica de mentoria
* Ajustes significativos de layout

---

## 🔄 Fluxo de Trabalho Sugerido

1. Realizar backup do arquivo `index.html`
2. Implementar alterações de forma incremental
3. Testar localmente no navegador
4. Validar todas as funcionalidades afetadas
5. Atualizar README e CONTRIBUTING se necessário
6. Realizar commit com mensagem clara

---

##  Boas Práticas

* Manter o código limpo e legível
* Evitar complexidade desnecessária
* Utilizar padrões consistentes
* Seguir princípios de responsabilidade única
* Documentar lógica de match ao ser expandida
* Priorizar simplicidade e estabilidade

---

##  Planejamento para Versões Futuras

As próximas etapas previstas incluem:

* Migração para arquitetura com backend
* Uso de Python (Django/Flask) ou Node.js
* Banco de dados real
* Deploy em nuvem (Azure)
* API de recomendação avançada
* Dashboard interativo com gráficos
* Sistema de autenticação completo

As contribuições devem respeitar o estágio atual do projeto, mas podem estruturar o código de forma a facilitar essa futura evolução.

---

## 📢 Considerações Finais

Este guia garante que o SkillConnect permaneça padronizado, sustentável e fácil de evoluir, permitindo que qualquer colaborador compreenda rapidamente sua estrutura e contribua com segurança.

A colaboração consciente é fundamental para a qualidade e longevidade do projeto.
