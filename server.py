from flask import Flask, request, render_template, url_for, session

app = Flask(__name__)
app.secret_key = 'cd574346c04c28f66e13ba56001ff83c9987e3d96d0f4465'


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(
        debug=True
    )
