from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

app.secret_key = '1234'
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.sqlite3"

db = SQLAlchemy(app)
