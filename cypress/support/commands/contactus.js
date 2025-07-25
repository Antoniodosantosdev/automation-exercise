import contactPage from "../../pages/contact/contactPage";

Cypress.Commands.add(
  "FormularioValido",
  (nameContact, emailContact, subject, message) => {
    contactPage.preencherNome(nameContact);
    contactPage.preencherEmail(emailContact);

    contactPage.preencherAssunto(subject);
    contactPage.preencherMensagem(message);

    contactPage.clicarBotaoSubmit();
    contactPage.validarMensagem();
  }
);

// ENVIO DE FORMULÁRIO COM EMAIL INVÁLIDO
Cypress.Commands.add(
  "FormularioInvalido",
  (nameContact, invalidEmail, subject, message) => {
    contactPage.preencherNome(nameContact);
    contactPage.preencherEmail(invalidEmail);
    contactPage.preencherAssunto(subject);
    contactPage.preencherMensagem(message);
    contactPage.clicarBotaoSubmit();
    contactPage.verificarValidacaoHTML5();
  }
);

//ENVIO DE FORMULÁRIO COM CAMPO DE EMAIL VÁZIO
Cypress.Commands.add(
  "enviarFormularioEmailVazio",
  (nameContact, subject, message) => {
    contactPage.preencherNome(nameContact);
    contactPage.preencherAssunto(subject);
    contactPage.preencherMensagem(message);
    contactPage.clicarBotaoSubmit();
    contactPage.verificarValidacaoHTML5();
  }
);
