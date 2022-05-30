import os
import database_common
import bcrypt


@database_common.connection_handler
def check_if_user_exists(cursor, username):
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


def hash_password(plain_text_password):
    hashed_bytes = bcrypt.hashpw(plain_text_password.encode('utf-8'), bcrypt.gensalt())
    return hashed_bytes.decode('utf-8')


def verify_password(plain_text_password, hashed_password):
    hashed_bytes_password = hashed_password.encode('utf-8')
    return bcrypt.checkpw(plain_text_password.encode('utf-8'), hashed_bytes_password)