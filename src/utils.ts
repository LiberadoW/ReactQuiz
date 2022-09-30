export const shuffleArray = (array: any[]) => {
    const shuffled = array.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

    return shuffled
}