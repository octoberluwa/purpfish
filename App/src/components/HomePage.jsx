import React, { useState, useEffect} from "react"
import { Link } from "react-router-dom"

const HomePage = () => {
  const [IsSpeechSynthesisSupported, setIsSpeechSynthesisSupported] = useState(false)

  useEffect(() => {
    setIsSpeechSynthesisSupported('speechSynthesis' in window)
  }, [])

  return (
    <>
        <main>
            <h1>Welcome to PurpFish!</h1>
            <p>
                I hope you enjoy your learning here!<br/>
            </p>
            <h1>PurpMaths: </h1>
            <p>
              Test yourself with your times tables and keep track of your score!
            </p>
            <Link to="/timestables">Times Tables</Link>
            {IsSpeechSynthesisSupported && <div>
              <h1>PurpEnglish: </h1>
              <p>
                Test your spelling capabilities using custom words and score high!
              </p>
              <Link to="/spelling">Spelling</Link>
              <br/><br/>
              <p>
                Test yourself on the Essentials 200, the 200 most common words in the English dictionary!
              </p>
              <Link to="/e200">Essentials 200</Link>
              <h1>PurpTalk: </h1>
              <p>
                Ace social situations and keep the conversation going!
              </p>
              <Link to="/social-info">Birthdays</Link>
            </div>}
        </main>
    </>
  )
}

export default HomePage