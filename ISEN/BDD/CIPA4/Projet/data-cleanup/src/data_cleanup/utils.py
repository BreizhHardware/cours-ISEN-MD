import logging
import unicodedata
import pandas as pd
import numpy as np
import html
import re
import torch
from transformers import pipeline

device = torch.device("cuda" if torch.cuda.is_available() else "mps" if torch.backends.mps.is_available() else "cpu")

def normalize_text(text):
    """
    Normalize text by removing accents.
    """
    return ''.join(c for c in unicodedata.normalize('NFD', text) if unicodedata.category(c) != 'Mn')

def fix_encoding(text):
    """
    Fix common encoding issues in text.
    """
    if pd.isna(text):
        return text
    replacements = {
        'Ã©': 'é',
        'Ã¨': 'è',
        'ÃŽ': 'Î',
        'Ã¢': 'â',
        'Ã§': 'ç',
        'Ã»': 'û',
        'Ã´': 'ô',
        'Ã¯': 'ï',
        'Ã¼': 'ü',
        'Ã«': 'ë',
        'Ã¹': 'ù',
        'Ãê': 'ê',
        'Ã®': 'î',
        'Ã¶': 'ö',
        'Ã¤': 'ä',
        'Ã¿': 'ÿ',
        'Ã': 'É',
        'Ã': 'È',
        'Ã': 'Ê',
        'Ã': 'Ë',
        'Ã': 'Ì',
        'Ã': 'Í',
        'Ã': 'Î',
        'Ã': 'Ï',
        'Ã': 'Ð',
        'Ã': 'Ñ',
        'Ã': 'Ò',
        'Ã': 'Ó',
        'Ã': 'Ô',
        'Ã': 'Õ',
        'Ã': 'Ö',
        'Ã': '×',
        'Ã': 'Ø',
        'Ã': 'Ù',
        'Ã': 'Ú',
        'Ã': 'Û',
        'Ã': 'Ü',
        'Ã': 'Ý',
        'Ã': 'Þ',
        'Ã': 'ß',
        'Ã ': 'à',
        'Ã¡': 'á',
        'Ã¢': 'â',
        'Ã£': 'ã',
        'Ã¤': 'ä',
        'Ã¥': 'å',
        'Ã¦': 'æ',
        'Ã§': 'ç',
        'Ã¨': 'è',
        'Ã©': 'é',
        'Ãª': 'ê',
        'Ã«': 'ë',
        'Ã¬': 'ì',
        'Ã­': 'í',
        'Ã®': 'î',
        'Ã¯': 'ï',
        'Ã°': 'ð',
        'Ã±': 'ñ',
        'Ã²': 'ò',
        'Ã³': 'ó',
        'Ã´': 'ô',
        'Ãµ': 'õ',
        'Ã¶': 'ö',
        'Ã·': '÷',
        'Ã¸': 'ø',
        'Ã¹': 'ù',
        'Ãº': 'ú',
        'Ã»': 'û',
        'Ã¼': 'ü',
        'Ã½': 'ý',
        'Ã¾': 'þ',
        'Ã¿': 'ÿ',
        'Ã‰': 'É',
        'Ãˆ': 'È',
        'ÃŠ': 'Ê',
        'Ã‹': 'Ë',
        'ÃŒ': 'Ì',
        'Ã': 'Í'
    }
    for wrong, correct in replacements.items():
        text = text.replace(wrong, correct)
    return text

def clean_company_name(text):
    """
    Cleans and normalizes company names.
    """
    if pd.isna(text):
        return text
    text = str(text)
    # Decode HTML entities
    text = html.unescape(text)
    # Remove extra spaces
    text = re.sub(r'\s+', ' ', text).strip()
    # Fix encoding issues
    text = fix_encoding(text)
    # Normalize accents
    text = normalize_text(text)
    return text

def ai_is_legitimate_company_name(text):
    """
    Uses AI to check if the company name seems legitimate for solar panel installation.
    Uses zero-shot classification to classify as a solar installer or not.
    """
    try:
        classifier = pipeline("zero-shot-classification", model="typeform/distilbert-base-uncased-mnli")
        result = classifier(text, candidate_labels=["a company that installs solar panels", "not a company that installs solar panels"], hypothesis_template="This is {}.", device=device)
        if result['labels'][0] == "a company that installs solar panels" and result['scores'][0] > 0.7:
            logging.info(text)
            logging.info(f"AI classification result: {result['labels'][0]} with score {result['scores'][0]}")
        return result['labels'][0] == "a company that installs solar panels" and result['scores'][0] > 0.7
    except Exception as e:
        logging.error(f"AI classification failed: {e}")
        return False  # Fallback to False if AI fails

def is_valid_company_name(text):
    """
    Heuristic and AI-based validation of company names. Returns True if the name seems valid, False otherwise.
    """
    if pd.isna(text):
        return False
    text = clean_company_name(text)
    if len(text) < 3:
        return False
    # Exclude invalid patterns
    invalid_patterns = [
        'http', 'www.', 'ww.', '&', 'non renseign', 'moi', 'je', 'particulier', 'auto installation',
        "ne merite plus d'etre cite", "000", "a bannir", "a eviter", "a fuir", "a proscrire",
        "a oublier", "a deconseiller", "a ne pas contacter", "a ne pas retenir", "a ne pas choisir",
        "a ne pas faire travailler", "a ne pas faire appel", "ne pas contacter", "ne pas retenir",
        "ne pas choisir", "ne pas faire travailler", "ne pas faire appel", "a completer", "a voir", "aucun"
    ]
    if any(pattern in text.lower() for pattern in invalid_patterns):
        return False
    # Check for company indicators
    if any(char.isdigit() for char in text):
        return True  # Likely has registration number
    if ' ' in text:
        return True  # Likely full name
    keywords = ['sar', 'sas', 'sa', 'gmb', 'ltd', 'inc', 'co', 'entreprise', 'societe', 'electricite', 'energie', 'solaire', 'solar', 'energy', 'ener', 'volt', 'sol', 'sun']
    if any(kw in text.lower() for kw in keywords):
        return True
    # Use AI as fallback
    if ai_is_legitimate_company_name(text):
        return True
    return False

def standardize_orientation(x):
    """
    Standardizes orientation values to integers: 0 for South, 90 for West, 180 for North, -90 for East.
    """
    if pd.isna(x):
        return np.nan
    x = str(x).strip().lower()
    if x in ['sud', 'south']:
        return 0
    try:
        return int(float(x))
    except:
        return np.nan
