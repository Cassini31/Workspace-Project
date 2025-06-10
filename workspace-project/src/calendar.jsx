/* Child Components */
const CurrentMonthandYear = () => {
  const MonthandYear = new Date() /* Creates new date object representing the current date and time. */
  const MonthandYearFormat = { /* Object to specify format */
    month: 'long',
    year: 'numeric',
  }

  return (
    MonthandYear.toLocaleDateString('en-US',MonthandYearFormat) /* Method to format the date to be presented */
  )
}

const CurrentWeekNumber = () => {
  const Today = new Date() /* Creates new date object representing the current date and time. */
  const DayOfWeek = Today.getUTCDay() /* ?? */
  const NearestThursday = new Date(Today) /* ?? */

  NearestThursday.setUTCDate(Today.getUTCDate() + 4 - (DayOfWeek === 0 ? 7 : DayOfWeek)) /* ?? */

  const YearStart = new Date(Date.UTC(NearestThursday.getUTCFullYear(), 0, 1)) /* ?? */
  const WeekNumber = Math.ceil((((NearestThursday - YearStart) / 86400000) + 1) / 7) /* ?? */

  return (
    <p>
    Week {WeekNumber} {/* ?? */}
    </p>
  )
}

const CalendarWeekHeader = () => {
  const Today = new Date() /* Creates new date object representing the current date and time. */
  const CurrentDayIndex = Today.getDay() /* Method to return the day of the week as Index where Sunday = 0, Monday = 1, Tuesday = 2 etc. */
  const DayFormat = {weekday: 'short'} /* Object to specify format */
  
  const GetWeekDays = () => {
    const WeekDays = [] /* Creates an array. */

    for (let i = 0; i < 7; i++) {
      const Day = new Date(Today) /* Safe copy of "Today" variable for mutation later i.e. June 9, 2025 (down to the local time). */
      Day.setDate(Today.getDate() - CurrentDayIndex + i) /* Mutate "Day" to change its day of the month according to local time i.e. 9 (from June 9) - 1 (Monday) + 0 (Current value of i) = 8. */

      const DayName = Day.toLocaleDateString(undefined,DayFormat) /* Returns the day of the week from the mutated "Day" variable in short day format i.e. Sun. */
      const DateNum = Day.getDate() /* Returns the day of the month from the mutated "Day" variable according to local time i.e. 8. */

      WeekDays.push(`${DayName} ${DateNum}`) /* To update the "WeekDays" array with "DayName" and "DateNum". */
      /* After running the above block of code, the afterthought of the For Loop will increment i with 1, then it will evaluate again the conditional expression of i < 7 using the iterated value of i. */
      /* For as long as the conditional expression of the For Loop returns a true evaluation, the above block of code will continue to run. */
      /* When i reaches a value that is = or > 7 (the conditional expression of the For Loop), it will return a false evaluation and the above block of code will stop running. */
    }
    return (
      WeekDays
    )
    /* Returns the mutated "WeekDays" array after the above For Loop. */
  }

  const WeekHeaders = GetWeekDays().map((label, index) => (
    <th key={index}>{label}</th>
  )) /* ?? */

  return (
    <thead>
      <tr><th>Partners</th>{WeekHeaders}</tr>
    </thead>
    /* ?? */
  )
}

/* Parent Component */
function Calendar() {

  return (
    <>
      <h1>
        <CurrentMonthandYear />{/* Month and year header of the app */}
      </h1>
      <h2>
        <CurrentWeekNumber />{/* Current week number header shown in the app */}
      </h2>
      <table border="1" cellSpacing="0" cellPadding="30">
        <CalendarWeekHeader />{/* Weekdays and Dates header of the calendar */}
        <tbody>
          <tr>
            <td>Partner A</td>
            <td>
              <ul>
                <li>Task a 4 hrs</li>
                <li>Task b 2 hrs</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Task c 4 hrs</li>
                <li>Task d 2 hrs</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Task e 4 hrs</li>
                <li>Task f 2 hrs</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Task g 4 hrs</li>
                <li>Task h 2 hrs</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Task i 4 hrs</li>
                <li>Task j 2 hrs</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>NA</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>NA</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>Partner B</td>
            <td>
              <ul>
                <li>Task a 4 hrs</li>
                <li>Task b 2 hrs</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Task c 4 hrs</li>
                <li>Task d 2 hrs</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Task e 4 hrs</li>
                <li>Task f 2 hrs</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Task g 4 hrs</li>
                <li>Task h 2 hrs</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Task i 4 hrs</li>
                <li>Task j 2 hrs</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>NA</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>NA</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default Calendar