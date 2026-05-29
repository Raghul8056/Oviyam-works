from PIL import Image, ImageFilter, ImageOps

# Open the existing temple image
img = Image.open('public/bg/temple-panorama-real.png')

# Convert to grayscale
img_gray = img.convert('L')

# Apply edge enhancement or find edges
img_edges = img_gray.filter(ImageFilter.FIND_EDGES)

# Invert to make it black lines on white background
img_sketch = ImageOps.invert(img_edges)

# Enhance contrast slightly
img_sketch = img_sketch.point(lambda p: p * 1.5)

# Save the sketch
img_sketch.save('public/story/tanjore-sketch.png')
print("Sketch created successfully!")
