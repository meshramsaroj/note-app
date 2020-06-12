// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.request('/').then((response) => {
      expect(response.status).to.eq(200)
    })

    cy.request('/callback').then((response) => {
      expect(response.status).to.eq(200)
    })

    cy.request('/home').then((response) => {
      expect(response.status).to.eq(200)
    })

    cy.visit('/')
    cy.contains('note-vue').end()
  })
})
