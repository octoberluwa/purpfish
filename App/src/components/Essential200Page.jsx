import React, { useRef, useState } from 'react'

const Essential200 = [
  "a", "about", "after", "again", "all", "also", "always", "am", "an", "and",
  "any", "are", "around", "as", "ask", "at", "away", "back", "be", "because",
  "been", "before", "being", "below", "best", "better", "big", "both", "but", "by",
  "call", "came", "can", "come", "could", "day", "did", "do", "does", "don't",
  "down", "each", "eat", "end", "even", "every", "far", "find", "first", "for",
  "found", "from", "funny", "get", "give", "go", "goes", "good", "got", "great", "had",
  "has", "have", "he", "help", "her", "here", "him", "his", "home", "house",
  "how", "I", "if", "in", "into", "is", "it", "its", "jump", "just", "keep", "kind",
  "know", "land", "large", "last", "left", "like", "little", "live", "long", "look",
  "made", "make", "man", "many", "may", "me", "men", "might", "more", "most",
  "mother", "much", "must", "my", "name", "need", "never", "new", "next", "no",
  "not", "now", "number", "of", "off", "old", "on", "once", "one", "only",
  "open", "or", "other", "our", "out", "over", "own", "part", "people", "place",
  "play", "put", "read", "right", "run", "said", "same", "saw", "say", "see",
  "she", "should", "show", "side", "small", "so", "some", "something", "soon", "start",
  "stop", "such", "take", "tell", "than", "that", "the", "them", "then", "there",
  "these", "they", "thing", "think", "this", "those", "thought", "three", "through", "time",
  "to", "together", "too", "try", "two", "under", "until", "up", "us", "use",
  "very", "walk", "want", "was", "watch", "water", "way", "we", "well", "went",
  "were", "what", "when", "where", "which", "while", "who", "why", "will", "with",
  "word", "work", "would", "write", "yes", "you", "your"
];

const Essential200Page = () => {
  const [WordList, setWordList] = useState(Essential200)
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

  function startActivity() {
    setIsSpellingSettingsSubmitted(true)
    generateWord()
  }

  return (
    <>
        <main>
          {!IsSpellingSettingsSubmitted && <section id="spelling-settings">
            <p class="task-description">
              <b><i>This is a spelling activity based on the Essential 200.</i></b>
              <br/><br/>
              This consists of the 200 most common words in the English Language, a familiarity with these will help greatly in your spelling!<br/>
              <br/>
              <button onClick={startActivity} id="e200-button">Start</button>
            </p>
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

export default Essential200Page
