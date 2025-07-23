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

//CENÁRIO DE CADASTRO E LOGIN

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
Cypress.Commands.add(
  "loginNaoCadastrado",
  (emailAleatorio, passwordAleatorio) => {
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

// CENÁRIO CONTACT US

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

// CENÁRIO DE PRODUCT

// Pesquisa um produto específico pelo nome
Cypress.Commands.add("pesquisarProduto", (product) => {
  cy.get("#search_product").type(product.name);
  cy.get("#submit_search").click();
  cy.get(".productinfo").should("contain", product.name);
});

// Adicionar um produto ao carrinho
Cypress.Commands.add("adicionarProdutoAoCarrinho", (product) => {
  cy.contains(".productinfo", product.name)
    .parents(".product-image-wrapper")
    .trigger("mouseover");

  cy.contains(".productinfo", product.name)
    .parents(".product-image-wrapper")
    .contains("Add to cart")
    .click();

  cy.contains("Continue Shopping").should("be.visible");
  cy.contains("View Cart").click();

  cy.get(".cart_description").should("contain", product.name);
});

// Pesquisa de produto usando o botão de pesquisa

Cypress.Commands.add("pesquisarProdutoComBotao", (product) => {
  cy.get("#search_product").type(product.name);
  cy.get("#submit_search").click();
  cy.get(".productinfo").should("contain", product.name);
});

// CENÁRIO DE CARRINHO DE COMPRAS

// Quando um produto é removido do carrinho

Cypress.Commands.add("removerPrimeiroProdutoCarrinho", () => {
  cy.get(".product-image-wrapper .add-to-cart").first().click();

  cy.contains("Continue Shopping").should("be.visible");
  cy.contains("View Cart").click();

  cy.get("tr[id^='product-']").should("have.length", 1);

  cy.get(".cart_quantity_delete").first().click();

  cy.get("#empty_cart")
    .should("be.visible")
    .and("contain.text", "Cart is empty!");
});

// Quando o usuário finaliza uma compra

Cypress.Commands.add("finalizarCompraValidacao", (email, password, product) => {
  cy.visit("/login");

  cy.get('[data-qa="login-email"]').type(email);
  cy.get('[data-qa="login-password"]').type(password);
  cy.get('[data-qa="login-button"]').click();

  cy.visit("/products");

  cy.contains(".productinfo", product.name).click();

  cy.visit("/product_details/1");

  cy.get("#quantity").clear().type("1");
  cy.get(".cart").click();

  cy.contains("Continue Shopping").should("be.visible");
  cy.contains("View Cart").click();

  cy.contains("Proceed To Checkout").click();

  cy.get("#address_delivery .address_firstname").should("not.be.empty");

  cy.get("#product-1 .cart_quantity button")
    .invoke("text")
    .then((text) => {
      const qtd = parseInt(text.trim(), 10);
      expect(qtd).to.be.a("number");
      expect(qtd).to.be.greaterThan(0);
    });

  cy.get("#product-1 .cart_description a").should("have.text", product.name);

  cy.get("#product-1 .cart_price")
    .invoke("text")
    .then((text) => {
      const cleanedText = text.trim().replace(/\s+/g, " ");
      expect(cleanedText).to.include("Rs. 500");
    });
});

// Finalização de compra e download da fatura

Cypress.Commands.add("realizarCompraComFatura", (email, password, product, randomName, cardNumber, cvc, fullYear, month) => {
  
  cy.visit("/login");
  cy.get('[data-qa="login-email"]').type(email);
  cy.get('[data-qa="login-password"]').type(password);
  cy.get('[data-qa="login-button"]').click();

  cy.visit("/products")
  console.log("Produto recebido:", product);
  cy.contains(".productinfo", product.name).click();

  cy.visit("/product_details/1")
  cy.get("#quantity").clear().type("1");
  cy.get(".cart").click();

  cy.contains("Continue Shopping").should("be.visible");
  cy.contains("View Cart").click();

  cy.contains("Proceed To Checkout").click();
  cy.get('[name="message"]').type("Pedido automatizado");

  cy.contains("Place Order").click();

  cy.get('[data-qa="name-on-card"]').type(randomName);
  cy.get('[data-qa="card-number"]').type(cardNumber);
  cy.get('[data-qa="cvc"]').type(cvc);
  cy.get('[data-qa="expiry-month"]').type(month);
  cy.get('[data-qa="expiry-year"]').type(fullYear);
  cy.get('[data-qa="pay-button"]').click();

  cy.contains("Congratulations! Your order has been confirmed!").should("be.visible");

  cy.contains("Download Invoice").should("be.visible").click();
});


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
