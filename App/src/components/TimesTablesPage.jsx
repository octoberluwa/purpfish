import React, { useRef } from 'react'
import { useState } from 'react'

const TimesTablesPage = () => {
  const timeTableCheckBoxesNumbers = [1,2,3,4,5,6,7,8,9,10,11,12]

  const [TimeTableNumbers, setTimeTableNumbers] = useState([])

  const timesTableCheckboxHandler = (event) => {
    if (event.target.checked) {
      setTimeTableNumbers([...TimeTableNumbers, event.target.value])
    } else {
      setTimeTableNumbers(TimeTableNumbers.filter(number => number !== event.target.value))
    }
  }

  const [IsTimesTablesSettingsSubmmited, setIsTimesTablesSettingsSubmitted] = useState(false)

  function submitTimesTableNumbers() {
    setIsTimesTablesSettingsSubmitted(true)
  }




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
  const [IsAnswerSubmitted, setIsAnswerSubmitted] = useState(false)
  const UsersAnswer = useRef(null)

  function resetForNextQuestion() {
    setAnswerFeedback("")
    UsersAnswer.current.value = ""
    setIsAnswerSubmitted(false)
  }

  function generateNextProductPair() {
    resetForNextQuestion()
    generateProductPair()
    setQuestion(generateQuestion())
    setAnswer(generateAnswer())
  }

  function markAnswer() {
    if (UsersAnswer.current.value == "") { return }

    setIsAnswerSubmitted(true)
    if (UsersAnswer.current.value == Answer) {
      setAnswerFeedback("Correct!")
    } else {
      setAnswerFeedback(`The correct answer is ${Answer}.`)
    }
  }

  function submitIfEnterKeyPressed(keyPressed) {
    if (keyPressed.keyCode !== 13) { return }

    if (IsAnswerSubmitted) {
      generateNextProductPair()
    } else {
      markAnswer()
    }
  }

  return (
    <>
        <main>
          {IsTimesTablesSettingsSubmmited && <div id="times-table-section">
            <p id="times-table-question">{ Question }</p>
            <input ref={UsersAnswer} type="text" id="times-table-answer-input" onKeyDown={ submitIfEnterKeyPressed }></input><br/>
            {!IsAnswerSubmitted && 
            <button id="submit-answer-button" onClick={ markAnswer }>Submit</button>}
            {IsAnswerSubmitted && <button id="next-question-button" onClick={ generateNextProductPair }>Next Question</button>}
            <p id="answer-feedback">{ AnswerFeedback }</p>
          </div>}

          
          {!IsTimesTablesSettingsSubmmited && <div id="times-table-checkboxes">
            <a>{ TimeTableNumbers }</a>
            {timeTableCheckBoxesNumbers.map(item => {
                return (
                    <label><input type='checkbox' name={item} value={item} onChange={timesTableCheckboxHandler}/>{item}</label>
                )
            })}
            <button onClick={submitTimesTableNumbers}>Submit</button>
          </div>}
          <p>Work In Progress.</p>
        </main>
    </>
  )
}

export default TimesTablesPage