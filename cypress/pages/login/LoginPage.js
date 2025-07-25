import { loginElements } from "./loginElements";

class loginPage {
  acessarLogin() {
    cy.visit("/login");
  }

  acessarCadastro() {
    cy.visit("/signup");
  }

  preencherEmail(email) {
    cy.get(loginElements.emailInput).type(email);
    cy.get(loginElements.emailInput).blur();
  }

  preencherSenha(password) {
    cy.get(loginElements.passwordInput).type(password);
  }

  clicarBotaoLogin() {
    cy.get(loginElements.loginButton).click();
  }

  preencherNomeCadastro(name) {
    cy.get(loginElements.signupNameInput).type(name);
  }

  verificarEmailExistente() {
    cy.contains(loginElements.errorSignupEmailExistsText).should("be.visible");
  }

  preencherEmailCadastro(emailAleatorio) {
    cy.get(loginElements.signupEmailInput).type(emailAleatorio);
  }

  clicarBotaoCadastro() {
    cy.get(loginElements.signupButton).click();
  }

  verificaErroLogin() {
    cy.contains(loginElements.errorLoginText).should("be.visible");
  }

  verificarCampoEmailInvalido() {
    // O blur() é importante para acionar a validação HTML5 do navegador
    cy.get(loginElements.emailInput).should("match", ":invalid");
  }

  verificarLoginComSucesso() {
    cy.contains(loginElements.logoutLink).should("be.visible");
    cy.url().should("not.include", "/login");
  }
}

export default new loginPage();
