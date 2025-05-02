from app import db
from datetime import datetime

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(30), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    duration = db.Column(db.Integer)
    content = db.Column(db.Text)
    is_hidden = db.Column(db.Boolean, default=True)
    location = db.Column(db.String(255))
    creator_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    participants = db.relationship('EventParticipant', backref='event', lazy=True)
    invites = db.relationship('EventInvite', backref='event', lazy=True)
    tasks = db.relationship('Task', backref='event', lazy=True)

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
attachments = db.Column(db.Text)  # список ссылок через JSON или разделитель
