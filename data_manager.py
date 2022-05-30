import database_common


@database_common.connection_handler
def get_user(cursor, username):
    query = """
        SELECT username
        FROM users
        WHERE username = %(username)s"""
    cursor.execute(query, {'username': username})
    return cursor.fetchone()


@database_common.connection_handler
def add_user(cursor, user):
    query = """
        INSERT INTO users(username, email, password, level, points, registration_time)
        VALUES (%(username)s, %(email)s,  %(password)s, 0, 0, current_timestamp)"""
    cursor.execute(query, {'username': user['username'], 'email': user['email'], 'password': user['password']})
