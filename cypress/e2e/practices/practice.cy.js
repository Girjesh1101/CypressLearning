/// <reference types='cypress'/>


describe("web element interactions ", ()=>{

  it.skip('locators and input ', ()=>{

    cy.visit('https://testautomationpractice.blogspot.com/');
    cy.title().should('not.be.empty');
    cy.get('#name').type("automation");
    cy.get("#email").type("automation@exampl.com");
    cy.get("#phone").type("9876543210");
    cy.get('#textarea').type("this is text box..");
  })

  it.skip('click and radio and checkbox', ()=>{

    cy.visit('https://testautomationpractice.blogspot.com/');
    cy.get('#male').check();
    cy.get('#female').check();
    cy.get('input[value="wednesday"]').check();
    cy.get('input[value="sunday"]').should('not.be.checked').check();

  })

  it('dropdown', ()=>{
      cy.visit('https://qaplayground.com/practice/dropdowns');
      cy.get('#fruitSelect').select(2);
  })


})