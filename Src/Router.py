from flask import Blueprint
from Src.View.Home import Home

Router = Blueprint('router',__name__)

Router.register_blueprint(Home)