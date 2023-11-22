describe('Acesso ao sistema de teste', () => {
	beforeEach(() => {
		cy.visit('https://www.saucedemo.com/');
	});

	it('Validar a tela de login', () => {
		cy.title().should('eq', 'Swag Labs');
	});

	it('Preencher o formulário de login', () => {
		cy.get('#user-name').type('standard_user');
		cy.get('#password').type('secret_sauce');
		cy.get('#login-button').click();
		cy.get('.app_logo').should('contain', 'Swag Labs');

		cy.get('.product_sort_container').select('Price (high to low)');
		cy.get('.inventory_item_price').first().should('contain', '$49.99');
		cy.get('.inventory_item_name')
			.first()
			.should('contain', 'Sauce Labs Fleece Jacket')
			.click();
		cy.get('.btn_primary.btn_inventory').click();
		cy.get('.shopping_cart_link').click();
		cy.get('.cart_item').should('have.length', 1);
		cy.get('.cart_item').should('contain', 'Sauce Labs Fleece Jacket');
		cy.get('.btn_action.checkout_button').click();
		cy.get('#first-name').type('Teste');
		cy.get('#last-name').type('Teste');
		cy.get('#postal-code').type('00000-000');
		cy.get('.btn_primary.cart_button').click();
		cy.get('#finish').click();
		cy.get('.complete-header').should('contain', 'Thank you for your order!');
		cy.get('.shopping_cart_link').click();
		cy.get('.cart_item').should('have.length', 0);
	});
});
