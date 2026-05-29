from rembg import remove
from PIL import Image
import os

files = [
    "public/services/3d-vishnu.png",
    "public/services/3d-shiva.png",
    "public/services/3d-devi.png",
    "public/services/3d-mantapa.png",
    "public/services/3d-doors.png",
    "public/services/3d-decor.png"
]

for f in files:
    try:
        if os.path.exists(f):
            print(f"Processing {f}...")
            input_image = Image.open(f)
            output_image = remove(input_image)
            output_image.save(f)
            print(f"Successfully processed {f}")
        else:
            print(f"File not found: {f}")
    except Exception as e:
        print(f"Failed {f}: {e}")
