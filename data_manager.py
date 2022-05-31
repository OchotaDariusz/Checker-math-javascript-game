import database_common


@database_common.connection_handler
def get_user_details(cursor, username):
    query = """
        SELECT *
        FROM users
        WHERE username = %(username)s"""
    cursor.execute(query, {'username': username})
    return cursor.fetchone()


@database_common.connection_handler
def add_user(cursor, user):
    query = """
        INSERT INTO users(username, password, level, points, registration_time)
        VALUES (%(username)s, %(password)s, 0, 0, current_timestamp)"""
    cursor.execute(query, {'username': user['username'], 'password': user['password']})
