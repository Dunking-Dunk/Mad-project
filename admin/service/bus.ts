export const getAllBus = async () => {
  const response = await fetch('http://localhost:4000/api/bus?populate=true', { cache: 'no-cache' })

  return response.json()
}

export const getBus = async (id: string) => {
  const response = await fetch(`http://localhost:4000/api/bus/${id}?populate=true`, { cache: 'no-cache' })

  return response.json()
}

export const getAllTracker = async () => {
  const response = await fetch('http://localhost:4000/api/gps-tracking', { cache: 'no-cache' })

  return response.json()
}
