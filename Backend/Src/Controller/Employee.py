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
            query = EmployeeDb.query\
                .join(CategoryDb, EmployeeDb.id_category == CategoryDb.id)\
                .add_columns(EmployeeDb.name, EmployeeDb.phone, EmployeeDb.email, CategoryDb.description, EmployeeDb.status, EmployeeDb.createdDate, EmployeeDb.updatedDate, EmployeeDb.id)\
                .filter(EmployeeDb.id_category == CategoryDb.id).all()

            var = []

            for employee in query:
                var.append({
                    "createdDate": employee[6],
                    "email": employee[3],
                    "id": employee[-1],
                    "label_category": employee[4],
                    "name": employee[1],
                    "phone": employee[2],
                    "status": employee[5],
                    "updatedDate": employee[7]
                })

        return {
            "employees": var
        }
