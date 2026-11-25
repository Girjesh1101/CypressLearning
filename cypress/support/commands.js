// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email, password)=>{
    cy.visit('https://eventhub.rahulshettyacademy.com/login');
    cy.get('[name="email"]').should('be.visible').type(email);
    cy.get('#password').should('be.visible').type(password, {log: false});
    cy.get('#login-btn').click();
})


Cypress.Commands.add('loginWithSession', (email , password) =>{

    cy.session(
        [email, password],
        ()=> {
            cy.visit('https://eventhub.rahulshettyacademy.com/login');
            cy.get('[name="email"]').should('be.visible').type(email);
            cy.get('#password').should('be.visible').type(password, {log: false});
            cy.get('#login-btn').click();

            // cy.url().should('contain', '/events');
        },
        {
            validate() {
                cy.visit('/events');
                // cy.url().should('not.be', '/events');
            }
        }
    );
});

Cypress.Commands.add('apiLogin', (email, password)=>{
    cy.session([email, password], ()=>{
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

            const token = response.body.token;

            cy.visit('/', {
                onBeforeLoad(win){
                    win.localStorage.setItem('token', token);
                }
            });

        });
    }, {
        validate(){
             cy.visit('/');
             cy.window().then((win)=>{
                expect(
                    win.localStorage.getItem('token')
                ).to.be.a('string').and.not.be.empty;
             })
        }
    })

})