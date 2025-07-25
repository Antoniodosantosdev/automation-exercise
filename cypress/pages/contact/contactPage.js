import contactElements from "./contactElements";

class contactPage {
  acessarContact() {
    cy.visit("/contact_us");
  }

  preencherNome(name) {
    cy.get(contactElements.nameInput).type(name);
  }

  preencherEmail(email) {
    cy.get(contactElements.emailContact).type(email);
  }

  verificarValidacaoHTML5() {
    cy.get(contactElements.emailContact).should("have.prop", "validationMessage").and("not.be.empty");
  }

  preencherAssunto(subject) {
    cy.get(contactElements.subjectInput).type(subject);
  }

  preencherMensagem(message) {
    cy.get(contactElements.messageTextarea).type(message);
  }

  clicarBotaoSubmit() {
    cy.get(contactElements.submitButton).click();
  }

  validarMensagem() {
    cy.contains(contactElements.successContact).should("be.visible");
  }
}

export default new contactPage();
