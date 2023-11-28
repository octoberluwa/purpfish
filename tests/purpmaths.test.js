const timeTableNumbers = [1, 2, 5, 10] //Should be null after we finish testing.

function randomNumberFrom1toX(x) {
    let number = Math.floor((Math.random() * x) + 1)
    return number
}

function randomNumberFrom0toX(x) {
    let number = Math.floor(Math.random() * (x + 1))
    return number
}

function generateQuestionString() {
    let timeTableNumber = timeTableNumbers[randomNumberFrom0toX(timeTableNumbers.length)] 
    question = `${timeTableNumber} x ${randomNumberFrom1toX(12)}?`
    return question
}

function generateAnswer() {
    
}

describe("generateQuestionString()", () => {
    it("is truthy?", () => {
        let question = generateQuestionString()
        expect(question).toBeTruthy()
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