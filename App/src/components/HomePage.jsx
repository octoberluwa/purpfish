import React from "react"
import { Link } from "react-router-dom"

const HomePage = () => {
  return (
    <>
        <main>
            <h1>Welcome to PurpFish!</h1>
            <p>
                I hope you enjoy your learning here!<br/>
                Select one of the topics below to begin learning with PurpFish!.<br/>
            </p>
            <h1>PurpMaths: </h1>
            <Link to="/timestablessettings">Times Tables</Link>
        </main>
    </>
  )
}

export default HomePage