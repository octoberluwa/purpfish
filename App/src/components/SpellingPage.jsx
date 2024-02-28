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

  const wordToMark = useRef(null)


  function sayWordToSpell() {
    let utterance = new SpeechSynthesisUtterance(WordToSpell);
    speechSynthesis.speak(utterance);

  }

  function markAnswer() {
    if (wordToMark.current.value == "") { return }

    setIsAnswerSubmitted(true)
    if (wordToMark.current.value == WordToSpell) {
      setAnswerFeedback("Correct!")
    } else {
      setAnswerFeedback(`The correct spelling is '${WordToSpell}'`)
    }
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
    resetForNextQuestion()
    generateWord()
  }

  return (
    <>
        <main>
          {!IsSpellingSettingsSubmitted && <div id="spelling-settings">
            <input type="text" ref={wordToSubmit}></input>
            <div id="spelling-settings-buttons">
              <button onClick={submitWord}>Submit</button>
              {!(WordList.length == 0) && <button onClick={submitWordList}>Next</button>}
            </div>
            <div id="submitted-words">
              {WordList.map(item => {
                  return (
                      <><p>{item}</p></>
                  )
              })}
            </div>
          </div>}






          {IsSpellingSettingsSubmitted && <div>
            <section id="spelling-section">
              <button onClick={sayWordToSpell} id="spelling-speak-button"><div id="speaker-icon">🔊</div></button>
              <input type="text" ref={wordToMark}></input>  
              {!IsAnswerSubmitted && <button onClick={markAnswer}>Submit</button>}
              {IsAnswerSubmitted && <button onClick={generateNextWord}>Next Word</button>}
            </section>
            <p>{ AnswerFeedback }</p>
          </div>}
        </main>
    </>
    )
}

export default SpellingPage