import urllib.request
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

# Search wikimedia commons for a sketch or drawing of a temple
url = "https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrsearch=Brihadeeswarar%20temple%20sketch%20drawing&gsrlimit=5&prop=imageinfo&iiprop=url"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    response = urllib.request.urlopen(req, context=ctx)
    data = json.loads(response.read())
    pages = data['query']['pages']
    for page_id in pages:
        img_url = pages[page_id]['imageinfo'][0]['url']
        if img_url.endswith('.jpg') or img_url.endswith('.png'):
            print(f"Downloading {img_url}")
            urllib.request.urlretrieve(img_url, "public/story/tanjore-sketch.jpg")
            break
except Exception as e:
    print("Error:", e)
