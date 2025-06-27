describe('template spec', () => {

  Cypress.on('uncought:exaption', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return falce
  })

  const hotels  = '[class="hotels"]';
  const guides  = '[class="guides js-list-guides"]';
  const tours  = '[class="tours js-list-tours"]';
  const things_to_do  = '[class="tours attraction-link"]';
  const login = '[class="menu-link-new"][href="/en-US/Account/Login"]';
  const signup = '[class="menu-link-new"][href="/en-US/Account/Register"]';

  before(() => {

    cy.visit('https://www.accesstravel.com')
    cy.get('[src="/images/logo-new.svg"]').should("be.visible")

  })


  beforeEach(() => {

    cy.viewport(1280, 800)
    cy.visit('https://www.accesstravel.com/en-US/Home/Index')

  })

  it('navigate to the hotel page', () => {
    cy.get(hotels).should("be.visible")
    cy.get(hotels).click()
    cy.get('[class="sub-heading"]').should("be.visible")
  })

  it('navigate to the guides page', () => {
    cy.get(guides).should("be.visible")
    cy.get(guides).click()
    cy.get('[class="col-lg-9 col-md-10 col-sm-12"]').should("be.visible")
  })

  it('navigate to the tours page', () => {
    cy.get(tours).should("be.visible")
    cy.get(tours).click()
    cy.get('[class="tour-svg"]').should("be.visible")
  })

  it('navigate to the thinds to do page', () => {
    cy.get(things_to_do ).should("be.visible")
    cy.get(things_to_do ).click()
    cy.get('[class="title"]').should("have.text", "Discover Inclusive City Attractions and Tours")
  })

  it('navigate to the login page', () => {
    cy.get(login).should("be.visible")
    cy.get(login).click()
    cy.get('[class="login-headline"]').should("have.text", "Sign in")

  })

    it('navigate to the signup page', () => {
      cy.get(signup).should("be.visible")
      cy.get(signup).click()
      cy.get('[class="registration-headline"]').should("have.text", "Registration")
    })

})