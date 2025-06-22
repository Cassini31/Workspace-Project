import CurrentMonthandYear from './current-month-and-year.jsx' /* ?? */
import CurrentWeekNumber from './current-week-number.jsx' /* ?? */
import CalendarTable from './calendar-table.jsx' /* ?? */

const Calendar = () => { /* ?? */
  return (
    <>
      <h1>
        <CurrentMonthandYear />{/* Month and year header of the app */}
      </h1>
      <h2>
        <CurrentWeekNumber />{/* Current week number header shown in the app */}
      </h2>
      <CalendarTable />{/* ?? */}
    </>
  )
}

export default Calendar