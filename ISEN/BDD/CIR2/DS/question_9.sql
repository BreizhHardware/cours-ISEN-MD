DELETE FROM users WHERE user_id IN (SELECT user_id FROM comments WHERE comment_id IS NULL);
SELECT * FROM users WHERE user_id IN (SELECT user_id FROM comments WHERE comment_id IS NULL);