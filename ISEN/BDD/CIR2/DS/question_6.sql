SELECT AVG(nmb_comment) FROM (SELECT COUNT(comment_id) AS nmb_comment FROM comments GROUP BY user_id) AS nmb_comment;

SELECT u.username, COUNT(nb_comment) AS nb_comments FROM users u, comments c
WHERE u.user_id = c.user_id AND nb_comment >
                                (SELECT AVG(nb_comment) FROM (SELECT COUNT(comment_id)
                                    AS nb_comment FROM c GROUP BY user_id) AS nb_comment)
GROUP BY u.username;