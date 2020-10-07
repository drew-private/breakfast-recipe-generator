const breakfast = {
    fruit: ['orange', 'grapefruit', 'grapes', 'pineapple', 'apples', 'pears'],
    drink: ['milk', 'fresh juice', 'bottle juice', 'soda', 'water'],
    meat: {
        bacon: ['smoked pork bacon', 'turkey'],
        beef: ['corned beef', 'pastrami']
    },
    ingredientsMainDish: ['eggs', 'milk', 'flour', 'oats', 'salt', 'pepper', 'avocado', 'tomatoes', 'peppers',
        'Nutella', 'bread', 'cereals','oil'],
}

const mainDish = {
        pancakes: [
            'eggs', 'milk', 'flour', 'oil'
        ], omelette: [
            'eggs', 'salt', 'pepper', 'oil'
        ], oatmeal: [
            'oats', 'milk', breakfast.fruit,
        ], 'fruit salad': breakfast.fruit,
        'avocado toast': [
            'avocado', 'bread', 'toast', 'eggs'
        ], 'poached eggs': [
            'eggs', 'oil', 'salt', 'pepper'
        ], 'fried eggs': [
            'eggs', 'oil', 'salt', 'pepper'
        ],
        'Nutella spread': [
            'Nutella', 'bread'
        ], Grapefruit: [
            'grapefruit'
        ], 'milk & cereals': [
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

    function corelateIngred () {
        for( let i in Object.values(mainDish)) {
            for (let j in i) {
                console.log()
            }
            // for(let j of Object.getOwnPropertyDescriptor(mainDish, i).val()) {
            //     console.log(j);
            // }
        }
    }
    corelateIngred();

    // console.warn(parsedIngredArr, Object.getOwnPropertyDescriptor(mainDish, 'Grapefruit'))
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