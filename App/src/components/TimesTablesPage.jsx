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
    generateProductPair()
    setAnswer(generateAnswer())
    setQuestion(generateQuestion())
    setIsTimesTablesSettingsSubmitted(true)
  }




  const timeTableNumbers = TimeTableNumbers
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






  const [Answer, setAnswer] = useState(0)
  const [Question, setQuestion] = useState(0)
  const [AnswerFeedback, setAnswerFeedback] = useState("")
  const [IsAnswerSubmitted, setIsAnswerSubmitted] = useState(false)
  const [QuestionsGiven, setQuestionsGiven] = useState(1)
  const [QuestionsAnswered, setQuestionsAnswered] = useState(0)
  const [CorrectAnswers, setCorrectAnswers] = useState(0)
  const [ScorePercentage, setScorePercentage] = useState(0)
  const UsersAnswer = useRef(null)

  function resetForNextQuestion() {
    setAnswerFeedback("")
    UsersAnswer.current.value = ""
    setIsAnswerSubmitted(false)
  }

  function generateNextProductPair() {
    setQuestionsGiven(QuestionsGiven + 1)
    setScorePercentage(Math.round((CorrectAnswers / QuestionsGiven) * 100))
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
      setCorrectAnswers(CorrectAnswers + 1)
    } else {
      setAnswerFeedback(`The correct answer is ${Answer}.`)
    }
    setQuestionsAnswered(QuestionsAnswered + 1)
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
          {!IsTimesTablesSettingsSubmmited && <section id="times-table-settings">
            <p>
              <b><i>Select the Times Tables that you want to practice:</i></b><br/>
              <br/>
              The Times Tables used will be randomised from the selection.<br/>
              <br/>
            </p>
            <div id="times-table-checkboxes">
              {timeTableCheckBoxesNumbers.map(item => {
                  return (
                      <label><input type='checkbox' name={item} value={item} onChange={timesTableCheckboxHandler}/>{item}</label>
                  )
              })}
            </div>
            {!(TimeTableNumbers.length == 0) && <button id="submit-times-table-settings"onClick={submitTimesTableNumbers}>Submit</button>}
          </section>}






          {IsTimesTablesSettingsSubmmited && <section id="question-section">
            <p id="times-table-question">{ Question }</p>
            <input ref={UsersAnswer} type="text" id="times-table-answer-input" onKeyDown={ submitIfEnterKeyPressed }></input><br/>
            {!IsAnswerSubmitted && 
            <button id="submit-answer-button" onClick={ markAnswer }>Submit</button>}
            {IsAnswerSubmitted && <button id="next-question-button" onClick={ generateNextProductPair }>Next Question</button>}
            <p id="answer-feedback">{ AnswerFeedback }</p>
            <p id="user-score">{ CorrectAnswers }/{ QuestionsAnswered }({ ScorePercentage }%)</p>
          </section>}
        </main>
    </>
  )
}

export default TimesTablesPage