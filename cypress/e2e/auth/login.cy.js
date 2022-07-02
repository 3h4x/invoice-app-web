/// <reference types="cypress" />

context('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('fill invalid email', () => {
    cy.get('[data-test=email]')
     .type('invalid-email')
    cy.get('[data-test=password]')
      .type('password{enter}')

    cy.get('[data-test=email-error]')
    .should('be.visible')

    cy.get('[data-test=email]')
      .clear()

    cy.get('[data-test=password-error]')
    .should('be.not.visible')
  })

  it('fill invalid user credentials', () => {
    cy.get('[data-test=email]')
      .type('invalid@email.com').should('have.value', 'invalid@email.com')
    cy.get('[data-test=password]')
      .type('test-password').should('have.value', 'test-password')
      .type('{enter}')

    cy.get('[id=login-error]')
      .should('be.visible')
      .should('contain', 'Login error: Invalid Credentials')

    cy.location('pathname').should('eq', '/login')
  })

  it('fill valid user credentials', () => {
    cy.get('[data-test=email]')
      .type('fake_user1@officehourtesting.com')
      .should('have.value', 'fake_user1@officehourtesting.com')
    cy.get('[data-test=password]')
      .type('123456').should('have.value', '123456')
      .type('{enter}')

    cy.get('.Toastify__toast-body')
      .should('be.visible')
      .should('contain', 'Logged in!')

    cy.location('pathname').should('eq', '/')
  })

  it('cy.reload() - reload the page', () => {
    // https://on.cypress.io/reload
    cy.reload()

    // reload the page without using the cache
    cy.reload(true)
  })

  it('inputs get typed data', () => {
    cy.get('[data-test=email]').should('be.visible')
    cy.get('[data-test=email-error]').should('not.be.visible')
    cy.get('[data-test=email]')
      .type('invalid@email.com').should('have.value', 'invalid@email.com')

      // .type() with special character sequences
      .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
      .type('{del}{selectall}{backspace}')

      // .type() with key modifiers
      .type('{alt}{option}') //these are equivalent
      .type('{ctrl}{control}') //these are equivalent
      .type('{meta}{command}{cmd}') //these are equivalent
      .type('{shift}')

      // Delay each keypress by 0.1 sec
      .type('slow-typing-invalid@email.com', { delay: 100 })
      .should('have.value', 'slow-typing-invalid@email.com')
    // password
    cy.get('[data-test=password]').should('be.visible')
    cy.get('[data-test=password-error]').should('not.be.visible')
    cy.get('[data-test=password]')
      .type('invalid-password').should('have.value', 'invalid-password')

      // .type() with special character sequences
      .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
      .type('{del}{selectall}{backspace}')

      // .type() with key modifiers
      .type('{alt}{option}') //these are equivalent
      .type('{ctrl}{control}') //these are equivalent
      .type('{meta}{command}{cmd}') //these are equivalent
      .type('{shift}')

      // Delay each keypress by 0.1 sec
      .type('slow-typing-invalid-password', { delay: 100 })
      .should('have.value', 'slow-typing-invalid-password')
  })

  it('cy.reload() - reload the page', () => {
    // https://on.cypress.io/reload
    cy.reload()

    // reload the page without using the cache
    cy.reload(true)
  })

})
