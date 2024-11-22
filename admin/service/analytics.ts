export const getCount = async() => {
    const res = await fetch('http://localhost:4000/api/data/quick-stats', {
        cache: 'no-cache'
    })
    return res.json()
}