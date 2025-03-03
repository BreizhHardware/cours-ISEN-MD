SELECT users.username, COUNT(DISTINCT videos.video_id)
    AS nb_videos, COUNT(DISTINCT comments.comment_id)
    AS nb_comments, COUNT(DISTINCT post.post_id)
    AS nb_posts, COUNT(DISTINCT photos.photo_id)
    AS nb_photos FROM users , videos, comments, post, photos
                 WHERE users.user_id = post.user_id
                   AND comments.user_id = users.user_id
                   AND videos.video_id = post.video_id
                   AND photos.photo_id = post.photo_id
                 GROUP BY users.username;