export function endOfDay(date) {
    const d = new Date(date)
    d.setHours(23, 59, 59, 999)
    if (isNaN(d.getTime())) return undefined
    return d
}