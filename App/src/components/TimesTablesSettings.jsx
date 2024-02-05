import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const TimesTablesSettings = () => {
  const timeTableCheckBoxesNumbers = [1,2,3,4,5,6,7,8,9,10,11,12]

  const [TimeTableNumbers, setTimeTableNumbers] = useState([])

  const timesTableCheckboxHandler = (event) => {
    if (event.target.checked) {
      setTimeTableNumbers([...TimeTableNumbers, event.target.value])
    } else {
      setTimeTableNumbers(TimeTableNumbers.filter(number => number !== event.target.value))
    }
  }
  return (
    <>
        <main>
            <div id="times-table-checkboxes">
              <a>{ TimeTableNumbers }</a>
              {timeTableCheckBoxesNumbers.map(item => {
                  return (
                      <label><input type='checkbox' name={item} value={item} onChange={timesTableCheckboxHandler}/>{item}</label>
                  )
              })}
            </div>
            <Link to="/timestables">This part isn't finished yet you can redirect to the Times Table Page here.</Link>
        </main>
    </>
  )
}

export default TimesTablesSettings