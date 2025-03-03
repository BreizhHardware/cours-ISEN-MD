-- Select all medecin where m_postal contains 44***--
SELECT * FROM medecin WHERE CAST(m_postal AS TEXT) LIKE '44%' AND m_specialty = 'Rhumatologue';
