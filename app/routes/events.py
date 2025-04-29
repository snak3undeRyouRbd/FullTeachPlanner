from flask import request, jsonify
from app import db
from app.models.event import Event
from app.models.user import User
from app.routes import main

@main.route('/api/events', methods=['POST'])
def create_event():
    data = request.get_json()
    creator_id = data.get('creator_id')
    if not User.query.get(creator_id):
        return jsonify({'error': 'Creator user not found'}), 404

    event = Event(
        type=data.get('type'),
        title=data.get('title'),
        start_date=data.get('start_date'),
        duration=data.get('duration'),
        content=data.get('content'),
        is_hidden=data.get('is_hidden', True),
        location=data.get('location'),
        creator_id=creator_id
    )
    db.session.add(event)
    db.session.commit()
    return jsonify(event.to_dict()), 201

@main.route('/api/events', methods=['GET'])
def get_events():
    events = Event.query.all()
    return jsonify([event.to_dict() for event in events])
