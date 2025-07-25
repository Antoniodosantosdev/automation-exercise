
describe("Cadastro do Usuário e Login", () => {
  const fullName = Cypress.gerador.person.fullName();
  const emailAleatorio = Cypress.gerador.internet.email();
  const passwordAleatorio = Cypress.gerador.internet.password();

  context("Quando o usuário acessa a página de login", () => {
    beforeEach(() => {
      cy.visit("/login");
    });
    it("Deve realizar o login com sucesso", () => {
      const email = "maverick3@gmail.com";
      const password = "teste@123";

      cy.fazerLogin(email, password);
    });
  });
  context("Cadastro com email já existente", () => {
    it("Deve exibir uma mensagem de erro ao tentar cadastrar com email já existente", () => {
      const email = "maverick3@gmail.com";
      const name = "Frederico Teste";

      cy.cadastrarEmailExistente(name, email);
    });
  });

  context("Cadastro com campo de e-mail em branco", () => {
    it("Deve exibir uma mensagem de erro ao tentar cadastrar com campo de e-mail em branco", () => {
      cy.cadastrarSemEmail(fullName);
    });
  });

  context("Quando o usuário digita sua senha incorretamente", () => {
    it("Deve exibir uma mensagem de erro ao tentar logar com senha inválida", () => {
      const email = "maverick3@gmail.com";
      const passwordIncorreto = "senha_incorreta";
      
      cy.loginSenhaIncorreta(email, passwordIncorreto);
    });
  });

  context("Tentativa de Login com E-mail Não Cadastrado", () => {
    it("Deve exibir uma mensagem de erro ao tentar logar com e-mail não cadastrado", () => {
      cy.loginNaoCadastrado(emailAleatorio, passwordAleatorio);
    });
  });

  context("Testes de Login com E-mails Inválidos", () => {
    const invalidEmails = [
      "caveira.com.br",
      "yahoo.com",
      "gmail.com",
      "@",
      "maverick3@",
      "111",
      "&&^&&*",
      "maverick3gmail.com",
    ];

    invalidEmails.forEach((email) => {
      it(`email inválidos: "${email}"`, () => {
        cy.validarEmailInvalido(email);
      });
    });
  });

  context("Tentativa de Login com email válido", () => {
    beforeEach(() => {});
    it("Deve permitir login com credenciais válidas", () => {
      const email = "maverick3@gmail.com";
      const password = "teste@123";
      cy.fazerLogin(email, password);
    });
  });

  context("Quando o usuário tenta logar com email inválido", () => {
    it("Deve exibir mensagem de erro de validação para email inválido no campo de email", () => {
      const emailInvalido = "maverick3gmail.com";
      const password = "teste@123";

      cy.loginEmailInvalido(emailInvalido, password);
    });
  });
});
