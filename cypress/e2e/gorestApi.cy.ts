import { faker } from '@faker-js/faker';

type Status = "active" | "inactive";
type Gender = "male" | "female";
type User = {
    name: string,
    email: string,
    gender: Gender,
    status: Status,
    id?: number
};

describe('Users API Tests', () => {
    // Check the other possibilities to store this token 
    const authToken = Cypress.env('AUTH_TOKEN');
    // This url could be defined in the config file as well
    const url = 'https://gorest.co.in/public/v2/';
    let user: User;
    

    it('Should get a list of users', () => {
        cy.request({
            method: 'GET', 
            url: url+'users',
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.length).to.be.greaterThan(0);
                expect(response.body[0]).to.have.property('name');
                expect(response.body[0]).to.have.property('email');
                expect(response.body[0]).to.have.property('gender');
                expect(response.body[0]).to.have.property('status');
                expect(response.body[0]).to.have.property('id');
            });
    });

    it('Should create a new user', () => {
        const newUser: User = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            gender: 'male',
            status: 'active'
        };

        cy.request({
            method: 'POST', 
            url: url+'users', 
            headers: {
                Authorization: `Bearer ${authToken}`
            },
            body: newUser
        })
            .then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body).to.have.property('id');
                user = response.body;
            
                // Write response to a new file
                cy.writeFile('cypress/e2e/new_user_response.json', JSON.stringify(response.body, null, 2));
        });
    });

    it('Should update an existing user', () => {
        const updatedUser: User = {
            name: 'Jane Smith',
            email: user.email,
            gender: user.gender,
            status: user.status
        };

        cy.request({ 
            method: 'PUT', 
            url: url+'users/'+user.id, 
            headers: {
                Authorization: `Bearer ${authToken}`
            }, 
            body: updatedUser
        })
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('name');
                expect(response.body.name).to.eq('Jane Smith');
            });
    });

    it('Should delete a user', () => {
        cy.request({ 
            method:'DELETE', 
            url: url+'users/'+user.id,
            headers: {
                Authorization: `Bearer ${authToken}`
            }
    })
            .then((response) => {
                expect(response.status).to.eq(204);
            });
    });

    it('Should get "Resource not found" message', () => {
        cy.request({
            method: 'GET', 
            url: url+'users/'+user.id,
            headers: {
                Authorization: `Bearer ${authToken}`
            },
            failOnStatusCode: false
        })
            .then((response) => {
                expect(response.status).to.eq(404);
                expect(response.body).to.have.property('message');
                expect(response.body.message).to.eq('Resource not found');
            });
    });
});
