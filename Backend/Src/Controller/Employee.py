from Src.Model.DataBase import EmployeeDb, CategoryDb
from sqlalchemy.exc import IntegrityError
from setting import db


class EmployeeController:
    def createEmployee(_name, _phone, _email, _id_category, _status, _createdDate, _updatedDate):
        employee = EmployeeDb(
            _name.upper(), _phone, _email.upper(), _id_category, _status, _createdDate, _updatedDate
        )
        db.session.add(employee)
        try:
            db.session.commit()
            return True
        except IntegrityError:
            db.session.rollback()
            return False

    def updateEmployee(id, _name, _phone, _email, _id_category, _status, _updatedDate):
        try:
            EmployeeDb.query.filter_by(id=id).update(
                {
                    'name': _name.upper(),
                    'phone': _phone,
                    'email': _email.upper(),
                    'id_category': _id_category,
                    'status': _status,
                    'updatedDate': _updatedDate
                }
            )
            db.session.commit()
            return True
        except IntegrityError:
            db.session.rollback()
            return False

    def List(_employeeFilter) -> str:
        if len(_employeeFilter) < 1:
            query = EmployeeDb.query.all()
            queryCount = EmployeeDb.query.count()

        return {
            "employees": [row.as_dict() for row in query],
            "count": queryCount
        }
