describe('Get Greeting Test', () => {
  before(() => cy.visit('/'))

  it('Visits the initial project page', () => {
    cy.contains('Welcome')
    cy.contains('frontend-example app is running!')
    cy.contains('😇 Not called already...')
  })

  it('should switch terminal text', () => {
    cy.get('.test-terminal-line-greeting')
      .contains('😇 Not called already...')
  });

  describe('Click the Request-Greeting button', () => {
    before(() => {
      cy.intercept('/api/greeting', {
        body: 'Cypress Greeting Response',
      })
    })

    before(() => cy.get('.test-request-greeting-btn')
      .should('be.visible')
      .click()
    );

    it('should switch terminal text', () => {
      cy.get('.test-terminal-line-greeting').contains('🥳 Cypress Greeting Response')
    });
  });
})
