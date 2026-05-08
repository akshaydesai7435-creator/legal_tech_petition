import urllib.request
import re

url = "https://www.timesnownews.com/bengaluru/article/bengaluru-victims-of-accidents-caused-by-potholes-bad-roads-to-get-up-to-rs-15000-compensation-by-bbmp/689966"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')
    match = re.search(r'<meta property="og:image" content="(.*?)"', html)
    print(match.group(1) if match else "Not found")
except Exception as e:
    print(e)
