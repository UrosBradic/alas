export type SelectValueOption = 'az' | 'za' | 'lohi' | 'hilo';

class ProductsPage {
    elements = {
        logo: () => cy.get('.app_logo'),
        productItem: () => cy.get('.inventory_item'),
        itemTitle: () => cy.get('.inventory_item_name'),
        shoppingCartLink: () => cy.get('.shopping_cart_link'),
        productsFilterInput: () => cy.get('.product_sort_container'),
        shoppingCartBadgeSpan: () => cy.get('.shopping_cart_badge'),
    }

    verifyLogo = () => {
        this.elements.logo().should('have.text', 'Swag Labs');
    }

    verifySorting = (value: string) => {
        this.elements.productsFilterInput().should('have.value', value);
    }

    verifyShoppingCartBadge = (value: string) => {
        this.elements.shoppingCartBadgeSpan().should('have.text', value);
    }
    
    selectProductByNumber = (itemNumber: number) => {
        this.elements.productItem().eq(itemNumber-1).find('button').contains('Add to cart').click();
    }

    selectProductByTitle = (title: string) => {
        this.elements.itemTitle().contains(title).contains('Add to cart').click();
    }

    goToItemDetails = (title: string) => {
        this.elements.itemTitle().contains(title).click();
    } 

    openShoppingCart = () => {
        this.elements.shoppingCartLink().click();
    }
    
    goToShoppingCart = () => {
        this.elements.shoppingCartLink().click();
    }

    filterItems = (option: SelectValueOption) => {
        this.elements.productsFilterInput().select(option);
    }
}

export default ProductsPage;