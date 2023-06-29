from flask import Blueprint

Employee = Blueprint('employee', __name__)


@Employee.route('/createEmployee')
def createEmployee():
  return "Create Employee"


@Employee.route('/updateEmployee')
def updateEmployee():
  return "Update Employee"
