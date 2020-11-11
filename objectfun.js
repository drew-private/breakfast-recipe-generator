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
                } else {
                    console.warn('Mata')
                }
            }
        } else {
            alert('Please add some ingredients!')
        }
    }
    parseIngred();

    let notFoundIngred = []

    function corelateIngred () {
        const mainDishVal = Object.values(mainDish);
        let multipleDishesResult = [];

        let foundIngred = []

        for (let i in mainDishVal) {
            let brokenMainDish = mainDishVal[i];
            let dishResult = Object.keys(mainDish).find(key => mainDish[key] === brokenMainDish);
            multipleDishesResult.push(dishResult);
        }

        for (let i in parsedIngredArr) {
            let noIngredFound = () => {
               let arr = [];
               let values =  mainDish[multipleDishesResult[i]].valueOf();
               arr.push(values);

               for (let j in arr) {
                   if(arr[j] === parsedIngredArr[j]) {
                       foundIngred.push(arr[j])
                   } else {
                       notFoundIngred.push(arr[j]);
                   }
               }
            };
            noIngredFound();
        }

        let filteredMissingIngredients = [];

        function filteringFoundIngred () {

            notFoundIngred.flat(2).filter(
                function (el) {
                    filteredMissingIngredients.push(this.indexOf(el) < 0)
                }, [...parsedIngredArr]
            )

        }; filteringFoundIngred()

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

                    $('#resultText').text(resultingDishes.sort().join(', '))
                    // console.warn(difference, resultingDishes)
                } else {
                    if(mainDish[i].toString() === parsedIngredArr + ',' + difference) {
                        if (difference[i] !== missingIngredients[i] || missingIngredients.length === 0) {
                            missingIngredients.push(difference)
                            $('#resultText').text('You will need a couple more ingredients to create an awesome breakfast: ' + missingIngredients.sort().join(', '))
                        }
                    }
                }

            }

        }; displayResults()

    }

    corelateIngred();

})

// const spoontactularUrl = new URL("https://api.spoonacular.com/recipes/complexSearch")
//
// const apiKey = '?apiKey=4c7ddae85e3146e597ee0dacaa8b1bce';
//
// const query = '&query=' + 'avocado+toast'
//
// let megaQuery = spoontactularUrl+apiKey+query+'&number=1'
//
// fetch(megaQuery).then((data) => {
//     return data.json()
// }).then((res) => {
//    console.log(res.results[0])
// }).catch((err) => {
//     console.warn('Something is wrong ', err)
// })