import chardet

def detect_encoding(file_path):
    """
    Detect the encoding of a file.
    """
    with open(file_path, 'rb') as f:
        raw_data = f.read()
        result = chardet.detect(raw_data)
        print(f"Detected encoding: {result['encoding']} with confidence {result['confidence']}")

if __name__ == "__main__":
    file_path = "../communes-france-2024-limite.csv"
    detect_encoding(file_path)
