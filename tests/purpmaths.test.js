const timeTableNumbers = []

function randomNumberFrom1to12() {
    let number = Math.floor((Math.random() * 12) + 1)
    return number
}


describe("randomNumber1to12()", () => {
    it("is truthy?", () => {
        let num = randomNumberFrom1to12()
        expect(num).toBeTruthy()
    })

    it("is not less than 1?", () => {
        let num = randomNumberFrom1to12()
        expect(num).not.toBeLessThan(1)
    })

    it("is not greater than 12?", () => {
        let num = randomNumberFrom1to12()
        expect(num).not.toBeGreaterThan(12)
    })
})