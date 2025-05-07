from app import db
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(20), nullable=False)  # teacher, student, parents
    name = db.Column(db.String(100), nullable=False)
    surname = db.Column(db.String(100), nullable=False)
    data_register = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    data_visited = db.Column(db.DateTime)
    email = db.Column(db.String(120), unique=True, nullable=False)
    birthday = db.Column(db.Date)
    additional_info = db.Column(db.Text)
    profile_photo = db.Column(db.String(255))
    badge = db.Column(db.String(255))
    class_id = db.Column(db.Integer, db.ForeignKey('school_class.id'))


    # связи
    events = db.relationship('Event', backref='creator', lazy=True)
    comments = db.relationship('EventComment', backref='author', lazy=True, foreign_keys='EventComment.user_id')

    def to_dict(self):
        return {
            "id": self.id,
            "role": self.role,
            "name": self.name,
            "surname": self.surname,
            "data_register": self.data_register.isoformat() if self.data_register else None,
            "data_visited": self.data_visited.isoformat() if self.data_visited else None,
            "email": self.email,
            "birthday": self.birthday.isoformat() if self.birthday else None,
            "additional_info": self.additional_info,
            "profile_photo": self.profile_photo,
            "badge": self.badge
        }

