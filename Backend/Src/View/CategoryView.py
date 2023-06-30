from flask import Blueprint, request, render_template, flash, redirect, url_for
from datetime import datetime
from pytz import timezone
from Src.Controller.Category import CategoryController
from Src.Model.DataBase import CategoryDb

Category = Blueprint("category", __name__)

@Category.route("/list", defaults={"page": 1}, methods=["GET"])
@Category.route("/list/<int:page>", methods=["GET"])
def listCategory(page):
    _categoryFilter = request.values.get("categoryName")
    if _categoryFilter == "None" or _categoryFilter is None:
        _categoryFilter = ""   
    return CategoryController.List(page, _categoryFilter)

@Category.route("/create", methods=["GET", "POST"])
def createCategory():
    _description = request.form.get('description')
    _status = request.form.get('status')
    _createdDate = datetime.now(timezone("America/Sao_Paulo")).strftime("%d/%m/%Y %H:%M:%S")
    _updatedDate = _createdDate
    if request.method == "POST":
        if any((x is None or len(x) < 1) for x in [_description, _status]):
            flash("Preencha todos os campos do formulário", "error")
        else:
            if CategoryController.createCategory(
                _description, _status, _updatedDate, _createdDate
            ):
                return True
            else:
                flash("Categoria já cadastrada", "error")
    return True

@Category.route("/update/<int:id>", methods=['GET', 'POST'])
def updateCategory(id):
  _description = request.form.get('description')
  _status = request.form.get('status') 
  _updatedDate = datetime.now(timezone("America/Sao_Paulo")).strftime("%d/%m/%Y %H:%M:%S")

  _category = CategoryDb.query.filter_by(id=id).first()
  print(_category.createdDate)
  if request.method == 'POST': 
    if any((x is None or len(x)<1) for x in [_description, _status]):
        flash('Preencha todos os campos do formulário', 'error')
    else:
        if CategoryController.updateCategory(id, _description, _status, _updatedDate):
          return redirect(url_for('router.category.listCategory'))
        else:
          flash('Cartão RFID ou Usuário já cadastrado', 'error')
  return render_template('updateCategory.html', category=_category) 


