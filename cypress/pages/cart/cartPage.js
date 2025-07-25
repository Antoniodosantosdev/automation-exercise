import { cartElements }  from "./cartElements";

class cartPage {

    adicionarPrimeiroProdutoAoCarrinho() {
        cy.get(cartElements.addToCartButton).first().click()
    }

    verificarBotaoContinueShopping() {
        cy.contains(cartElements.continueShoppingButton).should("be.visible")

    }

    acessarCarrinho() {
        cy.contains(cartElements.viewCartButton).click()

    }

     verificarProdutoNaTabela() {
        cy.get(cartElements.productTable).should("have.length", 1) 
     }

     removerProdutoDoCarrinho() {
        cy.get(cartElements.removerProdutoButton).click()
     }
     
     verificarCarrinhoVazio() {
        cy.get(cartElements.messageEmptyCart)
          .should("be.visible")
          .and("contain.text", "Cart is empty");
     }
 
}


export default new cartPage();