from config import app
from Src.Router import Router

app.register_blueprint(Router)

if __name__ == '__main__':
  app.run(debug=True,host='0.0.0.0', port=81)
