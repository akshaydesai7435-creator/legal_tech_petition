import urllib.request

url = "https://images.indianexpress.com/2023/06/ch1541116-1.jpg"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        with open("public/hospital.jpg", "wb") as f:
            f.write(response.read())
    print("Downloaded successfully")
except Exception as e:
    print(f"Failed: {e}")
