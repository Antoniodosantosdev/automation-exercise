describe("Carrinho de compras", () => {
 
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit("/products");
  });

  context("Quando um produto é removido do carrinho", () => {
    it("Deve remover um produto do carrinho com sucesso", () => {
      cy.removerPrimeiroProdutoCarrinho();
    });
  });


});
