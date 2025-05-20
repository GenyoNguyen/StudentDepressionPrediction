from PIL import Image
import os

def fill_transparent_with_white(input_path, output_path):
    # Open the image
    img = Image.open(input_path)
    
    # Convert to RGBA if not already
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    
    # Create a white background
    background = Image.new('RGBA', img.size, (255, 255, 255, 255))
    
    # Composite the image onto the white background
    output = Image.alpha_composite(background, img)
    
    # Convert back to RGB (removing alpha channel)
    output = output.convert('RGB')
    
    # Save the result
    output.save(output_path, 'PNG')

def process_directory(input_dir, output_dir):
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    # Process all PNG files in the input directory
    for filename in os.listdir(input_dir):
        if filename.lower().endswith('.png'):
            input_path = os.path.join(input_dir, filename)
            output_path = os.path.join(output_dir, filename)
            fill_transparent_with_white(input_path, output_path)
            print(f"Processed: {filename}")

if __name__ == "__main__":
    # Define input and output directories
    input_directory = "models"
    output_directory = "models_white_bg"
    
    # Process all PNG files
    process_directory(input_directory, output_directory)
    print("All images have been processed!")
