import os.path


def comments_object_from_txt(txt_path: str) -> dict:
    if not os.path.exists(txt_path):
        return {'comments': []}
    # Read lines from txt
    with open(txt_path, 'r') as f:
        lines = f.readlines()
    # Create comment object
    comments = []
    for comment_line in lines:
        comment = comment_object_from_line(comment_line)
        if comment:
            comments.append(comment)

    return {'comments': comments}


# line is a tab-separated string with the following format:
# username \t comment \t timestamp
def comment_object_from_line(line: str) -> dict:
    # Verify input
    attributes = line.split('\t')
    if len(attributes) != 3:
        return {}
    # Parse line
    username, comment, timestamp = attributes
    return {
        'username': username,
        'comment': comment,
        'timestamp': int(timestamp)
    }
