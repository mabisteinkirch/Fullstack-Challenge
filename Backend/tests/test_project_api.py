import requests
import random

ENDPOINT = "http://127.0.0.1:5000/"

# region Category
def test_can_call_the_endpoint_categories():
    response = requests.get(f"{ENDPOINT}/categories/")
    first_category = response.json()['categories'][1]
    expected_result = {
        "id": 2,
        "description": 'PROFESSORA',
        "status": 1,
        "updatedDate": '04/07/2023 07:48:13',
        "createdDate": '27/06/2023 13:39:33'
    }
    assert response.status_code == 200
    assert first_category == expected_result


def test_can_call_the_endpoint_employee():
    response = requests.get(f"{ENDPOINT}/employees/")
    first_employee = response.json()['employees'][0]
    expected_result = {
        "id": 1,
        "name": 'Lucas',
        "phone": "12997775422",
        "email": "lucas@gmail.com",
        "label_category": "RADIOLOGISTA E",
        "status": 1,
        "updatedDate": '28/06/2023 08:31:46',
        "createdDate": '28/06/2023 08:31:46'
    }
    assert response.status_code == 200
    assert first_employee == expected_result


def test_can_create_category():
    payload = {
        "description": f"Profissao {random.randint(1,10000)}",
        "status": True,
    }
    response = requests.post(f"{ENDPOINT}/categories/", json=payload)
    assert response.status_code == 200
    assert response.json() == {'status': 'success'}


def test_can_create_category_conflict():
    payload = {
        "description": "Aluno",
        "status": True,
    }
    response = requests.post(f"{ENDPOINT}/categories/", json=payload)
    assert response.status_code == 409
    assert response.json() == {'status': 'error',
                               'message': 'Category already exists'}


def test_can_create_category_badRquest():
    payload = {
        "description": "",
        "status": True,
    }
    response = requests.post(f"{ENDPOINT}/categories/", json=payload)
    assert response.status_code == 400
    assert response.json() == {'status': 'error',
                               'message': 'Fill all of the fields'}


def test_can_update_category():
    payload = {
        "description": "CARDIOLOGISTA",
        "status": False,
    }
    response = requests.put(f"{ENDPOINT}/categories/3", json=payload)
    assert response.status_code == 200
    assert response.json() == {'status': 'success'}


def test_can_update_category_conflict():
    payload = {
        "description": "PROFESSORA",
        "status": True,
    }
    response = requests.put(f"{ENDPOINT}/categories/1", json=payload)
    assert response.status_code == 409
    assert response.json() == {'status': 'error',
                               'message': 'Category already exists'}


def test_can_update_category_badRquest():
    payload = {
        "description": "",
        "status": True,
    }
    response = requests.put(f"{ENDPOINT}/categories/19", json=payload)
    assert response.status_code == 400
    assert response.json() == {'status': 'error',
                               'message': 'Fill all of the fields'}

# endregion

# region Employee

def test_can_create_employee():
    rand = random.randint(1, 10000)
    payload = {
        "name": f"Nome {rand}",
        "phone": f"{rand}",
        "email": f"nome{rand}@gmail.com",
        "id_category": 1,
        "status": True
    }
    response = requests.post(f"{ENDPOINT}/employees/", json=payload)
    assert response.status_code == 200
    assert response.json() == {'status': 'success'}


def test_can_create_employee_conflict():
    payload = {
        "name": "Estrela",
        "phone": "12977660514",
        "email": "estrela@gmail.com",
        "id_category": 19,
        "status": True
    }
    response = requests.post(f"{ENDPOINT}/employees/", json=payload)
    assert response.status_code == 409
    assert response.json() == {'status': 'error',
                               'message': 'Employee already exists'}


def test_can_create_employee_badRquest():
    payload = {
        "name": "",
        "phone": "12977660514",
        "email": "estrela@gmail.com",
        "id_category": 19,
        "status": True
    }
    response = requests.post(f"{ENDPOINT}/employees/", json=payload)
    assert response.status_code == 400
    assert response.json() == {'status': 'error',
                               'message': 'Fill all of the fields'}


def test_can_update_employee():
    payload = {
        "name": "Estrela",
        "phone": "12977660514",
        "email": "estrela@gmail.com",
        "id_category": 19,
        "status": False
    }
    response = requests.put(f"{ENDPOINT}/employees/6",json=payload)
    assert response.status_code == 200
    assert response.json() == {'status': 'success'}


def test_can_update_employee_conflict():
    payload = {
        "name": "Estrela",
        "phone": "12977660514",
        "email": "estrela@gmail.com",
        "id_category": 19,
        "status": True
    }
    response = requests.put(f"{ENDPOINT}/employees/1",json=payload)
    assert response.status_code == 409
    assert response.json() == {'status': 'error',
                               'message': 'Category already exists'}


def test_can_update_employee_badRquest():
    payload = {
        "name": "",
        "phone": "12977660514",
        "email": "estrela@gmail.com",
        "id_category": 19,
        "status": True
    }
    response = requests.put(f"{ENDPOINT}/employees/19",json=payload)
    assert response.status_code == 400
    assert response.json() == {'status': 'error',
                               'message': 'Fill all of the fields'}

# endregion
