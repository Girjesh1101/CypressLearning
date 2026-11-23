///<reference types ='cypress'/>

describe('Product API Tests', ()=>{

    const baseUrl = 'https://api.practicesoftwaretesting.com';


    it('TC01- Get All products', ()=>{

        cy.request({
            method: 'GET',
            url: baseUrl+'/products'
        }).then((response)=>{
            expect(response.status).to.equals(200);
            expect(response.body).to.exist;
            expect(response.duration).to.be.lessThan(5000);
            cy.log("my response",JSON.stringify(response.body.data[0]));
        })
    })

    it('TC02- GET product by ID', ()=>{

        const productId = '263';
        cy.request({
            method: 'GET',
            url: baseUrl+`/products/${productId}`,
            failOnStatusCode: false
        }).then((response)=>{
            expect(response.status).to.equal(404);
            cy.log(JSON.stringify(response.body));
        })
    })

    it('POST')
})