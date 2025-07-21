

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
      cy.get('[data-qa="name"]').type(nameContact);
      cy.get('[data-qa="email"]').type(emailContact);
      cy.get('[data-qa="subject"]').type(subject);
      cy.get('[data-qa="message"]').type(message);

      cy.get('[data-qa="submit-button"]').click();

      cy.contains(
        "Success! Your details have been submitted successfully."
      ).should("be.visible");
    });
  });

  context("Formulário com E-mail Invalido", () => {

    it("Deve bloquear envio com e-mail inválido: ", () => {
        cy.visit("/contact_us");

        cy.get('[data-qa="name"]').type(nameContact);
        cy.get('[data-qa="email"]').type(invalidEmail);
        cy.get('[data-qa="subject"]').type(subject);
        cy.get('[data-qa="message"]').type(message);
        
        cy.get('[data-qa="submit-button"]').click();

        cy.get('[data-qa="email"]').should('have.prop', 'validationMessage').and('not.be.empty');
        


    });
  });

  context("Formulário com E-mail vazio",() => {
    it("Deve bloquear o envio com o campo E-mail vazio", () => {

        cy.get('[data-qa=name]').type(nameContact);
        cy.get('[data-qa=email]').should('have.value', '');
        cy.get('[data-qa=subject]').type(subject);
        cy.get('[data-qa=message]').type(message);

        cy.get('[data-qa=submit-button]').click();
        cy.wait(4000)
        cy.get('[data-qa=email]').should('have.prop', 'validationMessage').and('not.be.empty');

    })
  })
});
