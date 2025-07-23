// products.cy.js
describe("Products", () => {
  beforeEach(() => {
    cy.visit("/products");
  });
  

  context("Pesquisar um produto especifico", () => {
    it("Deve pesquisar por um produto especifico", () => {
      cy.fixture("productData").then((data) => {
        cy.pesquisarProduto(data.blueTop);
      });
    });
  });

  context("Adicionar um produto ao carrinho", () => {
    it("Deve Adiciona um produto ao carrinho", () => {
      cy.fixture("productData").then((data) => {
        cy.adicionarProdutoAoCarrinho(data.blueTop);
      });
    });
  });

  context("Pesquisa de produto usando o botão de pesquisa", () => {
    it("Deve pesquisar um produto usando o botão de pesquisa", () => {

      cy.fixture("productData").then((data) => {
        cy.pesquisarProdutoComBotao(data.winterTop );
        
      });
    });
  });
});
