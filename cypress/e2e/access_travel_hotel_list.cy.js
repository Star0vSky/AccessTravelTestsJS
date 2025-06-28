describe('template spec', () => {

    Cypress.on('uncought:exaption', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return falce;
    })

    const destination = '[id="Filter_DestinationId"]';
    const checkin_form = '[name="Filter.CheckIn"]';
    const data_filter_checkin = '[data-valmsg-for="Filter.CheckIn"]';
    const checkout_form = '[name="Filter.CheckOut"]';
    const data_filter_checkout = '[data-valmsg-for="Filter.CheckOut"]';
    const adults = '[id="Filter_AdultNum"]';
    const adult_validator_number = '[data-valmsg-for="Filter.AdultNum"]';
    const children = '[id="Filter_ChildrenNum"]';
    const children_age = '[id="Filter_ChildrensAge[0]"]';
    const children_validator_number = '[data-valmsg-for="Filter.ChildrenNum"]';
    const submit_button = '[class="btn"][type="submit"]';

    beforeEach(() => {

        cy.viewport(1280, 800);
        cy.visit('https://www.accesstravel.com/en-US/Hotel/List');

    })

    it('navigate to the hotel page', () => {

        cy.get(destination).select('Jerusalem').should('have.value', '8').find(':selected').should('have.text', 'Jerusalem');
        cy.get(destination).select('London').find('option:selected').should('have.text', 'London');
        cy.get(destination).select('New York').find(':selected').should('contain.text', 'New York');

    })


    it('data checkin and check out adult and children number positive tests', () => {
        
        cy.get(destination).select('36').invoke("val").should('eq', '36')

        cy.get(checkin_form).clear().should("be.visible").type("2025-08-11").invoke('val').should('eq', "2025-08-11");
        cy.get('body').click();

        cy.get(checkout_form).clear().should("be.visible").type("2026-06-05").invoke('val').should('eq', "2026-06-05");
        cy.get('body').click();

        cy.get(adults).clear().should("be.visible").type("2").invoke('val').should('eq', "2");

        cy.get(children).clear().should("be.visible").type("1").invoke('val').should('eq', "1");

        cy.get('body').click();

        cy.get(children_age).clear().should("be.visible").type("3").invoke('val').should('eq', "3");

        cy.get(submit_button).should('have.text', 'Search').click();
       
    })

    it('data checkin negative tests', () => {
        
        cy.get(destination).select('18').invoke("val").should('eq', '18')

        cy.get(checkin_form).clear().type("2025-08-44").invoke('val').should('eq', "2025-08-44");
        cy.get('body').click();

        cy.get(checkout_form).clear().type("2026-05-09");
        cy.get('body').click();
        cy.get(adults).clear().type("2");
        cy.get(children).clear().type("0");
        cy.get(submit_button).click();

        cy.get(data_filter_checkin).should("be.visible");
        

    })

    it('data checkout negative tests', () => {
        cy.get(destination).select('6').invoke("val").should('eq', '6')

        cy.get(checkin_form).clear().type("2025-08-03");
        cy.get('body').click();

        cy.get(checkout_form).clear().type("2026-04-55").invoke('val').should('eq', "2026-04-55");
        cy.get('body').click();

        cy.get(adults).clear().type("1");
        cy.get(children).clear().type("0");
        cy.get(submit_button).click();

        cy.get(data_filter_checkout).should("be.visible");

    })

    it('adult number negative tests', () => {
        cy.get(destination).select('36').invoke("val").should('eq', '36')

        cy.get(adults).clear().should("be.visible").type("-1").invoke('val').should('eq', "-1");

        cy.get(children).clear().type("1");
      
        cy.get('body').click();

        cy.get(children_age).clear().type("3");
       
        cy.get(submit_button).click();

        cy.get(adult_validator_number).should('have.text', 'Invalid value')

    })

    it('children number negative tests', () => {
        cy.get(destination).select('28').invoke("val").should('eq', '28')

        cy.get(adults).clear().type("1");
    
        cy.get(children).clear().should("be.visible").type("-1").invoke('val').should('eq', "-1");

        cy.get('body').click();

        cy.get(submit_button).click();

        cy.get(children_validator_number).should('have.text', 'Invalid number')

    })


})