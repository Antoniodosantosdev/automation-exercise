import { contactElements } from "./contactElements";

class contactPage {
  acessarContact() {
    cy.visit("/contact_us");
  }

  preencherNome(name) {
    cy.get(contactElements.nameContact).type(name);
  }

  preencherEmail(email) {
    cy.get(contactElements.emailContact).type(email);
  }

  verificarCampoEmailVazio() {
    cy.get(contactElements.emailInput).should("have.prop", "validationMessage").and("not.be.empty");
  }

  preencherAssunto(subject) {
    cy.get(contactElements.subjectContact).type(subject);
  }

  preencherMensagem(message) {
    cy.get(contactElements.contactMessage).type(message);
  }

  clicarBotaoSubmit() {
    cy.get(contactElements.contactValid).click();
  }

  validarMensagem() {
    cy.contains(contactElements.successContact).should("be.visible");
  }

  mensagemInvalida() {
    cy.get(contactElements.emailContact).should("be.visible")
  }

}

export default new contactPage();
