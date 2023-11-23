describe('Acesso ao sistema de teste', () => {
	beforeEach(() => {
		cy.visit('https://projetoweb1hoteljpand.000webhostapp.com/index.php/');
	});

	it('Validar a página', () => {
		cy.title().should('eq', 'Hotelaria do Diego - Home');
	});

	it('Testes', () => {
		// Validar se possui quartos disponíveis
		cy.get('.card').should('have.length', 1);
		cy.get('.btn-primary').should('contain', 'Ver mais quartos').click();
		cy.get('.quarto').should('have.length', 1);

		// Reservar quarto
		cy.get('.btn-primary').should('contain', 'Detalhes').click();
		cy.get('.btn-primary').should('contain', 'Reservar').click();
		cy.get('.btn-primary').should('contain', 'Efetuar Reserva').click();
		cy.get('#validationCustom01').type('Eduarda Dalmas');
		cy.get('#validationCustom02').type('eduardadalmas@ienh.com.br');
		cy.get('#validationCustomUsername').type('05/01/2024');
		cy.get('#quarto').first().should('contain', '123');
		cy.get('#validationCustom05').type('1');
		cy.get('#invalidCheck').click();
		cy.get('.btn-primary').should('contain', 'Fazer Reserva').click();
		cy.visit('https://projetoweb1hoteljpand.000webhostapp.com/index.php/');

		// Incluir quarto no admin
		cy.get('.btn-primary').should('contain', 'Painel admin').click();
		cy.get('.btn-primary').should('contain', 'Criar quartos').click();
		cy.get('#quarto').type('NY - vista para o Central Park');
		cy.get('#descricao').type('Quarto com vista para o Central Park');
		cy.get('#valor').type('R$5.000,00 dia');
		cy.get('#imagem').click().first().click();
		cy.get('.btn-primary').should('contain', 'Adicionar quarto').click();

		// Editar quarto no admin
		cy.get('.btn-primary').should('contain', 'Painel admin').click();
		cy.get('.btn-primary').should('contain', 'Visualizar quartos').click();
		cy.get('.btn-primary').should('contain', 'Editar Quarto').first().click();
		cy.get('#descricao').type('Quarto com vista para as Maldivas');
		cy.get('#valor').type('R$10.000,00 dia');
		cy.get('.btn-primary').should('contain', 'Salvar').click();

		// Excluir quarto no admin
		cy.get('.btn-primary').should('contain', 'Painel admin').click();
		cy.get('.btn-primary').should('contain', 'Visualizar quartos').click();
		cy.get('.btn-primary').should('contain', 'Excluir Quarto').first().click();
	});
});
