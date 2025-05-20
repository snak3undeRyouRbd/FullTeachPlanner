from app.extensions import db

class SchoolClass(db.Model):
    __tablename__ = 'school_class'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    teacher_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    students = db.relationship(
        'User',
        backref='school_class',
        lazy=True,
        foreign_keys='User.class_id'
    )
