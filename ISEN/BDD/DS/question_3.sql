SELECT u.username, u.bio, u.email FROM users u, post p, post_likes pl
                                  WHERE u.user_id = pl.user_id AND p.post_id = pl.post_id
                                    AND CAST(p.created_at AS TEXT) LIKE '2024-01-11%';