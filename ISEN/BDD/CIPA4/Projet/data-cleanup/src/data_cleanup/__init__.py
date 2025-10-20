from clean_data import clean_data
from generate_inserts import generate_inserts
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

if __name__ == "__main__":
    logging.info("Starting data cleaning process...")
    input_file = "../data.csv"
    output_file = "../cleaned_data.csv"
    clean_data(input_file, output_file)
    logging.info(f"Data cleaned and saved to {output_file}")
    logging.info("Starting SQL insert generation process...")
    cleaned_csv = "../cleaned_data.csv"
    output_sql = '../sql/seeder/insert_data.sql'
    generate_inserts(cleaned_csv, output_sql)
    print(f"Insert script generated: {output_sql}")
