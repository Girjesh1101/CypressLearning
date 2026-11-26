///<reference types = 'cypress'/>

import LoginPage from "../../pages/LoginPage"
import RegistrationPage from "../../pages/RegistrationPage";
import { customerFactory, loginFactory } from "../../support/factories/customerFactory";

describe('Login tests', ()=>{

    const loginPage = new LoginPage();

    it('should login successfully', ()=>{

        const loginData = loginFactory.valid();
        loginPage.visit();
        loginPage.login(loginData.email, loginData.password);
        
    });


    it.only('should register successfully', ()=>{

        const loginData = loginFactory.valid();
        loginPage.visit();
        const registerData = customerFactory.validCustomer();
        const registrationPage = new RegistrationPage();
        registrationPage.clickRegistration();
        registrationPage.registerAccount(registerData.email, registerData.password, registerData.password);

    })
})