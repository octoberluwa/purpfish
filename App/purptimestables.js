const TIMES_TABLE_QUESTION = document.getElementById("times-table-question")
const TIMES_TABLE_ANSWER = document.getElementById("times-table-answer")

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
function generateQuestion() {
    let question = `${timeTableNumber} x ${randomNumberFrom1to12}?`
    return question
}

function generateAnswer() {
    let answer = timeTableNumber * randomNumberFrom1to12
    return answer
}

function presentQuestion() {
    generateProductPair()
    TIMES_TABLE_ANSWER.innerText = generateAnswer()
    TIMES_TABLE_QUESTION.innerText = generateQuestion()
}