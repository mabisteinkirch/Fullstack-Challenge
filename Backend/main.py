from setting import app, db
from Src.Router import Router

app.register_blueprint(Router)

if __name__ == '__main__':
  with app.app_context(): 
    db.create_all()
  app.run(debug=True)
