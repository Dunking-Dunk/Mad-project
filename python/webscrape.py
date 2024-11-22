from bs4 import BeautifulSoup
import requests
from urllib.parse import urlencode
import csv
from geopy.geocoders import Nominatim

geolocator = Nominatim(user_agent="delhi_bus_locator")

url = "https://yometro.com/buses/dtc.php"
result = requests.get(url).text
doc = BeautifulSoup(result, "html.parser")

all_bus_no = doc.find("select")
bus_no = all_bus_no.find_all("option")

api_key = "AIzaSyAaCWjzUJ1XziqSuWycOTNorOmfe2swDIc"

def extract_lat_lng(address):
    endpoint = f"https://maps.googleapis.com/maps/api/geocode/json"
    params = {"address": address, "key": api_key}
    url_params = urlencode(params)
    url = f"{endpoint}?{url_params}"
    r = requests.get(url)
    if r.status_code not in range(200, 299): 
        return {}
    latlng = {}
    try:
        latlng = r.json()['results'][0]['geometry']['location']
    except:
        pass
    return latlng.get("lat"), latlng.get("lng")

def get_lat_long(stop):
    location = geolocator.geocode(stop + ", Delhi")
    if location:
        return location.latitude, location.longitude
    else:
        return None, None
    
# Open the CSV file for writing
with open("100.csv", "w", newline="") as csvfile:
    fieldnames = ['Bus No', 'Stop Name', 'Arrival Time', 'Distance', 'Latitude', 'Longitude']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    
    # Write the header row
    writer.writeheader()

    for bus in bus_no[1]:
        print(f"Bus No: {bus.string}")
        bus_url = f"https://yometro.com/buses/dtc-bus-route-{bus.string}"
        bus_result = requests.get(bus_url).text
        bus_doc = BeautifulSoup(bus_result, "html.parser")
		
        bus_details = bus_doc.find("table")
        bus_info = bus_details.find_all("tr")
        for index, info in bus_info:
            print(f"{index.string}: {info.string}")
			
        bus_stops = bus_doc.find_all("table")[1]
        bus_stops_info = bus_stops.find_all("tr")
		# print(bus_stops_info)
        for index, time, distance in bus_stops_info[1:-1]:
            stop = index.string[3:]
            print(f"{stop}, {time.string}, {distance.string}")
            lat, long = extract_lat_lng(f"{stop} bus stop delhi")
            print(lat, long)
            writer.writerow({'Bus No': bus.string, 'Stop Name': stop, 'Arrival Time': time.string, 'Distance': distance.string, 'Latitude': lat, 'Longitude': long})
        print(bus_stops_info[-1].td.text)
 
        print("-------------------------------")