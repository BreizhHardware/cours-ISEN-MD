import psycopg2
import pandas as pd
import matplotlib.pyplot as plt
from config import DB_CONFIG

conn = psycopg2.connect(**DB_CONFIG)

query = """
        SELECT puissance_crete, surface
        FROM Installation
        WHERE surface IS NOT NULL AND puissance_crete IS NOT NULL AND surface > 0 AND surface < 1000
        ORDER BY surface
        LIMIT 100; \
        """
df = pd.read_sql_query(query, conn)

conn.close()

plt.figure(figsize=(10, 6))
plt.scatter(df['surface'], df['puissance_crete'], alpha=0.5)
plt.title('Scatter Plot: Puissance Crête vs Surface')
plt.xlabel('Surface (m²)')
plt.ylabel('Puissance Crête (W)')
plt.grid(True)
plt.show()
