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
  }

  
  return (
    <>
        <main>
          {!IsSpellingSettingsSubmitted && <div id="spelling-settings">
            <input type="text" ref={wordToSubmit}></input>
            <div id="spelling-settings-buttons">
              <button onClick={submitWord}>Submit</button>
              {!(WordList == ![]) && <button onClick={submitWordList}>Next</button>}
            </div>
            <p>{ WordList }</p>
            <p>
              Work in Progress.
            </p>
          </div>}
        </main>
    </>
    )
}

export default SpellingPage