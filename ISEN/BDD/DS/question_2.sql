SELECT post_id, COUNT(*) AS nb_commentaires FROM comments
                                            GROUP BY post_id ORDER BY nb_commentaires DESC LIMIT 5;