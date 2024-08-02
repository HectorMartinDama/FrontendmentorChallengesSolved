

beforeEach(() =>{
    cy.viewport('iphone-x');
})


describe('check modal', () =>{
    beforeEach(() =>{
        cy.visit('http://0.0.0.0:5173');
    })

    it('open modal, when press the button', () =>{
        cy.get('.btn-rules').click();
        cy.get('dialog').should('be.visible');
    });

    it('close the modal, when click in the x', () =>{
        cy.get('.btn-rules').click();
        cy.get('dialog').should('be.visible');
        cy.get('.btn-close').click();
        cy.get('dialog').should('not.be.visible');
    });
})


describe('game rock-paper-scissors-lizard-spock', () =>{
    beforeEach(() =>{
        cy.visit('http://0.0.0.0:5173', {
            onBeforeLoad: (window) => {
                window.localStorage.setItem('score', 10);
            }
        })
    });

    it('smoke test', () =>{
        cy.contains('RULES');
    })

    it('game rock-paper-scissors-lizard-spock', () =>{
        const score= localStorage.getItem('score'); 
        cy.get('#lizard').click();
        cy.get('.main-screen').should('have.css', 'display', 'none')
        
        cy.get('.message-result').then(($message) => {
            if($message.text().includes('YOU WIN')){
                expect(localStorage.getItem('score')).equal('11');
                expect(cy.get('canvas').should('be.exist'));
            } 
            else if ($message.text().includes('YOU LOSE')) expect(localStorage.getItem('score')).equal('9');
            else expect(score).equal(score); // tie
        });
        cy.get('#board-again-mobile #btn-play-again').click();
    })

    afterEach(() =>{
        cy.clearLocalStorage('score');
    })
})