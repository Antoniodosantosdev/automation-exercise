import checkoutPage from "../../pages/checkout/checkoutPage";

Cypress.Commands.add("finalizarEValidarCompra", (email, password, product) => {
  checkoutPage.efetuarLogin(email, password);

  checkoutPage.acessarProduto(product);
  checkoutPage.adicionarProdutoQuantidade("1");
  checkoutPage.acessarCarrinho();

  checkoutPage.irParaCheckout();
  checkoutPage.validarEnderecoEntrega();
  checkoutPage.validarQuantidadeEsperada(product);

  checkoutPage.validarProdutoNoResumo(product);
  checkoutPage.validarPrecoEsperado(product);
});

// Finalização de compra e download da fatura

Cypress.Commands.add(
  "realizarCompraComFatura",
  (email, password, product, paymentDetails) => {
    checkoutPage.efetuarLogin(email, password);

    checkoutPage.acessarProduto(product);
    checkoutPage.adicionarProdutoQuantidade("1");
    checkoutPage.acessarCarrinho();

    checkoutPage.irParaCheckout();
    checkoutPage.validarEnderecoEntrega();
    checkoutPage.preencherMensagemCheckout("Pedido automatizado");
    checkoutPage.clicarEmPlaceOrder();

    checkoutPage.preencherDadosPagamento(paymentDetails);

    checkoutPage.confirmarPagamento();

    checkoutPage.verificarMensagemConfirmacaoCompra();
    checkoutPage.fazerDownloadFatura();
  }
);
