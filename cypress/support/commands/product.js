import productPage from "../../pages/products/productPage"

Cypress.Commands.add("pesquisarProduto", (product) => {
  productPage.pesquisarNomeProduto(product.name);
  productPage.pesquisarComBotao();
  productPage.resultadoProduto(product.name);
});

// Adicionar um produto ao carrinho
Cypress.Commands.add("adicionarProdutoAoCarrinho", (product) => {
  productPage.adicionaProduto(product);
});
