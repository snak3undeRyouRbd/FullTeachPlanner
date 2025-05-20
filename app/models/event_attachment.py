from app.extensions import db

class EventAttachment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'))
    filename = db.Column(db.String(255), nullable=False)
    filepath = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "event_id": self.event_id,
            "filename": self.filename,
            "filepath": self.filepath
        }