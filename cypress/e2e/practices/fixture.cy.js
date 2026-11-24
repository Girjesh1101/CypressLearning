///<reference types='cypress' />

describe('Advance Cypress topics', ()=>{

    it('learning fixture - should read product test data', ()=>{

        cy.fixture('product').then((data)=>{ // use fixture('fileName')
            cy.log(data.validProduct.name);
            cy.log(data.invalidProduct.name);
        })
    })

    it.skip('fixture in API', ()=>{
        cy.fixture('product').then((data)=>{

            cy.request({
            method: 'POST',
            url: 'https://jsonplaceholder.typicode.com/posts',
            body: {
                title: data.validProduct.name,
                body:'Cypress fixture practice',
                userId: 1
                }
            }).then((response)=>{
                expect(response.status).to.eq(201);
                cy.log(JSON.stringify(response.body))
                expect(response.body.title).to.equal(data.validProduct.name);
            })
        })
    })

    it('read .env file', ()=>{

        const apiBaseUrl = Cypress.env('apiUrl');
        cy.log('api_url', apiBaseUrl);

        cy.visit('/');
    })
})