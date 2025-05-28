import React, { useRef, useState } from 'react'

const SpellingPage = () => {
  const [WordList, setWordList] = useState([])
  const [IsSpellingSettingsSubmitted, setIsSpellingSettingsSubmitted] = useState(false)

  const wordToSubmit = useRef(null)

  function submitWord() {
    if (wordToSubmit.current.value == "") { return } 

    setWordList([...WordList, wordToSubmit.current.value])
    wordToSubmit.current.value = ""
  }

  function submitWordList() {
    setIsSpellingSettingsSubmitted(true)

    if (WordList.length > 0) {
      const randomWord = randomElementFromArray(WordList);
      setWordToSpell(randomWord);
    }
  }






  function randomElementFromArray(array) {
    let elementID = Math.floor(Math.random() * array.length)
    return array[elementID] 
  }

  const [WordToSpell, setWordToSpell] = useState("")
  const [AnswerFeedback, setAnswerFeedback] = useState("")
  const [IsAnswerSubmitted, setIsAnswerSubmitted] = useState(false)
  const [IsAnswerCorrect, setIsAnswerCorrect] = useState(false)
  const [QuestionsGiven, setQuestionsGiven] = useState(1)
  const [QuestionsAnswered, setQuestionsAnswered] = useState(0)
  const [CorrectAnswers, setCorrectAnswers] = useState(0)
  const [ScorePercentage, setScorePercentage] = useState(0)

  const wordToMark = useRef(null)


  function sayWordToSpell() {
    let utterance = new SpeechSynthesisUtterance(WordToSpell);
    speechSynthesis.speak(utterance);

  }

  function markAnswer() {
    if (wordToMark.current.value == "") { return }

    setIsAnswerSubmitted(true)
    if (wordToMark.current.value.toLowerCase() == WordToSpell.toLowerCase()) {
      setIsAnswerCorrect(true)
      setAnswerFeedback("Correct!")
      setCorrectAnswers(CorrectAnswers + 1)
    } else {
      setIsAnswerCorrect(false)
      setAnswerFeedback(`The correct spelling is '${WordToSpell}'`)
    }
    setQuestionsAnswered(QuestionsAnswered + 1)
  }

  function resetForNextQuestion() {
    setAnswerFeedback("")
    wordToMark.current.value = ""
    setIsAnswerSubmitted(false)
  }

  function generateWord() {
    const randomWord = randomElementFromArray(WordList);
    setWordToSpell(randomWord);
  }

  function generateNextWord() {
    if (IsAnswerCorrect) {
      generateWord()
    }
    
    setIsAnswerSubmitted(false)
    setQuestionsGiven(QuestionsGiven + 1)
    setScorePercentage(Math.round((CorrectAnswers / QuestionsGiven) * 100))
    resetForNextQuestion()
  }

  function submitIfEnterKeyPressed(keyPressed) {
    if (keyPressed.keyCode !== 13) { return }

    if (IsAnswerSubmitted) {
      generateNextWord()
    } else {
      markAnswer()
    }
  }


  function submitWordIfEnterKeyPressed(keyPressed) {
    if (keyPressed.keyCode !== 13) { return }

    submitWord()
  }

  return (
    <>
        <main>
          {!IsSpellingSettingsSubmitted && <section id="spelling-settings">
            <p>
              <b><i>Type the words you want to spell and submit them <u>one at a time</u>:</i></b><br/>
              <br/>
              The words to spell will be randomised from the selection.<br/>
              <br/>
            </p>
            <input type="text" ref={wordToSubmit} onKeyDown={submitWordIfEnterKeyPressed}></input>
            <div id="spelling-settings-buttons">
              <button onClick={submitWord}>Submit</button>
              {!(WordList.length == 0) && <button onClick={submitWordList}>Next</button>}
            </div>
            <section id="submitted-words">
              {WordList.map(item => {
                  return (
                      <><p>{item}</p></>
                  )
              })}
            </section>
          </section>}






          {IsSpellingSettingsSubmitted && <div>
            <p class="task-hint"><i>Click the button to hear the word to spell.</i></p>
            <section id="question-section">
              <button onClick={sayWordToSpell} id="spelling-speak-button"><span class="material-symbols-outlined">volume_up</span></button> 
              {!IsAnswerSubmitted &&
              <div> 
                <input type="text" ref={wordToMark} id="spelling-input" onKeyDown={ submitIfEnterKeyPressed } /><br/>
                <button onClick={markAnswer}>Submit</button>
              </div>}
              {IsAnswerSubmitted && 
              <div>
                {!IsAnswerCorrect && <p>"{ wordToMark.current.value }" ✗</p>}
                <p>{ WordToSpell } ✓</p>
                <button onClick={generateNextWord}>Next Word</button>
                <p id="answer-feedback">{ AnswerFeedback }</p>
              </div>}
              <p id="user-score">{ CorrectAnswers }/{ QuestionsAnswered }({ ScorePercentage }%)</p>
            </section>
          </div>}
        </main>
    </>
    )
}

export default SpellingPage