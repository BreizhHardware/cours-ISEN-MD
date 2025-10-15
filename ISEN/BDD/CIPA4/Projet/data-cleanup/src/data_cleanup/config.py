region_mapping = {
    'provence-alpes-côte d\'azur': 'Provence-Alpes-Côte d\'Azur',
    'paca': 'Provence-Alpes-Côte d\'Azur',
    'provence-alpes-cote d\'azur': 'Provence-Alpes-Côte d\'Azur',
    "provence-alpes-côte d\\'azur": 'Provence-Alpes-Côte d\'Azur',
    'languedoc-roussillon': 'Occitanie',
    'midi-pyrénées': 'Occitanie',
    'languedoc-roussillon midi-pyrénées': 'Occitanie',
    'aquitaine': 'Nouvelle-Aquitaine',
    'poitou-charentes': 'Nouvelle-Aquitaine',
    'limousin': 'Nouvelle-Aquitaine',
    'aquitaine-limousin-poitou-charentes': 'Nouvelle-Aquitaine',
    'alsace': 'Grand Est',
    'champagne-ardenne': 'Grand Est',
    'lorraine': 'Grand Est',
    'alsace-champagne-ardenne-lorraine': 'Grand Est',
    'bourgogne': 'Bourgogne-Franche-Comté',
    'franche-comté': 'Bourgogne-Franche-Comté',
    'bourgogne franche-comté': 'Bourgogne-Franche-Comté',
    'picardie': 'Hauts-de-France',
    'nord-pas-de-calais': 'Hauts-de-France',
    'nord-pas-de-calais picardie': 'Hauts-de-France',
    'basse-normandie': 'Normandie',
    'haute-normandie': 'Normandie',
    'normandy': 'Normandie',
    'auvergne': 'Auvergne-Rhône-Alpes',
    'rhône-alpes': 'Auvergne-Rhône-Alpes',
    'centre': 'Centre-Val de Loire',
    'corse': 'Corse',
    'bretagne': 'Bretagne',
    'britany': 'Bretagne',
    'pays de la loire': 'Pays de la Loire',
    'ile-de-france': 'Île-de-France',
    'Ã®le-de-france': 'Île-de-France',
    'Ãžle-De-France': 'Île-de-France',
    'Ãžle-de-france': 'Île-de-France',
}

# Database configuration
import os
from dotenv import load_dotenv

load_dotenv()

DB_CONFIG = {
    'host': os.getenv('DB_HOST', 'localhost'),
    'database': os.getenv('DB_DATABASE', 'cipa4'),
    'user': os.getenv('DB_USER', 'postgres'),
    'password': os.getenv('DB_PASSWORD', 'password')
}
