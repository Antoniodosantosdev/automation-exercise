

describe("Cadastro do Usuário ou Login", () => {
  context("Quando o usuário acessa a página de login", () => {
    beforeEach(() => {
      cy.visit("/login");
    });
    it("Deve realizar o login com sucesso", () => {
      const email = "maverick3@gmail.com";
      const password = "teste@123";

      cy.get('[data-qa="login-email"]').type(email);
      cy.get('[data-qa="login-password"]').type(password);

      cy.get('[data-qa="login-button"]').click();

      cy.contains("Logout").should("be.visible");
    });
  });
  context("Cadastro com email já existente", () => {
    it("Deve exibir uma mensagem de erro ao tentar cadastrar com email já existente", () => {
      cy.visit("/signup");
      const email = "maverick3@gmail.com";
      const name = "Frederico Teste";

      cy.get('[data-qa="signup-name"]').type(name);
      cy.get('[data-qa="signup-email"]').type(email);
      cy.get('[data-qa="signup-button"]').click();

      cy.contains("Email Address already exist!").should("be.visible");
    });
  });

  context("Cadastro com campo de e-mail em branco", () => {
    it("Deve exibir uma mensagem de erro ao tentar cadastrar com campo de e-mail em branco", () => {
      cy.visit("/signup");

      const fullName = Cypress.gerador.person.fullName();

      cy.get('[data-qa="signup-name"]').type(fullName);
      cy.get('[data-qa="signup-button"]').click();

      cy.url().should("include", "/signup");
    });
  });

  context("Quando o usuário digita sua senha incorretamente", () => {
    it("Deve exibir uma mensagem de erro ao tentar logar com senha inválida", () => {
      cy.visit("/login");

      const email = "maverick3@gmail.com";
      const password = "senha_incorreta";

      cy.get('[data-qa="login-email"]').type(email);
      cy.get('[data-qa="login-password"]').type(password);
      cy.get('[data-qa="login-button"]').click();

      cy.contains("Your email or password is incorrect!").should("be.visible");
    });
  });

  context("Tentativa de Login com E-mail Não Cadastrado", () => {
    beforeEach(() => {
      cy.visit("/signup");
    });
    it("Deve exibir uma mensagem de erro ao tentar logar com e-mail não cadastrado", () => {
      

      const email = Cypress.gerador.internet.email();
      const password = Cypress.gerador.internet.password();

      cy.get('[data-qa="login-email"]').type(email);
      cy.get('[data-qa="login-password"]').type(password);

      cy.get('[data-qa="login-button"]').click();

      cy.contains("Your email or password is incorrect!").should("be.visible");
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
        cy.visit("/login");

        cy.get('[data-qa="login-email"]').type(email).blur();

        cy.get('[data-qa="login-email"]').should("match", ":invalid");
      });
    });
  });

  context("Tentativa de Login com email válido", () => {
    beforeEach(() => {
      cy.visit("/login");
    });
    it("Deve permitir login com credenciais válidas", () => {
      const email = "maverick3@gmail.com";
      const password = "teste@123";

      cy.get('[data-qa="login-email"]').type(email);
      cy.get('[data-qa="login-password"]').type(password);
      cy.get('[data-qa="login-button"]').click();

      // Verificações pós-login
      cy.url().should("not.include", "/login");
      cy.contains("Logout").should("be.visible");
    });
  });

  context("Quando o usuário tenta logar com email inválido", () => {
    it("Deve exibir mensagem de erro de validação para email inválido no campo de email", () => {
      cy.visit("/login");

      const emailInvalido = "maverick3gmail.com";
      const password = "teste@123";

      cy.get('[data-qa="login-email"]').type(emailInvalido).blur();

      cy.get('[data-qa="login-email"]').should("match", ":invalid");

      cy.get('[data-qa="login-password"]').type(password);
      cy.get('[data-qa="login-button"]').click();

      cy.url().should("include", "/login");
    });
  });
});
