# Fullstack Challenge

In every application there is a control of employees involved in the process. In addition, it is necessary to categorize these employees into categories.

In this project an API was developed that allows querying, creating and editing this information, maintaining this relationship between the employee and his category.

## Libraries and Tools

### Backend

* 🐍 [Python](https://www.python.org/)
* 🧪 [Flask](https://flask.palletsprojects.com/en/2.3.x/)
* 🧪 [Flask-Cors](https://flask-cors.readthedocs.io/en/latest/)
* ⚗️ [SQLAlchemy (Object Relational Mapper - ORM)](https://flask-sqlalchemy.palletsprojects.com/en/3.0.x/)
* 🚧 [Pytest (for testing)](https://docs.pytest.org/en/7.3.x/)

### Frontend

* ⚛️ [React](https://react.dev/)
* 🛣️ [React Router](https://reactrouter.com/en/main)
* 💅 [Material UI](https://mui.com/)
* 🛜 [Axios](https://axios-http.com/)
* ⚡️ [Vite](https://vitejs.dev/)
* ⚒️ [ESLint](https://eslint.org/)
* ✨ [Prettier](https://prettier.io/)

## Project Organization

### Backend

The API was designed using the Model-View-Controller (MVC) pattern:

#### View (Directory that contains the classes for the project activities)

* They have the entity name and the suffix 'View'
* [CategoryView](Backend/Src/View/CategoryView.py) and [EmployeeView](Backend/Src/View/EmployeeView.py)

#### Controller (Action methods)

* They have no prefixes or suffixes
* [Category](Backend/Src/Controller/Category.py) and [Employee](Backend/Src/Controller/Employee.py)

#### Model (The logical structure of a database)

* There is only one database file that is responsible for managing the database of both entities
* [DataBase](Backend/Src/Model/DataBase.py)

### Frontend

#### Routes

To list, the pattern used was the name of the category with the first capital letter and the suffix "List", [CategoryList](Frontend/src/routes/CategoryList.tsx) and [EmployeeList](Frontend/src/routes/EmployeeList.tsx).

To create and update, the pattern used was the name of the category with the first capital letter and the suffix "Form", [CategoryForm](Frontend/src/routes/CategoryForm.tsx) and [EmployeeForm](Frontend/src/routes/EmployeeForm.tsx).

The Home screen has a path to the functionalities of the Category and Employee entities, in the [Home](Frontend/src/routes/Home.tsx) component.

#### Types

* There is only one type file that that contains the types of both entities.
* [types](Frontend/src/types/types.ts)

## Project Setup

### Backend

First, create a virtual env to host the project dependencies.
Install the necessary dependencies with the following commands:

```bash
cd Backend
pip install -r requirements.txt
```

Then, initialize the API server:

```bash
python main.py
```

To run the tests:

```bash
pytest -v
```

### Frontend

Install the necessary dependencies with the following commands:

```bash
cd Frontend
npm install
```

Then, initialize the dev server:

```bash
npm run dev
```

## Navigate the project

* [MVC](https://github.com/mabisteinkirch/Project/tree/main/Backend/Src)
* [Frontend](https://github.com/mabisteinkirch/Project/tree/main/Frontend)
* [Tests](https://github.com/mabisteinkirch/Project/tree/main/Backend/tests)
* [Docs](https://github.com/mabisteinkirch/Project/tree/main/Backend/docs)
