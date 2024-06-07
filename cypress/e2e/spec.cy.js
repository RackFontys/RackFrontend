import VueJwtDecode from "vue-jwt-decode";

describe('Get page and register', () => {
  it('passes', () => {
    cy.intercept('POST', '/User').as('register');

    cy.visit('/#')
    cy.contains('Welcome')
    cy.url().should('include', '/')

    cy.contains('Account').click()
    cy.contains('Register').click()
    cy.url().should('include', '/register')

    cy.get('input[name="email"]').type('test@gmail.com')
    cy.get('input[name="name"]').type('test')
    cy.get('input[name="password"]').type('test')
    cy.get('form').submit()

    cy.wait('@register').then((interception) => {
      expect(interception.response.statusCode).to.equal(201);
    });

    cy.url().should('include', '/');
  })
})

describe('Get page and login', () => {
  it('passes', () => {
    cy.intercept('GET', '/User?email=test@gmail.com&password=test').as('login');

    cy.visit('/#')
    cy.contains('Welcome')
    cy.url().should('include', '/')

    cy.contains('Account').click()
    cy.contains('Login').click()
    cy.url().should('include', '/login')

    cy.get('input[name="email"]').type('test@gmail.com')
    cy.get('input[name="password"]').type('test')
    cy.get('form').submit()

    cy.wait('@login').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });

    cy.url().should('include', '/');
  })
})

describe('Get page and send message', () => {
  it('passes', () => {
    cy.intercept('GET', '/Message?userId=9').as('getMessage');
    cy.intercept('POST', '/Message').as('sendMessage');
    cy.intercept('GET', '/User?email=test@gmail.com&password=test').as('login');

    cy.visit('/#')
    cy.contains('Welcome')
    cy.url().should('include', '/')

    cy.contains('Account').click()
    cy.contains('Login').click()
    cy.url().should('include', '/login')

    cy.get('input[name="email"]').type('test@gmail.com')
    cy.get('input[name="password"]').type('test')
    cy.get('form').submit()

    cy.wait('@login').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      const res = interception.response.body;
      localStorage.setItem('jwt', res);
      const decodedJWT = VueJwtDecode.decode(res);
      localStorage.setItem('userName', decodedJWT.userName);
      localStorage.setItem('userId', decodedJWT.userId);
    });

    cy.url().should('include', '/');

    cy.contains('Chat').click()
    cy.url().should('include', '/chat')

    cy.get('div.list-group-item')
        .contains('User 10').click()

    cy.wait('@getMessage').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });

    cy.get('input[id="input-1"]').type('Test message from Cypress')
    cy.get('form').submit()

    cy.wait('@sendMessage').then((interception) => {
      expect(interception.response.statusCode).to.equal(201);
    });

    cy.url().should('include', '/');
  })
})

describe('Create user and check messages', () => {
  it('passes', () => {
    cy.intercept('POST', '/User').as('register');

    cy.visit('/#')
    cy.contains('Welcome')
    cy.url().should('include', '/')

    cy.contains('Account').click()
    cy.contains('Register').click()
    cy.url().should('include', '/register')

    cy.get('input[name="email"]').type('test2@gmail.com')
    cy.get('input[name="name"]').type('test')
    cy.get('input[name="password"]').type('test')
    cy.get('form').submit()

    cy.wait('@register').then((interception) => {
      expect(interception.response.statusCode).to.equal(201);
    });

    cy.url().should('include', '/');

    cy.intercept('GET', '/User?email=test2@gmail.com&password=test').as('login');

    cy.contains('Account').click()
    cy.contains('Login').click()
    cy.url().should('include', '/login')

    cy.get('input[name="email"]').type('test2@gmail.com')
    cy.get('input[name="password"]').type('test')
    cy.get('form').submit()

    cy.wait('@login').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      const res = interception.response.body;
      localStorage.setItem('jwt', res);
      const decodedJWT = VueJwtDecode.decode(res);
      localStorage.setItem('userName', decodedJWT.userName);
      localStorage.setItem('userId', decodedJWT.userId);
    });

    cy.url().should('include', '/');

    cy.reload()

    cy.intercept('GET', '/Message?userId=10').as('getMessage');

    cy.contains('Chat').click()
    cy.url().should('include', '/chat')

    cy.reload()

    cy.get('div.list-group-item')
        .contains('User 9').click()

    cy.wait('@getMessage').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });

    cy.get('div.col-9')
        .find('div')
        .find('div.list-group')
        .find('div.list-group-item')
        .then(($div) => {
          // Example assertion on the content (if needed)
          expect($div).to.contain('Test message from Cypress');
        });
  })
})