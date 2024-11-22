export const getAllDrivers = async() => {
    const response = await fetch('http://localhost:4000/api/driver', {cache: 'no-cache'} )
    return response.json()
}