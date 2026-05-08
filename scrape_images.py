import urllib.request
import re
from html.parser import HTMLParser

urls = [
    "https://dainikgomantak.esakal.com/maharashtra-news/no-cracks-in-main-span-of-atal-setu-dont-believe-rumours-mmrda-calls-congress-claims-fake-maj94",
    "https://www.timesnownews.com/bengaluru/article/bengaluru-victims-of-accidents-caused-by-potholes-bad-roads-to-get-up-to-rs-15000-compensation-by-bbmp/689966",
    "https://www.millenniumpost.in/delhi/women-safety-to-get-a-boost-delhi-govt-all-set-to-install-over-90000-smart-streetlights-across-city-522041",
    "https://www.google.com/imgres?q=sos&imgurl=https%3A%2F%2Fimg.freepik.com%2Fpremium-vector%2Fsos-emergency-call-icon-sos-message-sos-icon_349999-1736.jpg",
    "https://timesofindia.indiatimes.com/india/aravali-degradation-encroachments-mining-and-urban-sprawl-hit-ecology-study-flags-threat-to-groundwater-biodiversity/articleshow/126523999.cms",
    "https://www.ndtv.com/india-news/coronavirus-lockdown-yamuna-cleanest-in-30-years-as-industrial-dumping-halts-2234790",
    "https://www.freepik.com/vectors/scam",
    "https://indianexpress.com/article/education/centre-invites-private-hospitals-to-start-medical-courses-experts-divided-quality-cost-of-education-neet-ug-2023-8658582/",
    "https://indianexpress.com/article/education/ccpa-penalty-upsc-coaching-vajirao-and-reddy-institute-upsc-cse-results-10549324/",
    "https://www.ndtv.com/india-news/ahmedabad-sessions-court-gujarat-court-man-throws-slippers-at-ahmedabad-judge-a-week-after-supreme-court-incident-9458318",
    "https://www.livemint.com/news/big-relief-for-parents-delhi-govt-to-move-bill-to-regulate-private-school-fee-hikes-11754123534718.html",
    "https://www.unicef.org/india/what-we-do/clean-india-clean-schools",
    "https://www.hopscotchtherapy.in/"
]

headers = {'User-Agent': 'Mozilla/5.0'}

for i, url in enumerate(urls):
    try:
        req = urllib.request.Request(url, headers=headers)
        html = urllib.request.urlopen(req, timeout=5).read().decode('utf-8')
        match = re.search(r'<meta property="og:image" content="(.*?)"', html)
        if match:
            print(f"URL {i+1}: {match.group(1)}")
        else:
            match_src = re.search(r'<img[^>]+src="([^">]+)"', html)
            print(f"URL {i+1}: {match_src.group(1) if match_src else 'Not found'}")
    except Exception as e:
        print(f"URL {i+1}: Error - {str(e)}")
