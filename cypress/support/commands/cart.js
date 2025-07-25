import cartPage from "../../pages/cart/cartPage"

Cypress.Commands.add("removerPrimeiroProdutoCarrinho", () => {

  cartPage.adicionarPrimeiroProdutoAoCarrinho();
  cartPage.verificarBotaoContinueShopping();

  cartPage.acessarCarrinho()
  cartPage.verificarProdutoNaTabela()
  cartPage.removerProdutoDoCarrinho()

  cartPage.verificarCarrinhoVazio()



});