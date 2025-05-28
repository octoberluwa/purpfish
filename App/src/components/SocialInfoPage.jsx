import React, { useRef, useState } from 'react'

const SocialResponsePage = () => {
  const [IsInfoSubmitted, setIsInfoSubmitted] = useState(false)

  const birthDate = useRef("")
  const userName = useRef("")

  const [PhraseList, setPhraseList] = useState([])
  const [CurrentPhrase, setCurrentPhrase] = useState({})
  const [UserResponse, setUserResponse] = useState("")
  const [IsAnswerSubmitted, setIsAnswerSubmitted] = useState(false)
  const [IsAnswerCorrect, setIsAnswerCorrect] = useState(false)
  const [AnswerFeedback, setAnswerFeedback] = useState("")
  const [QuestionsGiven, setQuestionsGiven] = useState(0)
  const [QuestionsAnswered, setQuestionsAnswered] = useState(0)
  const [CorrectAnswers, setCorrectAnswers] = useState(0)
  const [ScorePercentage, setScorePercentage] = useState(0)

  const responseInput = useRef(null)

  function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text)
    speechSynthesis.speak(utterance)
  }

  function startPractice() {
    if (userName.current.value.trim() === "" || birthDate.current.value.trim() === "") { return }

    const age = Math.floor((new Date() - new Date(birthDate.current.value)) / 3.15576e10)

    if (age <= 0 ) { return }


    const birthday = new Date(birthDate.current.value).toLocaleString('default', { month: 'long' }) + " " + new Date(birthDate.current.value).getDate()
    const birthYear = new Date(birthDate.current.value).getFullYear()




    const phraseList = [
      { prompt: "How are you?", answer: "I am fine." },
      { prompt: "How old are you?", answer: "I am " + age + " years old." },
      { prompt: "When is your birthday?", answer: "My birthday is on " + birthday + "." },
      { prompt: "What is your date of birth?", answer: "My date of birth is on " + birthday + " " + birthYear + "." }
    ]

    setPhraseList(phraseList)

    const random = randomElementFromArray(phraseList)
    setCurrentPhrase(random)
    setQuestionsGiven(1)
    setIsInfoSubmitted(true)
    speak(random.prompt)
  }

  function randomElementFromArray(array) {
    const index = Math.floor(Math.random() * array.length)
    return array[index]
  }

  function handleInputChange(e) {
    setUserResponse(e.target.value)
  }

  function markAnswer() {
    if (responseInput.current.value.trim() === "") { return }

    setIsAnswerSubmitted(true)
    setQuestionsAnswered(QuestionsAnswered + 1)

    const isCorrect = responseInput.current.value.trim().toLowerCase() === CurrentPhrase.answer.toLowerCase()
    setIsAnswerCorrect(isCorrect)

    if (isCorrect) {
      setCorrectAnswers(CorrectAnswers + 1)
      setAnswerFeedback("Correct!")
    } else {
      setAnswerFeedback(`The correct response is "${CurrentPhrase.answer}"`)
    }

    setScorePercentage(
      Math.round(((isCorrect ? CorrectAnswers + 1 : CorrectAnswers) / QuestionsGiven) * 100)
    )

    speak(CurrentPhrase.answer)
  }

  function nextQuestion() {
    if (IsAnswerCorrect) {
      const next = randomElementFromArray(PhraseList)
      setCurrentPhrase(next)
    }

    setUserResponse("")
    setIsAnswerSubmitted(false)
    setQuestionsGiven(QuestionsGiven + 1)
    speak(CurrentPhrase.prompt)
  }

  function submitIfEnterKeyPressed(e) {
    if (e.keyCode !== 13) { return }

    if (IsInfoSubmitted) {
      if (IsAnswerSubmitted) {
        nextQuestion()
      } else {
        markAnswer()
      }
    } else {
      startPractice()
    }
  }

  return (
    <main>
      {!IsInfoSubmitted &&
        <section id="social-info-settings">
          <p><i>Enter the name to be used below:</i></p>
          <input type="text" ref={userName} onKeyDown={submitIfEnterKeyPressed} />
          <br/>
          <p><i>Enter the date of birth:</i></p>
          <input type="date" ref={birthDate} onKeyDown={submitIfEnterKeyPressed} />
          <br/><br/>
          <button onClick={startPractice}>Start Practice</button>
        </section>
      }

      {IsInfoSubmitted && <div>
        {!IsAnswerSubmitted && (<p class="task-hint"><i>Enter the repsonse to the phrase below.</i></p>)}
        <section id="social-info-questions">
          <p>"{CurrentPhrase.prompt}"</p>
          {!IsAnswerSubmitted && (
            <>
              <input type="text" ref={responseInput} onKeyDown={ submitIfEnterKeyPressed }/>
              <button onClick={markAnswer}>Submit</button>
            </>
          )}

          {IsAnswerSubmitted && 
            <div>
              {!IsAnswerCorrect && <p class="social-info-answer">"{ responseInput.current.value }" ✗</p>}
              <p>{ CurrentPhrase.answer } ✓</p>
              <button onClick={nextQuestion}>Next Phrase</button>
              <p id="answer-feedback">{ AnswerFeedback }</p>
            </div>
          }

          <p id="user-score">{ CorrectAnswers }/{ QuestionsAnswered } ({ ScorePercentage }%)</p>
        </section>
      </div>}
    </main>
  )
}

export default SocialResponsePage
