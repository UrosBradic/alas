class ConfirmationPage {
    elements = {
        confirmationHeading: () => cy.get('.complete-header')
    }

    verifyOrder = () => {
        this.elements.confirmationHeading().should('have.text', 'Thank you for your order!');
    }
}

export default ConfirmationPage;