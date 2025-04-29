import requests
import json
import time

graph = {
    "nodes": [
        {"id": "Columbus", "lat": 39.9612, "lng": -82.9988},
        {"id": "Chicago", "lat": 41.8781, "lng": -87.6298},
        {"id": "Sioux Falls", "lat": 43.5446, "lng": -96.7311},
        {"id": "Keystone", "lat": 43.8816, "lng": -103.4591},
        {"id": "Cody", "lat": 44.5263, "lng": -109.0565},
        {"id": 'Old Faithful', "lat": 44.4605, "lng": -110.8281},
        {"id": "Missoula", "lat": 46.8721, "lng": -113.9940},
        {"id": "Seattle", "lat": 47.6062, "lng": -122.3321},
        {"id": "Lund", "lat": 49.9833, "lng": -124.7667},
        {"id": "Vancouver", "lat": 49.2827, "lng": -123.1207},
        {"id": "Seattle Return", "lat": 47.6062, "lng": -122.3321},
        {"id": "Portland", "lat": 45.5152, "lng": -122.6784},
        {"id": "Boise", "lat": 43.6150, "lng": -116.2023},
        {"id": "Denver", "lat": 39.7392, "lng": -104.9903},
        {"id": "St. Louis", "lat": 38.6270, "lng": -90.1994},
        {"id": "Columbus Return", "lat": 39.9612, "lng": -82.9988}
    ],
    "edges": [
        {"from": "Columbus", "to": "Chicago"},
        {"from": "Chicago", "to": "Sioux Falls"},
        {"from": "Sioux Falls", "to": "Keystone"},
        {"from": "Keystone", "to": "Cody"},
        {"from": "Cody", "to": "Old Faithful"},
        {"from": "Old Faithful", "to": "Missoula"},
        {"from": "Missoula", "to": "Seattle"},
        {"from": "Seattle", "to": "Lund"},
        {"from": "Lund", "to": "Vancouver"},
        {"from": "Vancouver", "to": "Seattle Return"},
        {"from": "Seattle Return", "to": "Portland"},
        {"from": "Portland", "to": "Boise"},
        {"from": "Boise", "to": "Denver"},
        {"from": "Denver", "to": "St. Louis"},
        {"from": "St. Louis", "to": "Columbus Return"}
    ]
}

ORS_API_KEY = "5b3ce3597851110001cf6248d0d232daa6cd4630a9f002a510f29323"  # <-- Make sure you put your API key here

def get_route(from_coords, to_coords):
    url = "https://api.openrouteservice.org/v2/directions/driving-car/geojson"
    headers = {
        "Authorization": ORS_API_KEY,
        "Content-Type": "application/json",
    }
    body = {
        "coordinates": [
            [from_coords[1], from_coords[0]],  # [lng, lat]
            [to_coords[1], to_coords[0]],
        ]
    }
    response = requests.post(url, headers=headers, json=body)
    response.raise_for_status()
    data = response.json()
    coords = data['features'][0]['geometry']['coordinates']
    return [[lat, lng] for lng, lat in coords]  # Flip to [lat, lng] for Leaflet

routes = {}

for edge in graph["edges"]:
    from_node = next(n for n in graph["nodes"] if n["id"] == edge["from"])
    to_node = next(n for n in graph["nodes"] if n["id"] == edge["to"])

    try:
        route = get_route((from_node["lat"], from_node["lng"]), (to_node["lat"], to_node["lng"]))
        routes[f"{edge['from']}->{edge['to']}"] = route
        print(f"Fetched {edge['from']} -> {edge['to']}")
    except Exception as e:
        print(f"Error fetching {edge['from']} -> {edge['to']}: {e}")
    
    time.sleep(3)  

with open("routes.json", "w") as f:
    json.dump(routes, f)
