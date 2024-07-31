class OverviewPage {
    elements = {
        finishButton: () => cy.get('#finish')
    }

    finish = () => {
        this.elements.finishButton().click();
    }
}

export default OverviewPage;