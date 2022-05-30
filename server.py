from flask import Flask, request, render_template, url_for, session, redirect

import auth
import data_manager

app = Flask(__name__)
app.secret_key = 'cd574346c04c28f66e13ba56001ff83c9987e3d96d0f4465'


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/registration', methods=['POST'])
def register():
    username = request.form.get('username')
    email = request.form.get('email')
    password_1 = request.form.get('password')
    password_2 = request.form.get('repeat_password')
    if not data_manager.get_user(username):
        if password_1 == password_2:
            new_user = {'username': username,
                        'email': email,
                        'password': auth.hash_password(password_1)}
            data_manager.add_user(new_user)
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(
        debug=True
    )
