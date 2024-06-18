export const getUTCDate = (dateString: string) => {
  const date = new Date(dateString)
  const utcDate = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 6)
  )

  return utcDate
}
