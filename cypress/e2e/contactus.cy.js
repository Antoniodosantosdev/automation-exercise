describe("Contact Us", () => {
  const nameContact = Cypress.gerador.person.fullName();
  const emailContact = Cypress.gerador.internet.email();
  const subject = Cypress.gerador.lorem.sentence();
  const message = Cypress.gerador.lorem.paragraph();
  const invalidEmail = "joao@@@com";

  beforeEach(() => {
    cy.visit("/contact_us");
  });

  context("Formulário com dados válidos", () => {
    it("Deve enviar o formulário com dados válidos", () => {
      cy.FormularioValido(nameContact, emailContact, subject, message);
    });
  });

  context("Formulário com E-mail Invalido", () => {
    it("Deve bloquear envio com e-mail inválido: ", () => {
      cy.FormularioInvalido(nameContact, invalidEmail, subject, message);
    });
  });

  context("Formulário com E-mail vazio", () => {
    it("Deve bloquear o envio com o campo E-mail vazio", () => {
      
      cy.enviarFormularioEmailVazio(nameContact, subject, message);

    });
  });
});
