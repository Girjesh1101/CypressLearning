import { faker } from "@faker-js/faker"

export const generateCustomerData = ()=>{
    return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: 'Automation@2026'
    }
}

export const customerFactory = {

    validCustomer(overrides = {}){
        return {
            name: faker.person.fullName(),
            email: `customer-${faker.string.uuid()}@yopmail.com`,
            password: 'Automation@2026',
            ...overrides
        };
    },

    invalidCustomer(){
        return {
            name: faker.person.fullName(),
            email: 'invalid-email',
            password: 'wrongpassword'
        }
    }
}

export const loginFactory = {

    valid(){
        return {
            email: 'prem@yopmail.com',
            password: 'Automation@2026'
        };
    },
    invalid(){
        return {
            email: 'wrongeamil@gamil.com',
            password: 'wrongPassword@123'
        }
    }
} 