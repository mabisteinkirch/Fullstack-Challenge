from flask import Blueprint, request, flash
from Src.Controller.Employee import EmployeeController
from Src.Model.DataBase import EmployeeDb
from datetime import datetime
from pytz import timezone

Employee = Blueprint('employee', __name__)



@Employee.route("/", defaults={"page": 1}, methods=["GET"])

def listCategory(page):
    _categoryFilter = request.values.get("categoryName")
    if _categoryFilter == "None" or _categoryFilter is None:
        _categoryFilter = ""
    #return render_template("listCategory.html",listData=CategoryController.List(page, _categoryFilter), categoryName=_categoryFilter)
    return EmployeeController.List(page, _categoryFilter)

@Employee.route("/", methods=["POST"])
def createEmployee():
    _name = request.form.get('name')
    _phone = request.form.get('phone')
    _email=request.form.get('email')
    _id_category = request.form.get('email')
    _status = request.form.get('status')
    _createdDate = datetime.now(timezone("America/Sao_Paulo")).strftime("%d/%m/%Y %H:%M:%S")
    _updatedDate = _createdDate
    if request.method == "POST":
        if any((x is None or len(x) < 1) for x in [_name, _id_category, _status]):
            flash("Preencha todos os campos do formulário", "error")
        else:
            if EmployeeController.createEmployee(
               _name, _phone, _email, _id_category,_status,_createdDate,_updatedDate
            ):
                return True
            else:
                flash("Categoria já cadastrada", "error")
    return True

@Employee.route("/<int:id>", methods=['POST'])
def updateEmployee(id):
  _name = request.form.get('name')
  _phone = request.form.get('phone')
  _email=request.form.get('email')
  _id_category = request.form.get('email')
  _status = request.form.get('status')
  _updatedDate = datetime.now(timezone("America/Sao_Paulo")).strftime("%d/%m/%Y %H:%M:%S")

  _employee = EmployeeDb.query.filter_by(id=id).first()
  print(_employee.createdDate)
  if request.method == 'POST': 
    if any((x is None or len(x)<1) for x in [_name, _id_category, _status]):
        flash('Preencha todos os campos do formulário', 'error')
    else:
        if EmployeeController.updateEmployee(id, _name, _phone, _email, _id_category,_status,_updatedDate):
          return True
        else:
          flash('já cadastrado', 'error')
  return True 


