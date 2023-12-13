const timeTableNumbers = [1, 2, 5, 10] //Should be null after we finish testing.
let randomNumberFrom1to12
let timeTableNumber


function randomNumberFrom1toX(x) {
    let number = Math.floor((Math.random() * x) + 1)
    return number
}

function randomElementFromArray(array) {
    let elementID = Math.floor(Math.random() * array.length)
    return array[elementID] 
}

function generateProductPair() {
    timeTableNumber = randomElementFromArray(timeTableNumbers)
    randomNumberFrom1to12 = randomNumberFrom1toX(12)
}
function generateQuestionString() {
    let question = `${timeTableNumber} x ${randomNumberFrom1to12}?`
    return question
}

function generateAnswer() {
    let answer = timeTableNumber * randomNumberFrom1to12
    return answer
}

