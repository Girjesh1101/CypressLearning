/// <reference types='cypress'/>

describe('Advance practice', ()=>{

    it.skip('form fillup', ()=>{

        const baseUrl = 'https://qaplayground.com/practice/forms';
        const username = 'automation@example.com';
        const password = 'password@123'

        cy.visit(baseUrl);
        cy.get('h1.mb-2').then(($ele)=>{
            const text = $ele.text();
            cy.log(text);
        })
        cy.get('h1.mb-2').should('have.text', 'Form Automation Practice');
        cy.get('#login-email').type(username);
        cy.get('#login-password').type(password);
        cy.get('#loginSubmitBtn').click({force:true});
        cy.get('#loginResult').should('contain.text', `Login successful! Welcome, ${username}.`);


        const firstName = 'Automation';
        const lastName =  'Cypress';
        cy.get('#firstName').type(firstName);
        cy.get('#lastName').type(lastName);
        cy.get('[data-testid="input-phone"]').type('9876543210');

        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const formattedDate = `${year}-${month}-${day}`;
        cy.log(formattedDate);

        cy.get('#dob').type(formattedDate);
        cy.get('#gender-male').check().should('be.checked');
        cy.get('#personalSubmitBtn').click();
        cy.get('#personalResult').should('contain.text', `Saved: ${firstName} ${lastName}`);

        const country = 'India';
        const city ='Mumbai';
        cy.get('[data-testid="select-country"]').select(country).should('have.value', 'IN');
        cy.get('#city').type(city);
        cy.get('#bio').type('nothing.');

        cy.get('#addressResult').should(`Address saved: ${city}, ${country}`);


        const interest = ['Appium', 'Jest'];
        cy.get('[data-testid="checkbox-group-interests"]').check(interest).should('be.checked');
        cy.get('#interestsSubmitBtn').click();
        cy.get('#interestsResult').should('Interests saved: Appium, Jest');

        const newPassword = 'automation';
        cy.get('#password').type(newPassword);
        cy.get('#confirmPassword').type(newPassword);

        cy.get('#terms').should('not.be.checked').check().should('be.checked');
        cy.get('#submitFormBtn').click();
    })

    it.skip('Advance2', ()=>{

        const base_url = "https://practicesoftwaretesting.com/";
        cy.visit(base_url);
        
        cy.get('[data-test="product-name"]').then((productName)=>{

            const count = productName.length;
            cy.log(count);
            expect(productName.length).to.be.greaterThan(1);

            const firstProductName = productName.first().text();
            cy.log(firstProductName);

            
            const allProductName = [...productName].map((val) =>{
                return val.innerText.trim();
            });
            cy.log(JSON.stringify(allProductName));

        })

        cy.get('[data-test="product-name"]')
        .first()
        .should('be.visible')
        .and('contain.text', 'Pliers');

    })

    it('search product and get all text', ()=>{

        const base_url = "https://practicesoftwaretesting.com/";
        cy.visit(base_url);

        const product = "Pliers";
        cy.get('[data-test="search-query"]').type(product);
        cy.get('[data-test="search-submit"]').click();

        // wait using conditional
        cy.get('[data-test="product-name"]').should('be.visible');
        cy.get('[data-test="product-name"]').then(($product)=>{

            // Extract all product Name
            const allProductName = [...$product].map((val)=>{
                return val.innerText.trim();
            })

            // verify product length
            expect(allProductName.length).to.be.greaterThanOrEqual(1);

            //print all product name
            cy.log(JSON.stringify(allProductName))
        })
    })
})


