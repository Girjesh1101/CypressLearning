class LoginPage {

    // locators
    emailInput = '[name="email"]';
    passwordInput = '#password';
    loginBtn = '#login-btn';


    // Actions
    visit(){
        cy.visit('/login');
    }

    enterEmail(email){
        cy.get(this.emailInput).should('be.visible').type(email);
    }

    enterPassword(password){
        cy.get(this.passwordInput).type(password);
    }

    clickLogin(){
        cy.get(this.loginBtn).click();
    }

    login(email, password){
        this.enterEmail(email);
        this.enterPassword(password);
        this.clickLogin();
    }
}

export default LoginPage;