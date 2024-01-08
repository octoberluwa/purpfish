import React from 'react'
import { useState } from 'react'

const TimesTablesPage = () => {
  const timeTableNumbers = [1, 2, 5, 10] //Should be null after we finish testing.
  let randomNumberFrom1to12
  let timeTableNumber

  function randomNumberFrom1toX(x) {
      let number = Math.floor(Math.random() * x) + 1
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

  function generateNextProductPair() {
    generateProductPair()
    setQuestion(generateQuestion)
    setAnswer(generateAnswer())
  }

  generateProductPair()

  const [Answer, setAnswer] = useState(generateAnswer())
  const [Question, setQuestion] = useState(generateQuestion())

  return (
    <>
        <main>
          <div id="times-table-section">
            <p id="times-table-question">{ Question }</p>
            <p id="times-table-answer">{ Answer }</p>
            <input type="text" id="times-table-input"></input><br/>
            <button onClick={ generateNextProductPair } id="next-question-button">Next Question</button>
          </div>
          <p>Work In Progress.</p>
        </main>
    </>
  )
}

export default TimesTablesPage