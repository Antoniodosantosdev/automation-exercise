// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

//TESTE DE LOGIN

// LOGIN COM SUCESSO
Cypress.Commands.add("fazerLogin", (email, password) => {
  cy.visit("/login");
  cy.get('[data-qa="login-email"]').type(email);
  cy.get('[data-qa="login-password"]').type(password);
  cy.get('[data-qa="login-button"]').click();
  cy.contains("Logout").should("be.visible").click();
});

// CADASTRO COM E-MAIL JÁ EXISTENTE
Cypress.Commands.add("cadastrarEmailExistente", (name, email) => {
  cy.visit("/signup");
  cy.get('[data-qa="signup-name"]').type(name);
  cy.get('[data-qa="signup-email"]').type(email);
  cy.get('[data-qa="signup-button"]').click();
  cy.contains("Email Address already exist!").should("be.visible");
});

// CADASTRO COM E-MAIL EM BRANCO
Cypress.Commands.add("cadastrarSemEmail", (fullName) => {
  cy.visit("/signup");
  cy.get('[data-qa="signup-name"]').type(fullName);
  cy.get('[data-qa="signup-button"]').click();
});

// LOGIN COM SENHA INVÁLIDA
Cypress.Commands.add("loginSenhaIncorreta", (email, passwordIncorreto) => {
  cy.visit("/login");
  cy.get('[data-qa="login-email"]').type(email);
  cy.get('[data-qa="login-password"]').type(passwordIncorreto);
  cy.get('[data-qa="login-button"]').click();

  cy.contains("Your email or password is incorrect!").should("be.visible");
});

// LOGIN COM USUÁRIO NÃO CADASTRADO
Cypress.Commands.add("loginNaoCadastrado",(emailAleatorio, passwordAleatorio) => {
    cy.visit("/login");
    cy.get('[data-qa="login-email"]').type(emailAleatorio);
    cy.get('[data-qa="login-password"]').type(passwordAleatorio);
    cy.get('[data-qa="login-button"]').click();
    cy.contains("Your email or password is incorrect!").should("be.visible");
  }
);

// TESTE DE E-MAILS INVÁLIDOS

Cypress.Commands.add("validarEmailInvalido", (email) => {
  cy.visit("/login");
  cy.get('[data-qa="login-email"]').type(email).blur();
  cy.get('[data-qa="login-email"]').should("match", ":invalid");
});

// LOGIN COM CREDENCIAIS VÁLIDAS

Cypress.Commands.add("loginComSucesso", (email, password) => {
  cy.visit("/login");
  cy.get('[data-qa="login-email"]').type(email);
  cy.get('[data-qa="login-password"]').type(password);
  cy.get('[data-qa="login-button"]').click();
  cy.url().should("not.include", "/login");
  cy.contains("Logout").should("be.visible");
});

// LOGIN COM FORMATO DE E-MAIL INVÁLIDO (HTML5)

Cypress.Commands.add("loginEmailInvalido", (emailInvalido, password) => {
  cy.visit("/login");
  cy.get('[data-qa="login-email"]').type(emailInvalido).blur();
  cy.get('[data-qa="login-password"]').type(password);
  cy.get('[data-qa="login-email"]').should("match", ":invalid");
  cy.get('[data-qa="login-button"]').click();
});

// TESTE CONTACT US

// ENVIO DE FORMULÁRIO DE CONTATO COM DADOS VÁLIDOS
Cypress.Commands.add("FormularioValido",(nameContact, emailContact, subject, message) => {
    cy.get('[data-qa="name"]').type(nameContact);
    cy.get('[data-qa="email"]').type(emailContact);
    cy.get('[data-qa="subject"]').type(subject);
    cy.get('[data-qa="message"]').type(message);

    cy.get('[data-qa="submit-button"]').click();

    cy.contains(
      "Success! Your details have been submitted successfully."
    ).should("be.visible");
  }
);

// ENVIO DE FORMULÁRIO COM EMAIL INVÁLIDO
Cypress.Commands.add("FormularioInvalido",(nameContact, invalidEmail, subject, message) => {
    cy.get('[data-qa="name"]').type(nameContact);
    cy.get('[data-qa="email"]').type(invalidEmail);
    cy.get('[data-qa="subject"]').type(subject);
    cy.get('[data-qa="message"]').type(message);

    cy.get('[data-qa="submit-button"]').click();

    cy.get('[data-qa="email"]')
      .should("have.prop", "validationMessage")
      .and("not.be.empty");
  }
);

//ENVIO DE FORMULÁRIO COM CAMPO DE EMAIL VÁZIO
Cypress.Commands.add("enviarFormularioEmailVazio",(nameContact, subject, message) => {
      cy.get("[data-qa=name]").type(nameContact);
      cy.get("[data-qa=email]").should("have.value", "");
      cy.get("[data-qa=subject]").type(subject);
      cy.get("[data-qa=message]").type(message);

      cy.get("[data-qa=submit-button]").click();
      cy.wait(4000);
      cy.get("[data-qa=email]")
        .should("have.prop", "validationMessage")
        .and("not.be.empty");
  }
);
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
