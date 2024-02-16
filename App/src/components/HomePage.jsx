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
                Select one of the topics below to begin learning with PurpFish!.<br/>
            </p>
            <h1>PurpMaths: </h1>
            <p>
              Test yourself with your times tables and keep track of your score!
            </p>
            <Link to="/timestables">Times Tables</Link>
            {IsSpeechSynthesisSupported && <div>
              <h1>PurpEnglish</h1>
              <Link to="/spelling">Spelling</Link>
            </div>}
        </main>
    </>
  )
}

export default HomePage