from flask import Blueprint, request, render_template, flash, redirect, url_for
from datetime import datetime
from pytz import timezone
from Src.Controller.Category import CategoryController
from Src.Model.DataBase import CategoryDb
from flask_api import status

Category = Blueprint("category", __name__)

@Category.route("/list", defaults={"page": 1}, methods=["GET"])
@Category.route("/list/<int:page>", methods=["GET"])
def listCategory(page):
    _categoryFilter = request.values.get("categoryName")
    if _categoryFilter == "None" or _categoryFilter is None:
        _categoryFilter = ""   
    return CategoryController.List(page, _categoryFilter)

@Category.route("/create", methods=["POST"])
def createCategory():
    params = request.json
    _description = params['description']
    _status = 1 if params['status'] else 0 
    _createdDate = datetime.now(timezone("America/Sao_Paulo")).strftime("%d/%m/%Y %H:%M:%S")
    _updatedDate = _createdDate

    if _description is None or len(_description) < 1 :
        return {'status': 'error', 'message': 'Fill all oh the fields'} , status.HTTP_400_BAD_REQUEST
    else:
        if CategoryController.createCategory(
            _description, _status, _updatedDate, _createdDate
        ):
            return {'status': 'success'}
        else:
            return {'status': 'error', 'message': 'Category already exists'}, status.HTTP_409_CONFLICT
 

@Category.route("/update/<int:id>", methods=['POST'])
def updateCategory(id):
    params = request.json
    _description = params['description']
    _status = 1 if params['status'] else 0  
    _updatedDate = datetime.now(timezone("America/Sao_Paulo")).strftime("%d/%m/%Y %H:%M:%S")
    _category = CategoryDb.query.filter_by(id=id).first()
  
    if _description is None or len(_description) < 1 :
            return {'status': 'error', 'message': 'Fill all oh the fields'} , status.HTTP_400_BAD_REQUEST
    else:
        if CategoryController.updateCategory(id, _description, _status, _updatedDate):
            return redirect(url_for('router.category.listCategory'))
        else:
            return {'status': 'error', 'message': 'Category already exists'}, status.HTTP_409_CONFLICT
  


