from flask import Blueprint
from Src.View.HomeView import Home
from Src.View.EmployeeView import Employee

Router = Blueprint('router',__name__)

Router.register_blueprint(Home)
Router.register_blueprint(Employee)