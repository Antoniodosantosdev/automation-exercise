describe('Teste de Login', () => {
  beforeEach(() => {
    
    cy.visit('/');
  });
    it('Webapp deve estar online', () => {
        cy.title('Automation Exercise')
        .should('include', 'Automation Exercise');
    })
    

});
