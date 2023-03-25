from flask import Flask, request
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from uuid import uuid4

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:SQLdbpass@localhost/daycare-check-in"
# app.config["SECRETE_KEY"] = "secrete_key"
db = SQLAlchemy(app)
CORS(app)

# with app.app_context():
#     db.create_all()

class Backend(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    child_name = db.Column(db.String(50), nullable=False)
    pickup_time = db.Column(db.String(10))
    note = db.Column(db.String(500))

    def __repr__(self):
        return f'Rep: {self.child_name}'
    
    def __init__(self, child_name, pickup_time, note):
        self.child_name = child_name
        self.pickup_time = pickup_time
        self.note = note

# Format to json obj to pass it to the front end without making network request
def to_json(backend):
    return {
        "id": backend.id,
        "child_name": backend.child_name,
        "pickup_time": backend.pickup_time,
        "note": backend.note
    }

@app.route('/checkin', methods=['POST'])
def checkIn():
    child_name = request.json['child_name']
    pickup_time = request.json['pickup_time']
    note = request.json['note']

    backend = Backend(child_name, pickup_time, note)
    db.session.add(backend)
    db.session.commit()
    return to_json(backend)

@app.route('/daycare_list', methods = ['GET'])
def get_daycare():
    table = Backend.query.all()
    daycare = []
    for attendees in table:
        daycare.append(to_json(attendees))

    return {'Daycare List': daycare}

@app.route('/checkout/<id>', methods=['DELETE'])
def checkOut(id):
    backend = Backend.query.filter_by(id=id).one()
    db.session.delete(backend)
    db.session.commit()
    return 'Checked Out'

@app.route('/edit/<id>', methods=['PUT'])
def edit(id):
    backend = Backend.query.filter_by(id=id)
    pickup_time = request.json['pickup_time']
    note = request.json['note']
    backend.update(dict(pickup_time=pickup_time, note=note))
    db.session.commit()
    return {'Edited successfully': to_json(backend.one())}


if __name__ == '__main__':
    app.run(debug=True)