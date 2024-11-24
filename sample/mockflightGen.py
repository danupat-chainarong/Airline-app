import random
import json
from datetime import datetime, timedelta

# Constants
CITIES = [
    ("Berlin", "BER"),
    ("Bangkok", "BKK"),
    ("Tokyo", "TYO"),
    ("New York", "NYC"),
    ("Dubai", "DXB"),
    ("Sydney", "SYD")
]

CARRIERS = [
    ("EchoFlights", "ECHO", "https://static.wixstatic.com/media/2fc393_8b25b80491d94867a533cb4896a7d9ce~mv2.png"),
    ("AeroJet", "AERO", "https://1000logos.net/wp-content/uploads/2020/09/Aerojet-Rocketdyne-Logo-1942.jpg"),
    ("VivaJet", "VIVA", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT027QfI-XwewbsLZyLXM6iSI2KDJsU63HanA&s"),
    ("SkyConnect", "SKY", "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/15/b7/4d/15b74de6-0d2b-4378-5efc-4690aa1fbf0c/AppIcon-SkyConnect-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/1200x630wa.png"),
    ("American Airlines", "AAL", "https://i.imgur.com/JhS3f.png"),
    ("SunAir", "SUN", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJvg-Ny2SU_4hmCKH96Vvl-RLO_5mgjlETPA&s"),
    ("Nok Airline", "Nok Air", "https://asiaairticket.com/wp-content/uploads/2017/08/Logo-Nokair.png")
]

FLIGHT_NUM_PREFIXES = ["FL", "AF", "VJ", "SK", "AAL", "SUN", "NK"]

# Generate random flight number
def generate_flight_number():
    return f"{random.choice(FLIGHT_NUM_PREFIXES)}{random.randint(100, 999)}"

# Generate mock flight data
def generate_flight_data():
    flights = []
    start_date = datetime(2024, 11, 24)
    end_date = datetime(2024, 12, 31)

    for day in range((end_date - start_date).days + 1):
        current_date = start_date + timedelta(days=day)
        arrive_date = current_date + timedelta(days=1)

        # Generate flights between each pair of cities
        for i in range(len(CITIES)):
            for j in range(len(CITIES)):
                if i != j:  # Avoid flights from a city to itself
                    for _ in range(3):  # At least 3 flights per pair
                        flight_num = generate_flight_number()
                        ori_city, ori_short = CITIES[i]
                        dest_city, dest_short = CITIES[j]
                        start_time = f"{random.randint(0, 23):02d}:{random.randint(0, 59):02d}:00"
                        arrive_time = f"{random.randint(0, 23):02d}:{random.randint(0, 59):02d}:00"
                        price = round(random.uniform(10000, 150000), 2)
                        carrier = random.choice(CARRIERS)

                        flight = {
                            "flight_num": flight_num,
                            "ori_name": ori_city,
                            "ori_short": ori_short,
                            "start_date": current_date.strftime("%d/%m/%Y"),
                            "start_time": start_time,
                            "dest_name": dest_city,
                            "dest_short": dest_short,
                            "arrive_date": arrive_date.strftime("%d/%m/%Y"),
                            "arrive_time": arrive_time,
                            "carrier": carrier[1],
                            "carrier_full": carrier[0],
                            "price": price,
                            "carrier_img": carrier[2]
                        }
                        flights.append(flight)

    return flights

# Generate and print mock flight data
mock_flight_data = generate_flight_data()
# Write mock flight data to a JSON file
with open('./mock_flight_data.json', 'w') as json_file:
    json.dump(mock_flight_data, json_file, indent=4)

print(f"Total flight: {len(mock_flight_data)}")
print("Mock flight data has been written to 'mock_flight_data.json'")