from rembg import remove
from PIL import Image
import os

file_path = "public/bg/temple-watermark.png"

try:
    if os.path.exists(file_path):
        print(f"Processing {file_path}...")
        
        # Open image and remove background
        input_image = Image.open(file_path).convert("RGBA")
        output_image = remove(input_image)
        
        # Colorize the remaining lines to brown (139, 111, 78)
        data = output_image.getdata()
        new_data = []
        for item in data:
            # item is (R, G, B, A)
            if item[3] > 0: # If it's not fully transparent
                # Keep original alpha for smooth edges, but change color to brown
                new_data.append((139, 111, 78, item[3]))
            else:
                new_data.append(item)
                
        output_image.putdata(new_data)
        output_image.save(file_path)
        print(f"Successfully processed and colorized {file_path}")
    else:
        print(f"File not found: {file_path}")
except Exception as e:
    print(f"Failed {file_path}: {e}")
