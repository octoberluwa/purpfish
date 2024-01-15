import React, { useRef } from 'react'
import { useState } from 'react'

const TimesTablesPage = () => {
  const timeTableNumbers = [1, 2, 5, 10] //Should be null after we finish testing.
  let randomNumberFrom1to12
  let timeTableNumber

  const TIMES_TABLE_ANSWER_INPUT = document.getElementById("times-table-answer-input")

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

  generateProductPair()

  const [Answer, setAnswer] = useState(generateAnswer())
  const [Question, setQuestion] = useState(generateQuestion())
  const [AnswerFeedback, setAnswerFeedback] = useState("")
  const UsersAnswer = useRef(null)

  function resetForNextQuestion() {
    setAnswerFeedback("")
    UsersAnswer.current.value = ""
  }

  function generateNextProductPair() {
    resetForNextQuestion()
    generateProductPair()
    setQuestion(generateQuestion())
    setAnswer(generateAnswer())
  }

  function markAnswer() {
    if (UsersAnswer.current.value == "") { return }

    if (UsersAnswer.current.value == Answer) {
      setAnswerFeedback("Correct!")
    } else {
      setAnswerFeedback(`The correct answer is ${Answer}.`)
    }
  }

  return (
    <>
        <main>
          <div id="times-table-section">
            <p id="times-table-question">{ Question }</p>
            <p id="times-table-answer">{ Answer }</p>
            <input ref={UsersAnswer} type="text" id="times-table-answer-input"></input><br/>
            <button onClick={ markAnswer } id="submit-answer-button">Submit</button><br/>
            <button onClick={ generateNextProductPair } id="next-question-button">Next Question</button>
            <p>{ AnswerFeedback }</p>
          </div>
          <p>Work In Progress.</p>
        </main>
    </>
  )
}

export default TimesTablesPage