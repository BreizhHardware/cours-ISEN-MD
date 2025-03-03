SELECT u1.username AS follower, u2.username AS followee FROM users u1, users u2, follows
                                                        WHERE u1.user_id
                                                        IN (SELECT follower_id FROM follows)
                                                        AND u2.user_id IN (SELECT followee_id FROM follows)
                                                        AND u1.user_id = follows.follower_id
                                                        AND u2.user_id = follows.followee_id
                                                        ORDER BY followee ASC;