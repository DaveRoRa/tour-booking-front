export const searchWithSameCase = (
  input: string,
  jsonMap: Record<string, string>,
) => {
  const individualWordReplacement = (word: string) => {
    if (!word) return ""
    const isFirstLetterLowerCase = word[0] === word[0].toLocaleLowerCase()
    const inJsonValue = jsonMap[word.toLocaleLowerCase()] || word
    if (isFirstLetterLowerCase) return inJsonValue
    return inJsonValue[0].toLocaleUpperCase() + inJsonValue.substring(1)
  }

  return input.split(/(\s|,)/).map(individualWordReplacement).join("")
}

export const convertMinutesToHours = (totalMins: number) => {
  const hours = Math.floor(totalMins / 60)
  const minutes = totalMins % 60
  return { hours, minutes }
}
