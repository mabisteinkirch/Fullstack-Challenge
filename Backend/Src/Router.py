from flask import Blueprint
from Src.View.HomeView import Home
from Src.View.EmployeeView import Employee
from Src.View.CategoryView import Category

Router = Blueprint('router',__name__)

Router.register_blueprint(Home)
Router.register_blueprint(Employee, url_prefix='/employees')
Router.register_blueprint(Category, url_prefix='/categories')