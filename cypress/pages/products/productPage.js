import { productElements } from "./productElements";

class productPage {

    pesquisarNomeProduto(product) {
        cy.get(productElements.inputSearch).type(product);

    }
    pesquisarComBotao() {
        cy.get(productElements.buttonSearch).click()
    }

    resultadoProduto(product) {
        cy.get(productElements.productResult).should("contain", product)
    }

    

    adicionaProduto(product) {
        cy.contains(productElements.productResult, product.name)
            .parents(productElements.productWrapper)
            .trigger("mouseover")
            .contains(productElements.addCart)
            .click()

        // Aguarda o modal aparecer e clica em "Ver Carrinho"
        cy.contains(productElements.productSucess).should("be.visible");
        cy.contains(productElements.cartVerification).click();

        cy.get(productElements.descriptionCart).should("contain", product.name);
    }


}


 export default new productPage();