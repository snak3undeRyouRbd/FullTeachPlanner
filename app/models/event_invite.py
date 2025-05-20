from app.extensions import db
from datetime import datetime

class EventInvite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    inviter_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    invitee_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=False)
    invite_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    invite_status = db.Column(db.String(20), default='pending')
    notification_status = db.Column(db.String(20), default='unread')

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
    
