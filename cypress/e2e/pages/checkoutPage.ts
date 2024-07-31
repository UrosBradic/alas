import { Client } from "../data/users";

class CheckoutPage {
    elements = {
        firstNameInput: cy.get('#first-name'),
        lastNameInput: cy.get('#last-name'),
        zipCodeInput: cy.get('#postal-code'),
        continueButton: cy.get('#continue'),
    }

    submit = (client: Client) => {
        this.elements.firstNameInput.type(client.firstName);
        this.elements.lastNameInput.type(client.lastName);
        this.elements.zipCodeInput.type(client.zipCode);
        this.elements.continueButton.click();
    }

}

export default CheckoutPage;