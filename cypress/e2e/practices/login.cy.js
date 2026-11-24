///<reference types = 'cypress'/>

import { generateEmail, generatePassword } from "../../support/utils";


describe('Custom Command', ()=>{

    it('should login successfully', ()=>{

        cy.login('prem@yopmail.com', 'Automation@2026');
        // cy.url().should('contain', 'events');
    })

    it('should register a new user', ()=>{

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
})