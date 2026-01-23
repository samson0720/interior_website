import fitz  # PyMuPDF
import os

# Get the directory where the script is located
script_dir = os.path.dirname(os.path.abspath(__file__))

pdf_path = os.path.join(script_dir, "2026帛瑀企業簡報.pdf")
output_dir = os.path.join(script_dir, "images")

# Create output directory
os.makedirs(output_dir, exist_ok=True)

# Open PDF
doc = fitz.open(pdf_path)
print(f"Total pages: {len(doc)}")

# Extract text and images from each page
for page_num in range(len(doc)):
    page = doc[page_num]
    
    # Extract text
    text = page.get_text()
    print(f"\n=== Page {page_num + 1} ===")
    print(text[:1000] if text else "(No text)")
    
    # Extract images
    images = page.get_images(full=True)
    for img_idx, img in enumerate(images):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        
        image_filename = f"page{page_num + 1}_img{img_idx + 1}.{image_ext}"
        image_path = os.path.join(output_dir, image_filename)
        
        with open(image_path, "wb") as img_file:
            img_file.write(image_bytes)
        
        print(f"Saved: {image_filename}")

doc.close()
print("\nDone!")
