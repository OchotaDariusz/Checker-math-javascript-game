from flask import Flask, request, render_template, url_for, session, redirect
import data_manager
import util

app = Flask(__name__)
app.secret_key = 'cd574346c04c28f66e13ba56001ff83c9987e3d96d0f4465'


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/registration')
def register_page():
    if util.user_logged_in():
        return redirect(url_for('index'))
    return render_template('registration.html')


@app.route('/registration', methods=['POST'])
def register():
    username = request.form.get('username')
    email = request.form.get('email')
    password_1 = request.form.get('password')
    password_2 = request.form.get('repeat_password')
    if not data_manager.check_if_user_exists(username):
        if password_1 == password_2:
            new_user = {'username': username,
                        'email': email,
                        'password': data_manager.hash_password(password_1)}
            data_manager.add_user(new_user)
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(
        debug=True
    )
