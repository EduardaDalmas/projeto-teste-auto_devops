// commands.js
import 'cypress-file-upload';

describe('Acesso ao sistema de teste', () => {
	Cypress.on('uncaught:exception', (err, runnable) => {
		return false;
	});

	beforeEach(() => {
		cy.visit('https://projetoweb1hoteljpand.000webhostapp.com');
	});

	it('Validar a página', () => {
		cy.title().should('eq', 'Hotelaria do Diego - Home');
	});

	it('Testes', () => {
		// Validar se possui quartos disponíveis
		cy.get('.card').should('have.length', 1);
		cy.wait(1000); // Aguarda 1 segundo
		cy.get('.btn-primary').contains('Ver mais quartos').click();
		cy.get('.quarto').should('have.length.gte', 8);
		cy.wait(3000); // Aguarda 3 segundo

		// Reservar quarto
		cy.visit('https://projetoweb1hoteljpand.000webhostapp.com');
		cy.get('.btn-primary').contains('Detalhes').click();
		cy.wait(3000); // Aguarda 3 segundo
		cy.contains('a.btn-primary', 'Reservar').click();
		cy.wait(3000); // Aguarda 3 segundo
		cy.get(
			'button.btn.btn-primary[data-toggle="modal"][data-target="#confirmationModal"]'
		).click();
		cy.wait(3000); // Aguarda 3 segundo
		cy.get('#validationCustom01').type('Eduarda Dalmas');
		cy.get('#validationCustom02').type('eduardadalmas@ienh.com.br');
		const dataCheckin = '2023-12-01';
		cy.get('#validationCustomUsername').type(dataCheckin);
		cy.get('#validationCustomUsername').should('have.value', dataCheckin);
		const numeroHospedes = 3;
		cy.get('#validationCustom05').type(numeroHospedes);
		cy.get('#validationCustom05').should('have.value', String(numeroHospedes));

		cy.get('#invalidCheck').click();
		cy.get('.btn-primary').should('contain', 'Fazer Reserva').click();
		cy.visit('https://projetoweb1hoteljpand.000webhostapp.com/index.php/');
		cy.wait(3000); // Aguarda 3 segundo

		// Incluir quarto no admin
		cy.get('.btn-primary').contains('Painel admin').click();
		cy.wait(1000); // Aguarda 1 segundo
		cy.get('.btn-primary').contains('Criar quartos').click();
		cy.wait(3000); // Aguarda 3 segundo
		cy.get('#quarto').type('NY - vista para o Central Park');
		cy.get('#descricao').type('Quarto com vista para o Central Park');
		cy.get('#valor').type('R$5.000,00 dia');
		const caminhoDoArquivo = '../../assets/foto.jpg';
		cy.get('#imagem').should('be.visible').attachFile(caminhoDoArquivo);
		cy.get('.btn-primary').should('contain', 'Adicionar quarto').click();
		cy.wait(3000); // Aguarda 3 segundo

		// Editar quarto no admin
		cy.get('.btn-primary').contains('Painel admin').click();
		cy.get('.btn-primary').contains('Visualizar quartos').click();
		cy.get('.btn-primary').contains('Editar Quarto').click();
		cy.get('#descricao').type('Quarto com vista para as Maldivas');
		cy.get('#valor').type('R$10.000,00 dia');
		cy.get('.btn-primary').should('contain', 'Salvar').click();
		cy.wait(3000); // Aguarda 3 segundo

		// Excluir quarto no admin
		cy.get('.btn-danger').contains('Excluir Quarto').click();
	});
});
