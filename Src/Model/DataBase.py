from setting import db

class CategoryDb(db.Model):
  __tablename__='categorydb'
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  description = db.Column(db.String(150), nullable=False)
  status = db.Column(db.Integer, nullable=False)
  updatedDate = db.Column(db.DateTime, nullable=False)
  createdDate = db.Column(db.DateTime, nullable=False)
  employees = db.relationship('EmployeeDb', backref='categorydb')

  def __init__(self,_description,_status,_updatedDate,_createdDate):
    self.description = _description
    self.status = _status
    self.updatedDate = _updatedDate
    self.createdDate = _createdDate

class EmployeeDb(db.Model):
  __tablename__='employeedb'
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  name = db.Column(db.String(50), nullable=False)
  phone = db.Column(db.String(11))
  email = db.Column(db.String(150))  
  id_category = db.Column(db.Integer, db.ForeignKey('categorydb.id'), nullable=False)
  status = db.Column(db.Integer, nullable=False)
  updatedDate = db.Column(db.DateTime, nullable=False)
  createdDate = db.Column(db.DateTime, nullable=False)

  def __init__(self, _name, _phone, _email, _id_category, _status,_updatedDate, _createdDate):
    self.name=_name
    self.phone=_phone
    self.email=_email
    self.id_category=_id_category
    self.status = _status
    self.updatedDate = _updatedDate
    self.createdDate = _createdDate