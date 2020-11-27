from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from marshmallow_sqlalchemy import ModelSchema
from marshmallow import fields
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://records:b0cb8878@db4free.net:3306/aplicabeca'
db = SQLAlchemy(app)

###Models####
class Record(db.Model):
    __tablename__ = "records"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20))
    email = db.Column(db.String(100))
    distance = db.Column(db.Integer)

    def create(self):
      db.session.add(self)
      db.session.commit()
      return self
    def __init__(self,name,email,distance):
        self.name = name
        self.email = email
        self.distance = distance
    def __repr__(self):
        return '' % self.id
db.create_all()
class RecordSchema(ModelSchema):
    class Meta(ModelSchema.Meta):
        model = Record
        sqla_session = db.session
    id = fields.Number(dump_only=True)
    name = fields.String(required=True)
    email = fields.String(required=True)
    distance = fields.Number(required=True)

@app.route('/historial', methods = ['GET'])
def index():
    get_records = Record.query.all()
    record_schema = RecordSchema(many=True)
    records = record_schema.dump(get_records)
    return make_response(jsonify({"historial": records}))

@app.route('/registro', methods = ['POST'])
def create_record():
    data = request.get_json()
    if data.get('distance')>4 :
          record_schema = RecordSchema()
          record = record_schema.load(data)
          result = record_schema.dump(record.create())
          response = make_response(jsonify({"message":"Felicidades","datos": result}),200)
    else:
          response = make_response(
                jsonify(
                    {"message": "Debes de caminar más"}
                ),
                200,
            )
    response.headers["Content-Type"] = "application/json"
    return response
if __name__ == "__main__":
    app.run(debug=True)
