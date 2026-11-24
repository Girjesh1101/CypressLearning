/// <reference types="cypress"/>

describe('Practice UI Elements', () => {

    it.skip('type actions', () => {

        const base_url = 'https://qaplayground.com/practice';

        cy.visit(base_url);
        cy.contains('Input Fields').click();
        cy.get('#movieNameInput').type('Ironman');
        cy.get('#submitMovieBtn').click();
        cy.get('#result-s01').should('contain', 'Ironman');

        // append
        cy.get('#appendInput').type(' Endgame');
        cy.contains('Append Text & Press Tab').click();
        cy.get('#result-s02').should('contain', 'Endgame');
        
        // read value
        // cy.get('#readValueInput').should('have.attr', 'value')

        cy.get('#clearInput').clear();
        cy.get('#clearFieldBtn').click();
        cy.get('#result-s04').should('contain.text', 'Field cleared ✓')

        // disbled input
        cy.get('#disabledInput').should('be.disabled');


    });


    it.skip('Click actions', () => {

        const base_url = 'https://qaplayground.com/practice';

        cy.visit(base_url);
        cy.get('[data-testid="new-practice-card-buttons"]').click({force: true});

        cy.get('#navigateHomeBtn').click();
        cy.get('#result-s01').should('contain.text', 'Navigated to Home Page');

        cy.get('#coordinatesBtn').click();
        cy.get('#result-s02').should('contain.text', 'X:');

        cy.get('#colorBtn').click();
        cy.get('#result-s03').should('contain.text', 'Background: rgb');

        cy.get('#disabledBtn').should('be.disabled');

        cy.get('#doubleClickBtn').dblclick();
        cy.get('#result-s07').should('contain.text', 'Double clicked!');

        cy.get('#rightClickBtn').rightclick();
        cy.get('#result-s08').should('contain.text', 'Context menu triggered!');


        cy.get('#clickHoldBtn').trigger('mousedown', {button: 0}).wait(2000).trigger('mouseup', {button: 0});
        cy.get('#result-s06').should('contain.text', 'Held for 1.5s')
    })


    it.skip('Dropdown actions', () => {

        const base_url = 'https://qaplayground.com/practice';

        cy.visit(base_url);
        cy.get('[data-testid="new-practice-card-dropdowns"]').click();

        cy.get('#fruitSelect').select('Apple').should('have.value', 'apple');
        cy.get('#result-s01').should('contain.text', 'Apple');

        cy.get('#countrySelect').select(2).should('have.value', 'india');
        cy.get('#countrySelect').select('Japan');
        cy.get('#result-s02').should('contain', 'Japan');

        cy.get('#languageSelect').find('option').should('have.length', 4);
        cy.get('#languageSelect').find('option').last().should('have.value', 'typescript');

        

    });

    it.skip('Advance Dropdown actions', () => {

        const base_url = 'https://qaplayground.com/practice';

        cy.visit(base_url);
        cy.get('[data-testid="new-practice-card-dropdowns"]').click();


        const expectedOptions = ['Python', 'Java', 'JavaScript', 'TypeScript'];


        // read all dropdown options
        cy.get('#languageSelect option').each(($option, idx)=>{
            cy.wrap($option).should('have.text', expectedOptions[idx]);
        });

        // assert total number of options
        cy.get('#languageSelect option').should('have.length', 4);

        // select last indext
        cy.get('#languageSelect').find('option').last()
        .should('have.value', 'typescript')
        // .find('option:selected')
        // .should('have.text','TypeScript');

        cy.contains('button', 'Select Last').click();

        const options = cy.get('#result-s03').invoke('text');
        cy.log("options", options);

        const heros= ['batman', 'the-avengers'];
        cy.get("#heroSelect").select(heros);
        cy.get('#result-s04').should('have.text', 'Selected heroes: The Avengers, Batman');

    });

    it('Checkbox actions', () => {

        const base_url = 'https://qaplayground.com/practice';
        cy.visit(base_url);

        cy.get('[data-testid="new-practice-card-radio-checkbox"]').click();
        cy.get('#chk-accept-terms').should('not.be.checked').check().should('be.checked');
        cy.get('#result-s01').should('contain.text', 'Checked');

        
        // group of radio button
        const checkbox = 'business'
        cy.get('[data-testid="radio-plan-group"]').find(`input[value='${checkbox}']`).check(checkbox).should('be.checked');

        const checkboxOptions = ['Playwright', 'Selenium', 'Cypress', 'WebdriverIO'];

        checkboxOptions.forEach((val)=>{
            cy.get('[data-testid="rc-skill-group"]').find(`[value='skill-${val.toLowerCase()}']`).check().should('be.checked');
        })
        
        cy.get('#chk-newsletter').should('be.checked').uncheck().should('not.be.checked');
        cy.get('#result-s04').should('contain.text', 'Unchecked (unsubscribed)');

        cy.get('#chk-disabled').should('be.disabled').click({force: true}).should('be.disabled');
         cy.get('#radio-disabled').should('be.disabled').click({force: true}).should('be.disabled');


        const notification = ['email_marketing', 'push_weekly'];

        notification.forEach(element => {
            cy.get('[data-testid="rc-notification-prefs"]').find(`[name='notif_${element}']`).check().should('be.checked');
        });
        
    });

    


});