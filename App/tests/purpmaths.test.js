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

function changeTimesTableNumbers(list, num) {
    if (list.includes(num)) {
        list = list.push(num)
    } else {
        const index = list.indexOf(num)
        list.splice(index, 1)
    }

    return list
}


describe("generateQuestionString()", () => {
    it("is truthy?", () => {
        let question = generateQuestionString()
        expect(question).toBeTruthy()
    })
})

describe("generateAnswer()", () => {
    it("is truthy?", () => {
        let answer = generateQuestionString()
        expect(answer).toBeTruthy()
    })
})

describe("randomNumber1toX()", () => {
    it("is truthy?", () => {
        let num = randomNumberFrom1toX(12)
        expect(num).toBeTruthy()
    })

    it("is not less than 1?", () => {
        let num = randomNumberFrom1toX(12)
        expect(num).not.toBeLessThan(1)
    })

    it("is not greater than x?", () => {
        let num = randomNumberFrom1toX(12)
        expect(num).not.toBeGreaterThan(12)
    })

    it("is working for the value of 4", () => {
        let num = randomNumberFrom1toX(4)
        expect(num).not.toBeGreaterThan(4)
    })
})

describe("randomElementFromArray()", () => {
    it("is truthy?", () => {
        let testArray = randomElementFromArray(timeTableNumbers)
        expect(testArray).toBeTruthy()
    })
})

describe("changeTimesTableNumbers()", () => {
    it("is truthy", () => {
        expect(changeTimesTableNumbers([1,2,3,4], 5)).toBeTruthy()
    })
})