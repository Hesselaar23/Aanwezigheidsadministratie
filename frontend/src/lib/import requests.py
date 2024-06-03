import requests

# Strapi API endpoint
url = "http://10.10.10.80:1337/api/medewerkers"

headers = {
    "Content-Type": "application/json"
    }
# List of names to update or create
names = [
]

# Function to split names
def split_name(full_name):
    parts = full_name.split()
    first_name = parts[0]
    middle_name = ""
    last_name = parts[-1]

    if len(parts) > 2:
        middle_name = " ".join(parts[1:-1])

    return first_name, middle_name, last_name

# Prepare the payload
payload = []

for name in names:
    first_name, middle_name, last_name = split_name(name)
    email = f"{first_name.lower()}.{middle_name.lower()}{last_name.lower()}@kega.nl"
    entry = {
        "data":{
            "voornaam": first_name,
            "tussenvoegsels": middle_name,
            "achternaam": last_name,
            "email": email,
        }
    }
        
    str_entry = str(entry)
    newentry = str_entry.replace("'", "\"")

    print(newentry)

    # Send the PUT request
    response = requests.post(url, newentry, headers=headers)

























    # Check the response
    if response.status_code == 200:
        print("Successfully updated/created entries")
    else:
        print(f"Failed to update/create entries: {response.status_code}")


