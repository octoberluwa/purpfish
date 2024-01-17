import { Route, Routes } from "react-router-dom"
import HomePage from "./components/HomePage"
import PageHeader from "./components/PageHeader"
import TimesTablesPage from "./components/TimesTablesPage"
import TimesTablesSettings from "./components/TimesTablesSettings"
import './style.css'

const App = () => {
  return (
    <>
      <PageHeader />
      <Routes>
        <Route path="/" element={ <HomePage /> }/>
        <Route path="/timestablessettings" element={ <TimesTablesSettings /> }/>
        <Route path="/timestables" element={ <TimesTablesPage />}/>
      </Routes>
    </>
  )
}

export default App
