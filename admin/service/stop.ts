export async function getAllStops() {
    const res = await fetch('http://localhost:4000/api/stop', {cache: 'no-cache'})
    return res.json()
}