import { faker } from "@faker-js/faker"

export const generateCustomerData = ()=>{
    return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: 'Automation@2026'
    }
}