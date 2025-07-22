// products.cy.js
describe("Products", () => {
  beforeEach(() => {
    cy.visit("/products");
  });
  const randomQuantity = Cypress.gerador.number.int({ min: 1, max: 10 });

  context("Pesquisar um produto especifico", () => {
    it("Deve pesquisar por um produto especifico", () => {
      cy.fixture("productData").then((data) => {
        
        cy.get("#search_product").type(data.blueTop.name); 
        cy.get("#submit_search").click();

        cy.get(".productinfo").should("contain", data.blueTop.name); 
      });
    });
  });

  context("Adicionar um produto ao carrinho", () => {
    it("Deve Adiciona um produto ao carrinho", () => {
      cy.fixture("productData").then((data) => {
        
        cy.contains(".productinfo", data.blueTop.name) 
          .parents(".product-image-wrapper")
          .trigger("mouseover");

        cy.contains(".productinfo", data.blueTop.name)
          .parents(".product-image-wrapper")
          .contains("Add to cart")
          .click();

        cy.contains("Continue Shopping").should("be.visible");
        cy.contains("View Cart").click();

        cy.get(".cart_description").should("contain", data.blueTop.name); 
      });
    });
  });

  

  
  context("Pesquisa de produto usando o botão de pesquisa", () => {
    it("Deve pesquisar um produto usando o botão de pesquisa", () => {
      cy.fixture("productData").then((data) => {
        
        cy.get("#search_product").type(data.blueTop.name); 
        cy.get("#submit_search").click();

        cy.get(".productinfo").should("contain", data.blueTop.name); 
      });
    });
  });
});
