export function startOfDay(date) {
    const d = new Date(date)
    d.setHours(0, 0, 0, 0)
    if (isNaN(d.getTime())) return undefined 
    return d
}