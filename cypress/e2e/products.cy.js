

describe("Products", () => {
  beforeEach(() => {
    cy.visit("/products");
  });
  const randomQuantity = Cypress.gerador.number.int ({min: 1, max: 10});
  
  context("Pesquisar um produto especifico", () => {
    it("Deve pesquisar por um produto especifico", () => {
      cy.get("#search_product").type("Blue Top");
      cy.get("#submit_search").click();

      cy.get(".productinfo").should("contain", "Blue Top");
    });
  });

  context("Adicionar um produto ao carrinho", () => {
    it("Deve Adiciona um produto ao carrinho", () => {
      cy.contains(".productinfo", "Blue Top")
        .parents(".product-image-wrapper")
        .trigger("mouseover");

      cy.contains(".productinfo", "Blue Top")
        .parents(".product-image-wrapper")
        .contains("Add to cart")
        .click();

      cy.contains("Continue Shopping").should("be.visible");
      cy.contains("View Cart").click();

      cy.get(".cart_description").should("contain", "Blue Top");
    });
  });

  context("Adicionar quantidade específica de Produto", () => {

    

    beforeEach(() => {
      cy.visit("/products");
    });
    it("Deve adicionar quantidade específica de produtos", () => {
      // Acessa o botão 'View Product' do produto Blue Top
      cy.visit("/product_details/1"); // Blue Top

      cy.get("#quantity")
        .clear().type(randomQuantity);
      cy.get(".cart")
        .click();
      cy.contains("Continue Shopping")
        .should("be.visible");
      cy.contains("View Cart")
        .click();
      cy.get(".cart_quantity .disabled")
        .should("contain", randomQuantity);
    });
  });

  context("Procura pelo Filtro por Categoria de Produtos", () => {
    it("Deve filtrar produtos por categoria", () =>{
        cy.contains("Women")
            .click();
        cy.contains("Dress")
            .click();

        cy.get(".features_items h2").should("contain", "Women - Dress Products");
        cy.get(".productinfo").should("exist");

    });
  });

  context("Pesquisa de produto usando o botão de pesquisa", () => {
    it("Deve pesquisar um produto usando o botão de pesquisa", () => {
      cy.get("#search_product").type("Winter Top");
      cy.get("#submit_search").click();

      cy.get(".productinfo").should("contain", "Winter Top");
    });
  });
});
