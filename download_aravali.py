import urllib.request

url = "https://static.toiimg.com/thumb/msid-126524405,width-1070,height-580,imgsize-210932,resizemode-75,overlay-toi_sw,pt-32,y_pad-500/photo.jpg"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        with open("public/aravali.jpg", "wb") as f:
            f.write(response.read())
    print("Downloaded successfully")
except Exception as e:
    print(f"Failed: {e}")
