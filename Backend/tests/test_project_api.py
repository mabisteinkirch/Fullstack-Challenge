import requests

ENDPOINT = "http://127.0.0.1:5000/"

def test_can_call_the_endpoint_home():
    response = requests.get(ENDPOINT)
    assert response.status_code == 200

def test_can_call_the_endpoint_categories():
    response = requests.get(f"{ENDPOINT}/categories/")
    assert response.status_code == 200

def test_can_call_the_endpoint_employee():
    response = requests.get(f"{ENDPOINT}/employees/")
    assert response.status_code == 200

def test_can_create_category():
    payload = {       
        "description": "Aluno",
        "status": True,        
    }
    response = requests.post(f"{ENDPOINT}/categories/",json=payload)    
    assert response.status_code == 200
    

def test_can_create_category_conflict():
    payload = {       
        "description": "Aluno",
        "status": True,        
    }
    response = requests.post(f"{ENDPOINT}/categories/",json=payload)    
    assert response.status_code == 409

def test_can_create_category_badRquest():
    payload = {       
        "description": "",
        "status": True,        
    }
    response = requests.post(f"{ENDPOINT}/categories/",json=payload)    
    assert response.status_code == 400

def test_can_update_category():
    payload = {              
        "description": "Professora",
        "status": True,        
    }
    response = requests.post(f"{ENDPOINT}/categories/19",json=payload)    
    assert response.status_code == 200
    

def test_can_update_category_conflict():
    payload = {              
        "description": "Professora",
        "status": True,        
    }
    response = requests.post(f"{ENDPOINT}/categories/1",json=payload)    
    assert response.status_code == 409

def test_can_update_category_badRquest():
    payload = {       
        "description": "",
        "status": True,        
    }
    response = requests.post(f"{ENDPOINT}/categories/19",json=payload)    
    assert response.status_code == 400


# region Employee

def test_can_create_employee():
    payload = {       
        "name": "Estrela",
        "phone": "12977660514",
        "email": "estrela@gmail.com",
        "id_category": 19,        
        "status": True       
    }
    response = requests.post(f"{ENDPOINT}/employees/",json=payload)    
    assert response.status_code == 200
    

def test_can_create_employee_conflict():
    payload = {       
        "name": "Estrela",
        "phone": "12977660514",
        "email": "estrela@gmail.com",
        "id_category": 19,        
        "status": True        
    }
    response = requests.post(f"{ENDPOINT}/employees/",json=payload)    
    assert response.status_code == 409

def test_can_create_employee_badRquest():
    payload = {       
        "name": "",
        "phone": "12977660514",
        "email": "estrela@gmail.com",
        "id_category": 19,        
        "status": True        
    }
    response = requests.post(f"{ENDPOINT}/employees/",json=payload)    
    assert response.status_code == 400

def test_can_update_employee():
    payload = {              
        "name": "Estrela",
        "phone": "12977660514",
        "email": "estrela@gmail.com",
        "id_category": 19,        
        "status": False        
    }
    response = requests.post(f"{ENDPOINT}/employees/5",json=payload)    
    assert response.status_code == 200
    

def test_can_update_employee_conflict():
    payload = {              
        "name": "Estrela",
        "phone": "12977660514",
        "email": "estrela@gmail.com",
        "id_category": 19,        
        "status": True         
    }
    response = requests.post(f"{ENDPOINT}/employees/1",json=payload)    
    assert response.status_code == 409

def test_can_update_employee_badRquest():
    payload = {       
        "name": "",
        "phone": "12977660514",
        "email": "estrela@gmail.com",
        "id_category": 19,        
        "status": True        
    }
    response = requests.post(f"{ENDPOINT}/employees/19",json=payload)    
    assert response.status_code == 400

# endregion