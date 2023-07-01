from flask import Blueprint, request, render_template, flash, redirect, url_for
from datetime import datetime
from pytz import timezone
from Src.Controller.Employee import EmployeeController
from Src.Model.DataBase import EmployeeDb
from flask_api import status

Employee = Blueprint('employees', __name__)

@Employee.get("/")
def listEmployee():
    _employeeFilter = request.values.get("employeeName")
    if _employeeFilter == "None" or _employeeFilter is None:
        _employeeFilter = ""   
    return EmployeeController.List(_employeeFilter)

@Employee.post("/")
def createEmployee():
    params = request.json
    _name = params['name']
    _phone = params['phone']
    _email= params['email']
    _id_category = params['id_category']
    _status = 1 if params['status'] else 0
    _createdDate = datetime.now(timezone("America/Sao_Paulo")).strftime("%d/%m/%Y %H:%M:%S")
    _updatedDate = _createdDate
    
    if any((x is None or x == "") for x in [_name, _id_category, _status]):
        return {'status': 'error', 'message': 'Fill all oh the fields'} , status.HTTP_400_BAD_REQUEST
    else:
        if EmployeeController.createEmployee(
            _name, _phone, _email, _id_category,_status,_createdDate,_updatedDate
        ):
            return {'status': 'success'}
        else:
            return {'status': 'error', 'message': 'Employee already exists'}, status.HTTP_409_CONFLICT
    

@Employee.post("/<int:id>")
def updateEmployee(id):
    params = request.json
    _name = params['name']
    _phone = params['phone']
    _email = params['email']
    _id_category = params['id_category']
    _status = 1 if params['status'] else 0  
    _updatedDate = datetime.now(timezone("America/Sao_Paulo")).strftime("%d/%m/%Y %H:%M:%S")

    if _name is None or len(_name) < 1 :
        return {'status': 'error', 'message': 'Fill all oh the fields'} , status.HTTP_400_BAD_REQUEST
    else:
        if EmployeeController.updateEmployee(id, _name, _phone, _email, _id_category,_status,_updatedDate):
            return {'status': 'success'}
        else:
            return {'status': 'error', 'message': 'Category already exists'}, status.HTTP_409_CONFLICT
  
