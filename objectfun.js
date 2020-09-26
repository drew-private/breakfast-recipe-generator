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

const fruitVal = $('#fruitInput').val()
const meatSelector = $('.form-radio')
const meatSelectorContainer = $('#meatSelectorContainer')
// const meatOptions = $('#meatSelection')

// meatSelector.click(function hideMeatSelector () {
//     if ($('.form-radio:checked').val() === 'Yes') {
//         meatSelectorContainer.removeClass('d-none')
//     } else {
//         meatSelectorContainer.addClass('d-none')
//     }
// })

const ingredientVal = $('#ingredientSelection').val()

$('.btn').click( () => {
    $('#meatSelection optgroup option:selected').each(() => {
        console.warn($('option:selected').val())
    })

    console.log(fruitVal, ingredientVal,)
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