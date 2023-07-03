from setting import db


class CategoryDb(db.Model):
  __tablename__='categorydb'
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  description = db.Column(db.String(150), unique=True, nullable=False)
  status = db.Column(db.Integer, nullable=False)
  updatedDate = db.Column(db.String(20), nullable=False)
  createdDate = db.Column(db.String(20), nullable=False)
  employees = db.relationship('EmployeeDb', backref='categorydb')

  def __init__(self,_description,_status,_updatedDate,_createdDate):
    self.description = _description
    self.status = _status
    self.updatedDate = _updatedDate
    self.createdDate = _createdDate

  def as_dict(self):
    print(self.__table__.columns)
    return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class EmployeeDb(db.Model):
  __tablename__='employeedb'
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  name = db.Column(db.String(50), nullable=False)
  phone = db.Column(db.String(11), unique=True)
  email = db.Column(db.String(150), unique=True)  
  id_category = db.Column(db.Integer, db.ForeignKey('categorydb.id'), nullable=False)
  status = db.Column(db.Integer, nullable=False)
  updatedDate = db.Column(db.String(20), nullable=False)
  createdDate = db.Column(db.String(20), nullable=False)

  def __init__(self, _name, _phone, _email, _id_category, _status,_updatedDate, _createdDate):
    self.name=_name
    self.phone=_phone
    self.email=_email
    self.id_category=_id_category
    self.status = _status
    self.updatedDate = _updatedDate
    self.createdDate = _createdDate

  def as_dict(self):
    print(self.__table__.columns)
    return {c.name: getattr(self, c.name) for c in self.__table__.columns}