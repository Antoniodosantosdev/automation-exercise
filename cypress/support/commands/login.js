import loginPage  from "../../pages/login/loginPage"
Cypress.Commands.add("fazerLogin", (email, password) => {
  loginPage.acessarLogin();
  
  loginPage.preencherEmail(email);
  loginPage.preencherSenha(password);
  loginPage.clicarBotaoLogin();

  loginPage.verificarLoginComSucesso();

  cy.contains("Logout").click(); 
});

Cypress.Commands.add("cadastrarEmailExistente", (name, email) => {
  loginPage.acessarCadastro();

  loginPage.preencherNomeCadastro(name);
  loginPage.preencherEmailCadastro(email);
  loginPage.clicarBotaoCadastro();

  loginPage.verificarEmailExistente(); 
});

// CADASTRO COM E-MAIL EM BRANCO
Cypress.Commands.add("cadastrarSemEmail", (fullName) => {
  loginPage.acessarCadastro();

  loginPage.preencherNomeCadastro(fullName);
  loginPage.clicarBotaoCadastro();
});

// LOGIN COM SENHA INVÁLIDA
Cypress.Commands.add("loginSenhaIncorreta", (email, passwordIncorreto) => {
  loginPage.acessarLogin();

  loginPage.preencherEmail(email);
  loginPage.preencherSenha(passwordIncorreto);
  loginPage.clicarBotaoLogin();

  loginPage.verificaErroLogin();
});

// LOGIN COM USUÁRIO NÃO CADASTRADO
Cypress.Commands.add("loginNaoCadastrado",(emailAleatorio, passwordAleatorio) => {
    loginPage.acessarLogin();

    loginPage.preencherEmail(emailAleatorio);
    loginPage.preencherSenha(passwordAleatorio);
    loginPage.clicarBotaoLogin();

    loginPage.verificaErroLogin();
  }
);

// TESTE DE E-MAILS INVÁLIDOS

Cypress.Commands.add("validarEmailInvalido", (email) => {
  loginPage.acessarLogin();
  loginPage.preencherEmail(email);

  loginPage.verificarCampoEmailInvalido();
});

// LOGIN COM CREDENCIAIS VÁLIDAS

Cypress.Commands.add("loginComSucesso", (email, password) => {
  loginPage.acessarLogin();

  loginPage.preencherEmail(email);
  loginPage.preencherSenha(password);
  loginPage.clicarBotaoLogin();

  loginPage.verificarLoginComSucesso();
  cy.contains("Logout").click();
  
});

// LOGIN COM FORMATO DE E-MAIL INVÁLIDO (HTML5)

Cypress.Commands.add("loginEmailInvalido", (emailInvalido, password) => {
  loginPage.acessarLogin();

  loginPage.preencherEmail(emailInvalido);

  loginPage.verificarCampoEmailInvalido();
  loginPage.preencherSenha(password);
  loginPage.clicarBotaoLogin();
});