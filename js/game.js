var game = {

    isItFinish : true, 
    howManyFault : 0,

    // =================================================================
    init: function (grid) {

        game.instructions();
        game.generateMap();
        document.addEventListener('keydown', function () {
            game.goToYourGoalLittleBurger(event)
        });
    },

    // =================================================================
    cellWidth: 50, // taille cellule
    tableau: document.querySelector('.terrain_de_jeu'),


    // =================================================================
    // ========= CREER UN PIXEL ===========
    types: {
        'x': 'classic',
        '*': 'wall',
        'o': 'burger',
        '-': 'goal'
    },

    generatePixel: function (type) {
        let pixel = document.createElement('div'); // créer div

        let colorType = game.types[type]; // Type de chaque
        pixel.classList.add('square'); // Class PIXEL
        pixel.classList.add(colorType); // class colorClass


        return pixel // Retourne le pixel créer avec les classes
    },

    // ================================================================
    // =========== CREER LA MAP =============

    generateMap: function () {

        for (y in model) {
            console.log('mlk', y)

            for (let x = 0; x < model[y].length; x++) {
                let characters = model[y][x] // on prend les lettres


                let pixelDiv = game.generatePixel(characters);
                pixelDiv.setAttribute('id', `x${x}-y${y}`);
                game.tableau.appendChild(pixelDiv);
            }
        }
    },

    instructions: function() {
        divElement = document.createElement('div');
        divElementParent = document.querySelector('.terrain_de_jeu');
        divElement.classList.add('popUp');
        divElementParent.append(divElement);
        pElement = document.createElement('p');
        pElement.textContent = 'Catch your food ! Attention ... you\'re not like you\'re thinking'
        pElement.classList.add('textPopUp');
        divElement.append(pElement);

        buttonElement = document.createElement('button');
        buttonElement.classList.add('button-restart');
        buttonElement.textContent = 'Play';
        divElement.append(buttonElement);
        buttonElement.addEventListener('click', () => {divElement.style.display = 'none'; game.isItFinish = false})

    },
    // =================================================================
    // ============= MANGEZ BOUCHEZ ===========

    goToYourGoalLittleBurger: function (evt) {

        
        if(game.isItFinish === false) {
            console.log(game.isItFinish);
            game.actualLocalisationForLittleBurger()
            if (event.keyCode === 39) {
                game.goToTheRightLittleBurger()
            } else if (event.keyCode === 37) {
                game.goToTheLeftLittleBurger()
            } else if (event.keyCode === 40) {
                game.goDownLittleBurger()
            } else if (event.keyCode === 38) {
                game.goUpLittleBurger()
            }

            game.isItAWall();
            game.isItGoal();
        };

    },

    isItGoal: function () {
        goalLocalisation = document.querySelector('.goal');
        burgerLocalisation = document.querySelector('.burger');
        console.log(burgerLocalisation);

        isItGoal = burgerLocalisation.classList.contains('goal');
        if (isItGoal === true) {
            goalLocalisation.classList.remove('goal')
            game.createSuccessDiv();
            game.isItFinish = true;
        }
    },

    createSuccessDiv: function () {
        newDiv = document.createElement('div');
        divElementParent = document.querySelector('.terrain_de_jeu');
        newDiv.classList.add('popUp');
        divElementParent.append(newDiv);
        newPElement = document.createElement('p');
        newPElement.textContent = 'You win with ' + game.howManyFault + ' errors !'; 
        newPElement.classList.add('textPopUp');
        newDiv.append(newPElement);

        buttonElement = document.createElement('button');
        buttonElement.classList.add('button-restart');
        buttonElement.textContent = 'Restart';
        buttonElement.type = 'reset';
        newDiv.append(buttonElement);
        buttonElement.addEventListener('click', () => {document.location.reload(true);})
    },
    // =================================================================
    // ============= POUR BLOQUER CHEMIN ===========


    isItAWall: function () {
        wallForbidden = document.getElementsByClassName('wall');
        dontGoThere = Array.from(wallForbidden);
        isItOkToGoThere = dontGoThere.includes(futurLocalisation);

        if (isItOkToGoThere == false) {
            futurLocalisation.classList.add('burger');
        } else {
            actuelLocalisation.classList.add('burger');
            alert('Don\'t Go To the Wall Little Burger !')
            game.howManyFault = game.howManyFault + 1; 
        }
    },

    // =================================================================
    // ============= LOCALISATION DEPART BURGER ===========


    actualLocalisationForLittleBurger: function () {
        actuelLocalisation = document.querySelector('.burger');
        actuelLocalisation.classList.remove('burger');
        return actuelLocalisation;
    },


    // =================================================================
    // ============= SI LE BURGER VA VERS LE HAUT ===========


    goUpLittleBurger: function () {
        firstLocation = actuelLocalisation['id'];
        let dataY = firstLocation.split('-');
        dataY = dataY[1];
        dataY = dataY.slice(1);
        numberYWanted = parseInt(dataY) - 1;

        if (numberYWanted < 0) {
            numberYWanted = 0;
        }

        dataYWithY = 'y' + dataY;
        numberYWantedWithY = 'y' + numberYWanted;
        newdataY = firstLocation.replace(dataYWithY, numberYWantedWithY);
        futurLocalisation = document.getElementById(newdataY);
        return futurLocalisation;

    },

    // =================================================================
    // ============= SI LE BURGER VA VERS LE BAS ===========

    goDownLittleBurger: function () {
        firstLocation = actuelLocalisation['id'];

        let dataY = firstLocation.split('-');
        dataY = dataY[1];
        dataY = dataY.slice(1);
        numberYWanted = parseInt(dataY) + 1;

        if (numberYWanted > 9) {
            numberYWanted = 9;
        }

        dataYWithY = 'y' + dataY;
        numberYWantedWithY = 'y' + numberYWanted;
        newdataY = firstLocation.replace(dataYWithY, numberYWantedWithY);
        futurLocalisation = document.getElementById(newdataY);
        return futurLocalisation;
    },

    // =================================================================
    // ============= SI LE BURGER VA VERS LA GAUCHE ===========

    goToTheLeftLittleBurger: function () {

        firstLocation = actuelLocalisation['id'];

        let dataX = firstLocation.split('-');
        dataX = dataX[0];

        dataX = dataX.slice(1);

        numberXWanted = parseInt(dataX) - 1;
        if (numberXWanted < 0) {
            numberXWanted = 0;
        }

        dataXWithX = 'x' + dataX;

        numberXWantedWithX = 'x' + numberXWanted;

        newdataX = firstLocation.replace(dataXWithX, numberXWantedWithX);

        futurLocalisation = document.getElementById(newdataX);

        return futurLocalisation;

    },

    // =================================================================
    // ============= SI LE BURGER VA VERS LA DROITE ===========

    goToTheRightLittleBurger: function () {

        firstLocation = actuelLocalisation['id'];
        let dataX = firstLocation.split('-');
        dataX = dataX[0];
        dataX = dataX.slice(1);
        numberXWanted = parseInt(dataX) + 1;
        if (numberXWanted > 12) {
            numberXWanted = 12;
        }
        dataXWithX = 'x' + dataX;
        numberXWantedWithX = 'x' + numberXWanted;
        newdataX = firstLocation.replace(dataXWithX, numberXWantedWithX);
        futurLocalisation = document.getElementById(newdataX);

        return futurLocalisation;
    },


}
// ================================================================


var model = [
    'xxxxxxxxx**xx',
    'x********xx-x',
    'xxxxxxxx*x**x',
    'xx*****xxx*x*',
    'xxxxxx*x***x*',
    '****xx*x*xxx*',
    'xxx*xx*x*xxxx',
    'x*o*xx**xx*xx',
    'x***xxxxxx*xx',
    'xxxxxx*****xx',
];



document.addEventListener('DOMContentLoaded', game.init());