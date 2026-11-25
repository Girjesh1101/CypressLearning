///<reference types = 'cypress'/>

import { customerFactory } from "../../support/factories/customerFactory";
import { generateEmail, generatePassword } from "../../support/utils";


describe('Custom Command', ()=>{

    it('should login successfully', ()=>{

        cy.login('prem@yopmail.com', 'Automation@2026');
        // cy.url().should('contain', 'events');
    })

    it.skip('should register a new user', ()=>{

        const email = generateEmail();
        const password = generatePassword();

        cy.log(email);
        cy.visit('https://eventhub.rahulshettyacademy.com/login');
        cy.contains('Register').click();
        cy.get('#register-email').should('be.visible').type(email);
        cy.get('#register-password').should('be.visible').type(password);
        cy.get('input[placeholder="Repeat your password"]').should('be.visible').type(password);
        cy.get('[data-testid="register-btn"]').click();

    })


    it.only('should resgister valid customer', ()=>{
        const customer = customerFactory.validCustomer();

        cy.log(customer.name);
        cy.log(customer.email);

        // premium customer 
        const customer2 = customerFactory.validCustomer({
            accountType : "PREMIUM"
        })

        cy.log(customer2.accountType)
        
    })


    it('should register a invalid user', ()=>{

        cy.visit('https://eventhub.rahulshettyacademy.com/login');
        cy.contains('Register').click();

        const customer = customerFactory.invalidCustomer();
        cy.get('#register-email').should('be.visible').type(customer.email);
        cy.get('#register-password').should('be.visible').type(customer.password);
        cy.get('input[placeholder="Repeat your password"]').should('be.visible').type(customer.password);
        cy.get('[data-testid="register-btn"]').click();

    })
})