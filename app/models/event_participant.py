from app.extensions import db

class EventParticipant(db.Model):
    __tablename__ = 'event_participant'
    
    event_id = db.Column(db.Integer, db.ForeignKey('event.id', ondelete='CASCADE'), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'), primary_key=True)

