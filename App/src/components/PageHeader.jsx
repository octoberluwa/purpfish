import React from 'react'
import logo from '../images/purpfish_logo.png'

const PageHeader = () => {
  return (
    <header>
        <img src={logo} id="purpfish-logo"/>
        <h1 id="main-header">purpfish</h1>
    </header>
  )
}

export default PageHeader