describe("Carrinho de compras", () => {
  beforeEach(() => {
      cy.clearCookies()
      cy.clearLocalStorage()
      cy.visit("/products");
  });

  context("Quando um produto é removido do carrinho", () => {
    it("Deve remover um produto do carrinho com sucesso", () => {
      cy.get(".product-image-wrapper .add-to-cart").first().click();

      cy.contains("Continue Shopping").should("be.visible");
      cy.contains("View Cart").click();

      cy.get("tr[id^='product-']").should("have.length", 1);

      cy.get(".cart_quantity_delete").first().click();

      cy.get("#empty_cart")
        .should("be.visible")
        .and("contain.text", "Cart is empty!");
    });
  });
  context("Quando o usuário finaliza uma compra", () => {
    it("Deve validar e exibir os dados na finalização da compra", () => {
      
      cy.visit("/login");
      
      cy.get('[data-qa="login-email"]').type("maverick3@gmail.com");
      cy.get('[data-qa="login-password"]').type("teste@123");
      cy.get('[data-qa="login-button"]').click();

      
      cy.visit("/products");
      cy.contains(".productinfo", "Blue Top").click();
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
          expect(qtd).to.be.greaterThan(0); // ou `equal(1)` se controlar o carrinho
        });

      cy.get("#product-1 .cart_description a").should("have.text", "Blue Top");

      
      cy.get("#product-1 .cart_price")
        .invoke("text")
        .then((text) => {
          const cleanedText = text.trim().replace(/\s+/g, " ");
          expect(cleanedText).to.include("Rs. 500");
        });
    });
  });

  context("Download da fatura após a ordem de compra", () => {
    it.only("Deve permite o download da fatura após a compra", () => {
      cy.visit("/login");
      cy.get('[data-qa="login-email"]').type("maverick3@gmail.com");
      cy.get('[data-qa="login-password"]').type("teste@123");
      cy.get('[data-qa="login-button"]').click();

      cy.visit("/products");
      cy.contains(".productinfo", "Blue Top").click();
      
      cy.visit("/product_details/1");
      cy.get("#quantity").clear().type("1");
      cy.get(".cart").click();
      cy.contains("Continue Shopping").should("be.visible");
      cy.contains("View Cart").click();

      cy.contains("Proceed To Checkout").click();
      cy.get('[name="message"]').type("Pedido automatizado")
      cy.contains("Place Order").click();

      cy.get('[data-qa="name-on-card"]').type("Frederico");
      cy.get('[data-qa="card-number"]').type("1234567890123456 ");
      cy.get('[data-qa="cvc"]').type("123")
      cy.get('[data-qa="expiry-month"]').type("12")
      cy.get('[data-qa="expiry-year"]').type("2026")
      cy.get('[data-qa="pay-button"]').click()

      cy.contains("Congratulations! Your order has been confirmed!").should("be.visible")

      cy.contains("Download Invoice").should("be.visible").click()

      
    })
  })
});
