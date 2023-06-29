import axios from 'axios';
import { useEffect, useState } from 'react';

interface Category {
  id: number
  description: string
  status: number
  createdDate: string
  updatedDate: string
}

export default function CategoryList() {

  const [categories, setCategories] = useState<Category[]>()

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/category/list')
      .then(function (response) {
        // handle success
        setCategories(response.data.categories)
      })
  }, [])
  return (
    <div>
      <br />
      <a href="{{url_for('router.category.createCategory')}}" className="btn btn-secondary btn-xs">New Category</a>
      <hr />
      <div className="row">
        <label className="form-label" htmlFor="form3Example4">Category</label>

        <form action="{{url_for('router.category.listCategory')}}" method="GET">
          <input type="text" className="form-control" name="categoryName" value="{{_categoryName}}" />

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
                        <th scope="col">DESCRIPTION</th>
                        <th scope="col">STATUS</th>
                        <th scope="col">CREATED DATE</th>
                        <th scope="col">UPDATED DATE</th>
                        <th scope="col">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!categories ? "loading..." : categories.map((category) => {
                        return (<tr key={category.id}>
                          <td>{category.id}</td>
                          <td>{category.description}</td>
                          <td>{category.status}</td>
                          <td>{category.createdDate}</td>
                          <td>{category.updatedDate}</td>
                          <td>
                            <a href="update/{{category.id}}" className="btn btn-secondary btn-xs">Edit</a>
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
          {% if listData['category'].has_prev %}
          <a href="{{listData['category'].prev_num }}?categoryName={{_categoryName}}"> «Previous |</a>
          {% else %}
          <p> «Previous |</p>
          {% endif %}
      
          {% if listData['category'].has_next %}
            {% if listData['page'] == 1 %}
              <a href="list/{{listData['category'].next_num}}?categoryName={{_categoryName}}">| Next»</a>
            {% else %}
              <a href="{{listData['category'].next_num}}?categoryName={{_categoryName}}">| Next»</a>
             {% endif %}
          {% else %}
            <p>| Next»</p>
          {% endif %}
      </div> */}
    </div>
  );
}