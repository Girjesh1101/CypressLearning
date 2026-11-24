import { faker } from "@faker-js/faker";

export const generateEmail = ()=>{
    return `user${Date.now()}@yopmail.com`;
}

export const generateName = ()=>{
    return faker.person.firstName();
}

export const generatePassword = ()=>{
    return 'Automation@2026';
};