class ProductDetailsPage  {
    
    elements = {
        addToCartButton: () => cy.get('#add-to-cart'),
        backToProductsButton: () => cy.get('#back-to-products'),
    }
    
    addToCart = () => {
        this.elements.addToCartButton().click();
    }

    goBackToProducts = () => {
        this.elements.backToProductsButton().click();
    }
}

export default ProductDetailsPage;