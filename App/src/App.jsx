import { Route, Routes } from "react-router-dom"
import HomePage from "./components/HomePage"
import PageHeader from "./components/PageHeader"
import TimesTablesPage from "./components/TimesTablesPage"
import SpellingPage from "./components/SpellingPage"
import SocialInfoPage from "./components/SocialInfoPage"
import Essential200Page from "./components/Essential200Page"
import './style.css'



const App = () => {
  return (
    <>
      <PageHeader />
      <Routes>
        <Route path="/" element={ <HomePage /> }/>
        <Route path="/timestables" element={ <TimesTablesPage />}/>
        <Route path="/spelling" element={ <SpellingPage />}/>
        <Route path="/social-info" element={ <SocialInfoPage />}/>
        <Route path="/e200" element={ <Essential200Page />}/>
      </Routes>
    </>
  )
}

export default App
