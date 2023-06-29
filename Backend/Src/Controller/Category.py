from Src.Model.DataBase import CategoryDb
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.serializer import dumps
from setting  import db
import json


class CategoryController:
  def createCategory(_description,_status,_createdDate, _updatedDate):   
    category =CategoryDb(_description.upper(),_status,_createdDate, _updatedDate)
    db.session.add(category) 
    try:
      db.session.commit()
      return True
    except IntegrityError:
      db.session.rollback()
      return False

  def updateCategory(id, _description, _status, _updatedDate):   
    try:
      CategoryDb.query.filter_by(id=id).update({'description':_description.upper(),'status':_status.upper(), 'updatedDate':_updatedDate})
      db.session.commit()
      return True
    except IntegrityError:
      db.session.rollback()
      return False  

    
  def List(page,_categoryFilter, per_page=5):
    print(_categoryFilter)
    if len(_categoryFilter)<1 :  
      #query =CategoryDb.query.paginate(page=page, per_page=per_page)
      query =CategoryDb.query.all()
      queryCount = CategoryDb.query.count()
    #else:
     # query = CategoryDb.query.filter(CategoryDb.description.like('%'+_categoryFilter+'%')).paginate(page=page, per_page=per_page)        
      #queryCount = CategoryDb.query.count()
   
    return {
      "categories": [ row.as_dict() for row in query],
      "count": queryCount
      #"page": page,
      #"per_page": per_page
    }