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
            let obj = {}

            for(let i in mainDish) {
                mainDish[i].forEach((el, index) => {
                    obj[el] = index;
                })
            }

            let check = parsedIngredArr.every((el) => {
                return obj[el] !== undefined; //because 0 is falsy
            });

            console.log(check)

            // for(let i in mainDish) {
            //     let difference = $(mainDish[i]).not(parsedIngredArr).get()
            //     let dishResult = Object.keys(mainDish).find(key => mainDish[key] === mainDish[i])
            //
            //     for (let j = 0; j < mainDish[i].length; j++) {
            //         if(mainDish[i][j] === parsedIngredArr[j]) {
            //             console.log(mainDish[i][j])
            //         }
            //     }




                // if(mainDish[i].includes(...parsedIngredArr)) {
                //     // let dishResult = Object.keys(mainDish).find(key => mainDish[key] === mainDish[i])
                //     if (i === 'Oatmeal' && parsedIngredArr.includes(...breakfast.fruit)) {
                //         resultingDishes.push('Oatmeal with fruits')
                //     } else {
                //         resultingDishes.push(i)
                //     }
                //     $('#resultText').text(resultingDishes.sort().join(', '))
                // for (let j in parsedIngredArr) {

                    // if (mainDish[i].find(el => el === parsedIngredArr[j])) {
                    //     if(mainDish[i].includes(...parsedIngredArr)) {
                    //
                    //         // let dishResult = Object.keys(mainDish).find(key => mainDish[key] === mainDish[i])
                    //         if (i === 'Oatmeal' && parsedIngredArr.includes(...breakfast.fruit)) {
                    //             resultingDishes.push('Oatmeal with fruits')
                    //         } else {
                    //             resultingDishes.push(i)
                    //         }
                    //         console.log(resultingDishes);
                    //         $('#resultText').text(resultingDishes.sort().join(', '))
                        // }
                            // else if(mainDish[i].includes(...parsedIngredArr) && parsedIngredArr.length > mainDish[i].length){
                        //     console.log(difference)
                        //     missingIngredients.push(difference)
                        //     $('#resultText').text('You will need a couple more ingredients to create an awesome breakfast: ' + missingIngredients.sort().join(', '))
                        // }
                    // }
                // }
        // }



        }; displayResults()

})