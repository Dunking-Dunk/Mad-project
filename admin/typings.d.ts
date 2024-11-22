type Base = {
  id?: string,
}

interface Coordinate {
  latitude: number,
  longitude: number
}

interface Image {
  publicId: string,
  url: string
}

interface Bus extends Base{
    busNumber: string,
    busSet: string,
    busName: string,
    description: string,
    stops?: string[],
  tracker?: string,
  driver?:string,
    seats: number,
    ac: boolean,
    status: boolean,
  origin: string,
}
  
interface Stop extends Base{
  name: string,
  address: string,
  location?: any,
  coords?: any
  placeId?: string
}

interface Driver extends Base {
  name: string,
  phoneNumber: number,
  image: Image,
  busId: string,
}