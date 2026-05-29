from PIL import Image, ImageOps

# Open the user's sketch
img = Image.open('public/story/tanjore-sketch.png').convert("RGBA")

# Convert image to grayscale to act as an alpha mask
gray = img.convert('L')

# Invert grayscale: black lines become white (opaque mask), white background becomes black (transparent mask)
alpha = ImageOps.invert(gray)

# We want the lines to be a specific color (e.g., dark gray/black). 
# We'll create a solid black image and apply the alpha mask to it.
solid_color = Image.new("RGBA", img.size, (26, 26, 26, 255)) # Dark charcoal/black
solid_color.putalpha(alpha)

# Save the perfectly transparent sketch
solid_color.save('public/story/tanjore-sketch.png')
print("Background removed perfectly!")
