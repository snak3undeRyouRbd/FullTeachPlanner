from app.extensions import db
from datetime import datetime

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text)
    status = db.Column(db.String(20), default='pending')
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    due_date = db.Column(db.DateTime)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id', ondelete='SET NULL'))
    assigned_to = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='SET NULL'))
    created_by = db.Column(db.Integer, db.ForeignKey('user.id'))

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
