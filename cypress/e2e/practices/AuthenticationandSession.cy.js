/// <reference types = 'cypress'/>

import { loginFactory } from "../../support/factories/customerFactory"

// syntax of session
/*
cy.session(
    sessionId,
    setup, {
        validate: () =>{
            // validate session
        }
    }
)
*/

describe('Authentication and session', ()=>{

    it('login first time with session', ()=>{

        const login = loginFactory.valid();
        cy.loginWithSession(login.email , login.password);
        
    })

    it('login without credentials', ()=>{

        // const base_url = 'https://eventhub.rahulshettyacademy.com/login';
        // cy.visit(base_url);

        const login = loginFactory.valid();
        cy.loginWithSession(login.email , login.password);

    })

    it.only('Login with API session', ()=>{

        const login = loginFactory.valid();

        const url = 'https://api.eventhub.rahulshettyacademy.com/api/auth/login';
        cy.request({
            method: "POST",
            url: url,
            body: login
        }).then((response)=>{
            expect(response.status).to.equal(200);
            cy.log(response.body.token);
            expect(response.body.user.email).to.equal(login.email);
        })
    })
})