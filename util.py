import data_manager
from flask import session


def user_logged_in():
    return 'username' in session