///<reference types ='cypress' />

describe('Product Search - Network Testing', () => {

  it('should intercept and validate product search API', () => {

    cy.intercept('GET', '**/products/search*').as('searchProducts');

    cy.visit('https://practicesoftwaretesting.com/');

    cy.get('[data-test="search-query"]').type('Hammer');

    cy.get('[data-test="search-submit"]').click();

    cy.wait('@searchProducts', {timeout: 10000}).then((interception) => {

      expect(interception.response.statusCode).to.equal(200);

      cy.log(JSON.stringify(interception.response.body));

    });

    cy.get('[data-test="product-name"]').should('be.visible');

  });

  it.only('debug intercept', ()=>{

    cy.intercept('GET', '**/products/search*', (req) =>{
        cy.log('Intercept URL', req.url);
        console.log('Intercept URL', req.url);
        req.continue;
    }).as('productSearch')
  })

  it('Mock an API response', ()=>{

    cy.intercept('GET', '**/products/search*', {
        body:{
            data: [
                {
                    id: 101,
                    name: 'Test Hammer',
                    price: 25
                }
            ]
        }
    }).as('mockProducts');
  })

});