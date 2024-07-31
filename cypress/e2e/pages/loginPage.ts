import {User} from '../data/users';

class LoginPage  {
    
    elements = {
        userNameInput: () => cy.get('#user-name'),
        passwordInput: () => cy.get('#password'),
        // xpath is not neccesary here, this is just test
        submitButton: () => cy.xpath('//input[@type="submit"]'),
        errorMessageDiv: () =>  cy.get('.error-message-container')
    }
    
    submit = (user: User) => {
        this.elements.userNameInput().type(user.userName);
        this.elements.passwordInput().type(user.password);
        this.elements.submitButton().click();
    }

    verifyElements = () => {
        this.elements.userNameInput().invoke('attr', 'placeholder').should('eq', 'Username');
        this.elements.passwordInput().invoke('attr', 'placeholder').should('eq', 'Password');
        this.elements.submitButton().should('have.value', 'Login');
    }

    verifyErrorMessage = (error: string) => {
        this.elements.errorMessageDiv().should('include.text', error);
    }
}

export default LoginPage;