from rembg import remove
from PIL import Image
import os

input_path = "public/story/temple.png"
output_path = "public/story/temple-cutout.png"

try:
    if os.path.exists(input_path):
        print(f"Processing {input_path}...")
        input_image = Image.open(input_path)
        output_image = remove(input_image)
        output_image.save(output_path)
        print(f"Successfully processed and saved to {output_path}")
    else:
        print(f"File not found: {input_path}")
except Exception as e:
    print(f"Failed {input_path}: {e}")
