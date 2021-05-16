function shuffleArray(array: string[]): string[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }

  return array
}

const getNames = (fileContents: object[]): string[] => {
  const names = new Set<string>()

  fileContents.forEach((f: any) => {
    names.add(f['Name of sender/receiver'])
  })

  return shuffleArray(Array.from(names)).slice(0, 100)
}

export default getNames
