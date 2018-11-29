const _   = Cypress._

// require node's url module
const url = require('url')

describe('Logging In - Single Sign on', function(){
    Cypress.Commands.add('loginBySingleSignOn', (overrides = {}) => {

    Cypress.log({
        name: 'loginBySingleSignOn'
    })

    const options = {
        method: 'POST',
        url: 'www.facebook.com',
        qs: {
            // use qs to set query string to the url that creates
            // http://auth.corp.com:8080?redirectTo=http://localhost:7074/set_token
            redirectTo: 'https://polar-badlands-95072.herokuapp.com/'
        },
        form: true, // we are submitting a regular form body
        body: {
            username: 'mario@fentler.com',
            password: 'Minny&Jassy1',
        }
    }
    
    // allow us to override defaults with passed in overrides
    _.extend(options, overrides)

    cy.request(options)
    })

    context('Use redirectTo and a session cookie to login', function(){
        // This first example assumes we have an app server that
        // is capable of handling the redirect and set a session cookie
    
        // The flow will be:
        // 1. sign into auth.corp.com
        // 2. redirect back to our app server
        // 3. have our app server set an HttpOnly session cookie
        // 4. check that we are now properly logged in
    
        it('Tests if there is the login link', () => {
            cy.visit('https://polar-badlands-95072.herokuapp.com/')
            .contains('click here')
        })

        it('Tests if authorized section is not displayed when not logged in', () => {
            cy.get('.unauthorized').should('be.visible')
        })

        it('Tests if unauthorized section is not displayed when not logged in', () => {
            cy.contains('Logout').should('not.visible')
        })
    })
})