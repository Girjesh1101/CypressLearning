class RegistrationPage {

    registrationBtn = 'Register';
    emailInput = '#register-email';
    passwordInput = '#register-password';
    confirmPasswordInput = '[placeholder="Repeat your password"]';
    createAccountBtn = '[data-testid="register-btn"]';


    clickRegistration(){
        cy.contains('a', this.registrationBtn).click();
    }

    enterEmail(email){
        cy.get(this.emailInput).type(email);
    }
    
    enterPassword(password){
        cy.get(this.passwordInput).type(password);
    }

    enterConfirmPassword(confirmPassword){
        cy.get(this.confirmPasswordInput).type(confirmPassword);
    }

    clickCreateAccount(){
        cy.get(this.createAccountBtn).click();
    }

    registerAccount(email, passowrd, repassword){
        this.enterEmail(email);
        this.enterPassword(passowrd);
        this.enterConfirmPassword(repassword);
        this.clickCreateAccount();
    }

}

export default RegistrationPage;