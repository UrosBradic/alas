import { forEach } from "cypress/types/lodash";

class ShoppingCartPage {
    elements = {
        cartItem: () => cy.get('.cart_item'),
        shoppingCartLink: () => cy.get('.shopping_cart_link'),
        itemTitle: () => cy.get('.inventory_item_name'),
        checkoutButton: () => cy.get('#checkout')
    }
    
    verifyNumOfItems = (num: number) => {
        this.elements.cartItem().should('have.length', num);
    }

    verifyItems = (items: string[]) => {
        items.forEach((item) => {
            this.elements.itemTitle().contains(item).should('have.length', 1);
        })
    }

    // id of the remove button is created from product name with "remove-" prefix
    // example: "Sauce Labs Backpack" => "remove-sauce-labs-backpack"
    removeItem = (item: string)=> {
        const removeButtonId = item.toLowerCase().replace(/\s+/g, '-');
        cy.get(`#remove-${removeButtonId}`).click();
    }

    checkout = () => {
        this.elements.checkoutButton().click();
    }
}

export default ShoppingCartPage;