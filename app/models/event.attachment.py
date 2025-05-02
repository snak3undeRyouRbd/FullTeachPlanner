from app import db
from datetime import datetime

class EventAttachment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id', ondelete='CASCADE'), nullable=False)
    filename = db.Column(db.String(255), nullable=False)
    url = db.Column(db.String(500), nullable=True)  # либо путь к файлу, либо ссылка
    uploaded_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "event_id": self.event_id,
            "filename": self.filename,
            "url": self.url,
            "uploaded_at": self.uploaded_at.isoformat()
        }
