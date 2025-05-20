from app.extensions import db
from datetime import datetime
import bcrypt

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    # Авторизационные поля
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

    # Основные данные
    role = db.Column(db.String(20), nullable=False)  # 'учень', 'вчитель', 'батьки'
    name = db.Column(db.String(100), nullable=False)
    surname = db.Column(db.String(100), nullable=False)
    class_id = db.Column(db.Integer, db.ForeignKey('school_class.id'))  # если ученик

    # Дополнительные поля
    birthday = db.Column(db.Date)
    profile_photo = db.Column(db.String(255))
    additional_info = db.Column(db.Text)
    badge = db.Column(db.String(255))
    data_register = db.Column(db.DateTime, default=datetime.utcnow)
    data_visited = db.Column(db.DateTime)

    # Связи
    events = db.relationship('Event', backref='creator', lazy=True)
    comments = db.relationship('EventComment', backref='author', lazy=True)

    def set_password(self, raw_password):
        self.password = bcrypt.hashpw(raw_password.encode(), bcrypt.gensalt()).decode()

    def check_password(self, raw_password):
        return bcrypt.checkpw(raw_password.encode(), self.password.encode())

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "role": self.role,
            "name": self.name,
            "surname": self.surname,
            "birthday": self.birthday.isoformat() if self.birthday else None,
            "profile_photo": self.profile_photo,
            "additional_info": self.additional_info,
            "badge": self.badge,
            "class_id": self.class_id,
            "data_register": self.data_register.isoformat() if self.data_register else None,
            "data_visited": self.data_visited.isoformat() if self.data_visited else None
        }
