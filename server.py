from flask import Flask, request, render_template, url_for, session, redirect, jsonify

import auth
import data_manager

app = Flask(__name__)
app.secret_key = 'cd574346c04c28f66e13ba56001ff83c9987e3d96d0f4465'


@app.route('/')
def index():
    return render_template('index.html', user_logged_in=auth.user_logged_in())


@app.route('/registration', methods=['POST'])
def register():
    user_data = request.get_json()
    user_details = data_manager.get_user_details(user_data['username'])
    if user_details is None:
        if user_data['password'] == user_data['password2']:
            new_user = {'username': user_data['username'],
                        'password': auth.hash_password(user_data['password'])}
            data_manager.add_user(new_user)
            session['username'] = user_data['username']
            return jsonify({'url': request.root_url}), 200

        return jsonify({'url': request.root_url}), 403

    return jsonify({'url': request.root_url}), 409


@app.route('/login', methods=['POST'])
def login():
    user_data = request.get_json()
    user_details = data_manager.get_user_details(user_data['username'])
    if user_details:
        if auth.verify_password(user_data['password'], user_details['password']):
            session['username'] = user_data['username']
            return jsonify({'url': request.root_url}), 200

    return jsonify({'url': request.root_url}), 401


@app.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(
        debug=True
    )
