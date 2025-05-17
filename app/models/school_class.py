from app import db

class SchoolClass(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    teacher_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    # Автоматическая связь: .students даст список всех учеников
    students = db.relationship('User', backref='school_class', lazy=True)
