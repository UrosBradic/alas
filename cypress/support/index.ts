declare namespace Cypress {
    interface Chainable {
    /**
     * Custom command to verify that url contains path.
     * @example cy.verifyUrl('https://www.saucedemo.com/')
     */
    verifyUrl(value: string): void
    }
}
