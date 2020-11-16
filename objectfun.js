const breakfast = {
    fruit: ['oranges', 'grapefruit', 'grapes', 'pineapple', 'apples', 'pears'],
    drink: ['milk', 'fresh juice', 'bottle juice', 'soda', 'water'],
    meat: {
        bacon: ['smoked pork bacon', 'turkey'],
        beef: ['corned beef', 'pastrami']
    },
    ingredientsMainDish: ['eggs', 'milk', 'flour', 'oats', 'salt', 'pepper', 'avocado', 'tomatoes', 'peppers',
        'nutella', 'bread', 'cereals','oil'],
}

const mainDish = {
        Pancakes: [
            'eggs', 'milk', 'flour', 'oil'
        ], Omelette: [
            'eggs', 'salt', 'pepper', 'oil'
        ], Oatmeal: [
            'oats', 'milk'
        ], 'Fruit salad': breakfast.fruit,
        'avocado toast': [
            'avocado', 'bread', 'toast', 'eggs'
        ], 'Poached eggs': [
            'eggs', 'salt', 'pepper'
        ], 'Fried eggs': [
            'eggs', 'oil', 'salt', 'pepper'
        ],
        'Nutella spread': [
            'nutella', 'bread'
        ], Grapefruit: [
            'grapefruit'
        ], 'Milk & cereals': [
            'milk', 'cereals'
        ],
}

const meatSelector = $('.form-radio')
const meatSelectorContainer = $('#meatSelectorContainer')
const meatOptions = $('#meatSelection')

meatSelector.click(function hideMeatSelector () {
    if ($('.form-radio:checked').val() === 'Yes') {
        meatSelectorContainer.removeClass('d-none')
    } else {
        meatSelectorContainer.addClass('d-none')
    }
})

$('.btn').click( () => {
    function apiRecipeSuggestions (searchTerm) {
        const spoontactularUrl = new URL("https://api.spoonacular.com/recipes/findByIngredients")

        const apiKey = '?apiKey=4c7ddae85e3146e597ee0dacaa8b1bce';

        const query = '&ingredients=' + searchTerm

        let megaQuery = spoontactularUrl+apiKey+query+'&number=4'

        fetch(megaQuery).then((data) => {
            return data.json()
        }).then((res) => {

            for(let j in res) {
                $('#recommendationsFromApi').prepend('<div class="miniRecommend ml-2 mr-2"></div>')

                const el = document.getElementsByClassName('miniRecommend');
                $('.miniRecommend')
                for(let k = 0; k < el.length; k++) {
                    el[k].id = 'cont_' + (k+1)
                }
            };

            const cont1 = document.getElementById('cont_1')
            const newImg1 = document.createElement("img")
            const newText1 = document.createElement("p")
            newImg1.setAttribute('src', res[0].image)
            newText1.innerText = res[0].title;
            cont1.appendChild(newImg1);
            cont1.appendChild(newText1);

            const cont2 = document.getElementById('cont_2')
            const newImg2 = document.createElement("img")
            const newText2 = document.createElement("p")
            newImg2.setAttribute('src', res[1].image)
            newText2.innerText = res[1].title;
            cont2.appendChild(newImg2);
            cont2.appendChild(newText2);

            const cont3 = document.getElementById('cont_3')
            const newImg3 = document.createElement("img")
            const newText3 = document.createElement("p")
            newImg3.setAttribute('src', res[2].image)
            newText3.innerText = res[2].title;
            cont3.appendChild(newImg3);
            cont3.appendChild(newText3);

            const cont4 = document.getElementById('cont_4')
            const newImg4 = document.createElement("img")
            const newText4 = document.createElement("p")
            newImg4.setAttribute('src', res[3].image)
            newText4.innerText = res[3].title;
            cont4.appendChild(newImg4);
            cont4.appendChild(newText4);

            $('p').css('text-overflow', 'ellipsis')
            $('p').css('max-width', '312px')

        }).catch((err) => {
            console.warn('Something is wrong ', err)
        })
    }


    const ingredientVal = $('#ingredientSelection').val()
    const fruitVal = $('#fruitInput').val()


    $('#meatSelection optgroup option:selected').each(() => {
        console.warn($('option:selected').val())
    })

    let parsedIngredArr = [];

    function parseIngred () {
        if (ingredientVal) {
            let splitVal = ingredientVal.split(/[ ,]+/)

            for (let i in splitVal) {
                if (splitVal[i].match(/[a-z]+/gi)) {
                    parsedIngredArr.push(splitVal[i].toLowerCase())
                }
            }
        } else {
            alert('Please add some ingredients!')
        }
    }
    parseIngred();

    function displayResults () {
        let resultingDishes = []
        let missingIngredients = []

        for(let i in mainDish) {
            let difference = $(mainDish[i]).not(parsedIngredArr).get()

            if (difference.length === 0) {
                let dishResult = Object.keys(mainDish).find(key => mainDish[key] === mainDish[i])
                if (dishResult === 'Oatmeal' && parsedIngredArr.includes(...breakfast.fruit)) {
                    resultingDishes.push('Oatmeal with fruits')
                } else {
                    resultingDishes.push(dishResult)
                }
                $('#recommendationsFromApi').empty();
                $('#recommendationText').removeClass('d-none')
                apiRecipeSuggestions(parsedIngredArr.sort().join(',+'))
                $('#recommendationSection').removeClass('d-none')
                $('#resultText').text(resultingDishes.sort().join(', '))

            } else {
                // console.warn('sorted ' + mainDish[i].sort().toString(), 'sorted ' + (parsedIngredArr.sort() + ',' + difference.sort()))
                // console.log(mainDish[i].toString(), (parsedIngredArr + ',' + difference))

                if(mainDish[i].sort().toString() === parsedIngredArr.sort() + ',' + difference.sort() ) {
                    if (difference[i] !== missingIngredients[i] || missingIngredients.length === 0) {
                        $('#recommendationsFromApi').empty();
                        $('#recommendationText').addClass('d-none')
                        missingIngredients.push(difference)

                        $('#resultText').text('You will need a couple more ingredients to create an awesome breakfast: ' + missingIngredients.sort().join(', '))
                    }
                }
            }

        }

    }; displayResults()

})