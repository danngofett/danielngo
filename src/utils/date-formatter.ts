export const dateFormatter = (date: Date): string => {
  const day = date.getDate()
  const month = date.toLocaleString('default', { month: 'long' })
  const year = date.getFullYear()

  return `${day}${nthNumber(day)} ${month} ${year}`
}

export const nthNumber = (number: number) => {
  if (number > 3 && number < 21) {
    return 'th'
  }

  switch (number % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}
