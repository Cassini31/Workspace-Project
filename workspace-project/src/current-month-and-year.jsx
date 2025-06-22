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

export default CurrentMonthandYear