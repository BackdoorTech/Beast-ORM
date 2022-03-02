// generate unique string
export function uniqueGenerator() {
    return (Math.random() +'uuid'+ new Date().getTime()).slice(2)
}