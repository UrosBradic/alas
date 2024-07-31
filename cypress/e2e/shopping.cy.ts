require('cypress-xpath');
import {standardUser, invalidUser, standardClient} from './data/users'
import CheckoutPage from './pages/checkoutPage';
import LoginPage from './pages/loginPage';
import ProductDetailsPage from './pages/productDetailsPage';
import ProductsPage from './pages/productsPage';
import ShoppingCartPage from './pages/shoppingCartPage';
import OverviewPage from './pages/overviewPage';

describe('Log in', ()=> {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/');
        cy.verifyUrl('https://www.saucedemo.com/');
    });

    it('Verify element on the page', () => {
        const loginPage  = new LoginPage();
        loginPage.verifyElements();   
    });

    it('Sucessful login', () => {
        const loginPage  = new LoginPage();
        loginPage.submit(standardUser);

        cy.verifyUrl('https://www.saucedemo.com/inventory.html');

        const productsPage = new ProductsPage();
        productsPage.elements.logo().should('have.text', 'Swag Labs');
    });
    
    it('Login fails - invalid password', () => {
        const loginPage  = new LoginPage();
        loginPage.submit(invalidUser);
        loginPage.verifyErrorMessage('Epic sadface');
    });

    it('Sorting', () => {
        const loginPage  =new LoginPage();
        loginPage.submit(standardUser);
        
        const productsPage = new ProductsPage();
        productsPage.verifySorting('az');
        productsPage.filterItems('za');   
        productsPage.verifySorting('za');    
        productsPage.filterItems('lohi');
        productsPage.verifySorting('lohi');
        productsPage.filterItems('hilo');
        productsPage.verifySorting('hilo');
    })

    it('The entire flow from logging to ordering', () => {
        const loginPage  = new LoginPage();
        const item1 = 'Sauce Labs Backpack';
        const item2 = 'Sauce Labs Bike Light';
        loginPage.submit(standardUser);
        
        const productsPage = new ProductsPage();
        productsPage.selectProductByNumber(1);
        const numberOfSelectedProducts: string = '1';
        productsPage.verifyShoppingCartBadge(numberOfSelectedProducts);
        productsPage.goToItemDetails(item2);

        const productDetailsPage = new ProductDetailsPage();
        productDetailsPage.addToCart();
        productDetailsPage.goBackToProducts();

        productsPage.goToShoppingCart();

        //TODO: add items to the shopping cart using API call
        // and separate this part of the test
        const shoppingCartPage = new ShoppingCartPage;
        shoppingCartPage.verifyNumOfItems(2);
        shoppingCartPage.verifyItems([item1, item2]);
        shoppingCartPage.removeItem(item1);
        shoppingCartPage.verifyItems([item2]);
        
        //TODO: add items to the shopping cart using API call
        // and separate this part of the test
        shoppingCartPage.checkout();

        const checkoutPage = new CheckoutPage();
        checkoutPage.submit(standardClient);

        const overviewPage  = new OverviewPage();
        overviewPage.finish();
    })
})