from flask import Blueprint, request
from datetime import datetime
from pytz import timezone
from Src.Controller.Category import CategoryController
from flask_api import status


Category = Blueprint("categories", __name__)

@Category.get("/")
def listCategory():
    _categoryFilter = request.values.get("categoryName")
    if _categoryFilter == "None" or _categoryFilter is None:
        _categoryFilter = ""
    return CategoryController.List(_categoryFilter)


@Category.post("/")
def createCategory():
    params = request.json
    _description = params['description']
    _status = 1 if params['status'] else 0
    _createdDate = datetime.now(
        timezone("America/Sao_Paulo")).strftime("%d/%m/%Y %H:%M:%S")
    _updatedDate = _createdDate

    if _description is None or len(_description) < 1:
        return {'status': 'error', 'message': 'Fill all of the fields'}, status.HTTP_400_BAD_REQUEST
    else:
        if CategoryController.createCategory(
            _description, _status, _updatedDate, _createdDate
        ):
            return {'status': 'success'}
        else:
            return {'status': 'error', 'message': 'Category already exists'}, status.HTTP_409_CONFLICT


@Category.put("/<int:id>")
def updateCategory(id):
    params = request.json
    _description = params['description']
    _status = 1 if params['status'] else 0
    _updatedDate = datetime.now(
        timezone("America/Sao_Paulo")).strftime("%d/%m/%Y %H:%M:%S")

    if _description is None or len(_description) < 1:
        return {'status': 'error', 'message': 'Fill all of the fields'}, status.HTTP_400_BAD_REQUEST
    else:
        if CategoryController.updateCategory(id, _description, _status, _updatedDate):
            return {'status': 'success'}
        else:
            return {'status': 'error', 'message': 'Category already exists'}, status.HTTP_409_CONFLICT
