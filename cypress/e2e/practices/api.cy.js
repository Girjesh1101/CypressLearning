/// <reference types = 'cypress'/>

describe('Learning API CRUD', ()=>{

    const baseURL = 'https://jsonplaceholder.typicode.com';
    let id;

    it('GET API', ()=>{

        
        cy.request({
            method: 'GET',
            url: baseURL+'/posts',

        }).then((response)=>{

            // verify status code
            expect(response.status).to.equal(200);

            // verify response body exists
            expect(response.body).to.exist;

            // verify response duration
            expect(response.duration).to.be.lessThan(5000);

            cy.log(JSON.stringify(response.body));

        })
    })

    it('POST - Create a post', ()=>{

        const requestBody = {
            title: "Automation testing in cypress",
            body: "SDET",
            userId:1,
        };

        cy.request({
            method: 'POST',
            url: baseURL+'/posts',
            body: requestBody
        }).then((response)=>{
            expect(response.status).to.eq(201);
            expect(response.body.title).to.equals(requestBody.title);
            expect(response.body.id).to.exist;

            id = response.body.id;
            cy.log(id); 
        });
    })

    it('GET post by ID', ()=>{

        const postId = 1;
        cy.request({
            method: 'GET',
            url: `${baseURL}/posts/${postId}`
        }).then((response)=>{
            expect(response.status).to.eq(200);
            expect(response.body.id).to.equal(postId);
            // expect(response.body.name).to.equal('Automation');
        })
    })

    it('PUT- update post', ()=>{

        const updatedBody = {
            id: 1,
            title: 'Updated Cypress Title',
            body: 'Updated complete post',
            userId: 1
        }

        cy.request({
            method: 'PUT',
            body: updatedBody,
            url: baseURL+'/posts/1'
        }).then((response)=>{
            expect(response.status).to.eq(200);
            expect(response.body.name).to.equal(updatedBody.name);
            expect(response.body.body).to.equal(updatedBody.body);
            expect(response.body.id).to.equal(1);
        })
    })

    it('PATCH - Update post title', () => {

        const requestBody = {
            title: 'Only Title Updated'
        };

        cy.request({
            method: 'PATCH',
            url: `${baseURL}/posts/1`,
            body: requestBody
        }).then((response) => {

            expect(response.status).to.equal(200);

            expect(response.body.title)
            .to.equal('Only Title Updated');

        });

    });

    it('Delete API', ()=>{

        cy.request({
            method: 'DELETE',
            url: baseURL+'/posts/1'
        }).then((response)=>{
            expect(response.status).to.equal(200);
        });
    })

    it('API headers', ()=>{
        cy.request({
            method: 'POST',
            url: baseURL+ '/posts',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: {
                title: 'testing headers',
                body: 'Cypress API practice',
                userId: 1
            }
        }).then((response)=>{

            expect(response.status).to.equal(201);
            expect(response.body.id).to.exist;
            cy.log(JSON.stringify(response.body));
        })
    })

    it('Bearer Token Authentication', ()=>{

        const token = 'thisisbearertoken';
        cy.request({
            method : 'GET',
            url: baseURL+ '/posts',
            headers : {
                Authorization: `Bearer ${token}`
            }
        }).then((response)=>{
            expect(response.status).to.eq(200);
        })
    })

    it('Query paramters API', ()=>{


        cy.request({
            method: 'GET',
            url: `${baseURL}/posts`,
            qs: {
                userId:1
            }
        }).then((response)=>{
            expect(response.status).to.equal(200);
            expect(response.body.length).to.be.greaterThan(0);
        });
    })

    it('API Chaining API', ()=>{
        cy.request('POST', `${baseURL}/users`, {
        name: 'Test User',
        email: 'test@example.com'
        }).then((response) => {

        const userId = response.body.id;

        cy.log(`Created User ID: ${userId}`);

        cy.request('GET', `${baseUrl}/users/${userId}`)
            .then((getResponse) => {

            expect(getResponse.status).to.equal(200);

            });

        });
    })

    it.only('should return 404 for invalid resource', ()=>{

        cy.request({
            method: 'GET',
            url: `${baseURL}/posts/9999999`,
            failOnStatusCode: false
        }).then((response)=>{
            expect(response.status).to.eq(404);
        });
    });


})