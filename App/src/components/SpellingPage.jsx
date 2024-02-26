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


  function sayWordToSpell() {
    let utterance = new SpeechSynthesisUtterance("Hello world!");
    speechSynthesis.speak(utterance);

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
            <p>
              Work in Progress.
            </p>
          </div>}

          {IsSpellingSettingsSubmitted && <div>
            <button onClick={sayWordToSpell}>Say</button>
            <p></p>
            <input type="text"></input>  
            <p>{ WordToSpell }</p>
          </div>}
        </main>
    </>
    )
}

export default SpellingPage