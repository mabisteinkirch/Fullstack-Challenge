from flask import Blueprint

Home = Blueprint('home', __name__)

@Home.route('/')
def index():
    return 'Hello world'