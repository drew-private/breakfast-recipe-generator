const breakfast = {
    fruit: ['oranges', 'grapefruit', 'grapes', 'pineapple', 'apples', 'pears'],
    drink: ['milk', 'fresh juice', 'bottle juice', 'soda', 'water'],
    meat: {
        bacon: ['smoked pork bacon', 'turkey'],
        beef: ['corned beef', 'pastrami']
    },
    ingredientsMainDish: ['eggs', 'milk', 'flour', 'oats', 'salt', 'pepper', 'avocado', 'tomatoes', 'peppers',
        'Nutella', 'bread', 'cereals','oil'],
}

const mainDish = {
        Pancakes: [
            'eggs', 'milk', 'flour', 'oil'
        ], Omelette: [
            'eggs', 'salt', 'pepper', 'oil'
        ], Oatmeal: breakfast.fruit + [
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
            'Nutella', 'bread'
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
                    parsedIngredArr.push(splitVal[i])
                } else {
                    console.warn('Mata')
                }
            }
        } else {
            alert('Please add some ingredients!')
        }
    }
    parseIngred();

    let multipleDishesResult = [];

    function corelateIngred () {
        const mainDishVal = Object.values(mainDish);


        for (let i in mainDishVal) {
            let brokenMainDish = mainDishVal[i];

             let correlationFunc = parsedIngredArr.every(function(element) {
                if(brokenMainDish.indexOf(element)>-1){
                    return element = brokenMainDish[brokenMainDish.indexOf(element)]
                }
            });

            if (correlationFunc === true) {
                let dishResult = Object.keys(mainDish).find(key => mainDish[key] === brokenMainDish)
                multipleDishesResult.push(dishResult);
                let formattedStrRes = multipleDishesResult.sort().join(', ');
                $('#resultText').text(formattedStrRes);
            }
        }
    }
    corelateIngred();

    function missingIngred () {
            if (multipleDishesResult) {
                for (let i in multipleDishesResult) {
                    // console.log(multipleDishesResult[i]);
                    if (mainDish.hasOwnProperty(multipleDishesResult[i])) {
                        let propList = [];
                        propList.push(multipleDishesResult[i]);

                        // for (let j in ) {
                        //     console.log()
                        // }
                        console.log(multipleDishesResult[i] + ' Ma-ta e o curva' + propList);
                    }
                }
            }
    }

    missingIngred()
})

// const spoontactularUrl = new URL("https://api.spoonacular.com/recipes/complexSearch")
//
// const apiKey = '?apiKey=4c7ddae85e3146e597ee0dacaa8b1bce';
//
// let getKey = '';
//
// for (let i of Object.keys(mainDish)) {
//     if( i === 'fried eggs' )
//         getKey = i;
// }
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