import axios from 'axios';
import { useEffect, useState } from 'react';

interface Employee {
  id: number
  name: string
  phone: number
  email: string
  id_category: number
  status: number
  createdDate: string
  updatedDate: string
}

export default function EmployeeList() {

  const [employees, setEmployees] = useState<Employee[]>()

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/employees')
      .then(function (response) {
        // handle success
        setEmployees(response.data.employees)
      })
  }, [])
  return (
    <div>
      <br />
      <a href="{{url_for('router.employee.createEmployee')}}" className="btn btn-secondary btn-xs">New Employee</a>
      <hr />
      <div className="row">
        <label className="form-label" htmlFor="form3Example4">Employee</label>

        <form action="{{url_for('router.employee.listEmployee')}}" method="GET">
          <input type="text" className="form-control" name="employeeName" value="{{_employeeName}}" />

          <fieldset className="form-group col-md-4">
            <button type="submit" className="btn btn-secondary">Filter</button>
          </fieldset>
        </form>
      </div>
      <br />

      <section className="intro">
        <div className="mask d-flex align-items-center h-100">
          <div className="container ">
            <div className="row justify-content-center">
              <div className="col-xl">
                <div className="bg-white ">
                  <table className="table table-sm mb-0 text-xsmall">
                    <thead className="table-dark">
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">NAME</th>
                        <th scope="col">PHONE</th>
                        <th scope="col">EMAIL</th>
                        <th scope="col">CATEGORY</th>
                        <th scope="col">STATUS</th>
                        <th scope="col">CREATED DATE</th>
                        <th scope="col">UPDATED DATE</th>
                        <th scope="col">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!employees ? "loading..." : employees.map((employee) => {
                        return (<tr key={employee.id}>
                          <td>{employee.id}</td>
                          <td>{employee.name}</td>
                          <td>{employee.phone}</td>
                          <td>{employee.email}</td>
                          <td>{employee.id_category}</td>
                          <td>{employee.status}</td>
                          <td>{employee.createdDate}</td>
                          <td>{employee.updatedDate}</td>
                          <td>
                            <a href="update/{{employee.id}}" className="btn btn-secondary btn-xs">Edit</a>
                          </td>
                        </tr>)
                      })}

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* <div style="display: flex;">
          {% if listData['employee'].has_prev %}
          <a href="{{listData['employee'].prev_num }}?employeeName={{_employeeName}}"> «Previous |</a>
          {% else %}
          <p> «Previous |</p>
          {% endif %}
      
          {% if listData['employee'].has_next %}
            {% if listData['page'] == 1 %}
              <a href="list/{{listData['employee'].next_num}}?employeeName={{_employeeName}}">| Next»</a>
            {% else %}
              <a href="{{listData['employee'].next_num}}?employeeName={{_employeeName}}">| Next»</a>
             {% endif %}
          {% else %}
            <p>| Next»</p>
          {% endif %}
      </div> */}
    </div>
  );
}