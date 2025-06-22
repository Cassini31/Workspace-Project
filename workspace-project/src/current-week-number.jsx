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

export default CurrentWeekNumber