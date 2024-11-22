export const getAllAnnouncements = async () => {
    const response = await fetch(`http://localhost:4000/api/announcement`, { cache: 'no-cache' })

    return response.json()
}