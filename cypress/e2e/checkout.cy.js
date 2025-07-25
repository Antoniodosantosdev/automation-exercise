describe("Checkout de compras", () => {
  const email = "maverick3@gmail.com";
  const password = "teste@123";
  const randomName = Cypress.gerador.person.fullName();
  const cardNumber = Cypress.gerador.finance.creditCardNumber();
  const cvc = Cypress.gerador.finance.creditCardCVV();
  const month = Cypress.gerador.date.month({ abbreviated: false });
  const fullYear = Cypress.gerador.date.future().getFullYear();

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit("/login");
  });

  context("Finalização de compra e download da fatura", () => {
    it("Deve validar dados na finalização da compra", () => {
      cy.fixture("productData").then((data) => {
        cy.finalizarEValidarCompra(email, password,  data.blueTop);
      });
    });
  });

  context("Download da fatura após a ordem de compra", () => {
    it("Deve permite o download da fatura após a compra", () => {
      cy.fixture("productData").then((data) => {
        cy.realizarCompraComFatura(
          email,
          password,
          data.winterTop,
          {
            randomName,
            cardNumber,
            cvc,
            month,
            fullYear,
          }
        );
      });
    });
  });
});
