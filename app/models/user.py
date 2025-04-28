### app/models/user.py
from app import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(20), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    surname = db.Column(db.String(100), nullable=False)
    data_register = db.Column(db.DateTime, nullable=False)
    data_visited = db.Column(db.DateTime)
    email = db.Column(db.String(120), unique=True, nullable=False)
    birthday = db.Column(db.Date)
    additional_info = db.Column(db.Text)
    profile_photo = db.Column(db.String(255))
    badge = db.Column(db.String(255))
