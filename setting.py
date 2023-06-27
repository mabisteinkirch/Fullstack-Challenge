from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os

template_dir = os.path.abspath('./Templates')

app = Flask(__name__,
           template_folder=template_dir)

app.secret_key='1234'
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.sqlite3"

db = SQLAlchemy(app)

