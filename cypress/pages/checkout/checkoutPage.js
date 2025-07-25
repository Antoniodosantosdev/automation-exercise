import checkoutElements from "./checkoutElements";

class checkoutPage {
  acessarLogin() {
    cy.visit("/login");
  }

  preencherEmail(email) {
    cy.get(checkoutElements.inputEmail).type(email);
  }

  preencherSenhaEAutenticar(password) {
    cy.get(checkoutElements.passwordInput).type(password);
    cy.get(checkoutElements.loginButton).click();
  }

  efetuarLogin(email, password) {
    this.preencherEmail(email);
    this.preencherSenhaEAutenticar(password);
  }

  acessarProduto(product) {
    cy.visit("/products");

    cy.contains(".product-image-wrapper", product.name)
      .find('a[href*="/product_details"]')
      .first()
      .click();
  }

  adicionarProdutoQuantidade(qtd) {
    cy.get(checkoutElements.quantityInput).clear().type(qtd);
    cy.get(checkoutElements.addToCartButton).click();
  }

  acessarCarrinho() {
    cy.contains(checkoutElements.continueShoppingButton).should("be.visible");
    cy.contains(checkoutElements.viewCartButton).click();
  }

  irParaCheckout() {
    cy.contains(checkoutElements.proceedToCheckout).click();
  }

  validarEnderecoEntrega() {
    cy.get(checkoutElements.addressName).should("not.be.empty");
  }

  validarQuantidadeEsperada(product) {
    cy.get(checkoutElements.cartQuantityButton(product.id))
      .invoke("text")
      .then((text) => {
        const qtd = parseInt(text.trim(), 10);
        expect(qtd).to.be.a("number");
        expect(qtd).to.be.greaterThan(0);
      });
  }

  validarProdutoNoResumo(product) {
    cy.get(checkoutElements.cartDescriptionName(product.id)).should(
      "have.text",
      product.name
    );
  }

  validarPrecoEsperado(product) {
    cy.get(checkoutElements.cartPrice(product.id))
      .invoke("text")
      .then((text) => {
        const cleanedText = text.trim().replace(/\s+/g, " ");
        expect(cleanedText).to.include(product.price);
      });
  }

  preencherMensagemCheckout(message) {
    cy.get(checkoutElements.textareaMensagem).type(message);
  }

  clicarEmPlaceOrder() {
    cy.contains(checkoutElements.placeOrderButton).click();
  }

  preencherDadosPagamento({ randomName, cardNumber, cvc, month, fullYear }) {
    cy.get(checkoutElements.cardName).type(randomName);
    cy.get(checkoutElements.cardNumber).type(cardNumber);
    cy.get(checkoutElements.cardCVC).type(cvc);
    cy.get(checkoutElements.cardMonth).type(month);
    cy.get(checkoutElements.cardYear).type(fullYear);
  }

  confirmarPagamento() {
    cy.get(checkoutElements.payButton).click();
  }

  verificarMensagemConfirmacaoCompra() {
    cy.contains(checkoutElements.orderConfirmedMessage).should("be.visible");
  }

  fazerDownloadFatura() {
    cy.contains(checkoutElements.downloadInvoiceButton).should("be.visible").click();
  }
}

export default new checkoutPage();
