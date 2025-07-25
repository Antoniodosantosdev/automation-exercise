
# 🧪 Automation Exercise - Testes Automatizados

Este repositório contém o plano de testes automatizados para o site [Automation Exercise](https://automationexercise.com), com foco em validação funcional da interface do usuário (UI). O objetivo é garantir a qualidade dos principais fluxos de navegação por meio de scripts de testes estáveis e reutilizáveis.
## Repositório
# Criação de testes e2e para Demoday do curso de Quality assurance da Escola Atlântico Avanti.
##  Objetivos

- Automatizar testes funcionais em cenários críticos da aplicação
- Reduzir o retrabalho com testes repetitivos

##  Tecnologias Utilizadas

- **Linguagem:** JavaScript  
- **Framework:** [Cypress](https://www.cypress.io)
- **Gerenciador de Pacotes:** npm  
 


##  Funcionalidades Testadas

- Cadastro de novo usuário  
- Login e logout  
- Listagem e visualização de produtos  
- Adição ao carrinho  
- Finalização de pedido  
- Contato via formulário  


##   Autor  
- QAvengers

##   Links 
[Acesse o site do Automation Exercise](https://automationexercise.com)


## Instale as dependências:
```bash
npm install


##  Como executar os testes

```bash
# 1. Executar em modo interativo
npx cypress open para executar IDE

# 2.Execute os testes no modo headless:
npx cypress run para rodar em modo Headless


#   Estrutura do Projeto


├── cypress/
│ ├── e2e/ # Casos de teste (specs)
│ ├── pages/ # Page objects (elementos e ações)
│ ├── fixtures/ # Massa de dados para testes
│ ├── support/ # Comandos customizados e configurações globais
├── cypress.config.js # Configurações do Cypress
├── package.json # Dependências e scripts
└── README.md # Descrição do projeto
