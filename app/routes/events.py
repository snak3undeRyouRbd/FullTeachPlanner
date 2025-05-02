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
    user_id = request.args.get('user_id', type=int)       # чей календарь
    viewer_id = request.args.get('viewer_id', type=int)   # кто просматривает

    query = Event.query
    if user_id:
        query = query.filter_by(creator_id=user_id)

    events = query.all()
    result = []

    for event in events:
        data = event.to_dict()

        # если просматривает не создатель — скрываем контент и локацию
        if viewer_id and viewer_id != event.creator_id:
            data.pop('content', None)
            data.pop('location', None)

        result.append(data)

    return jsonify(result)
from datetime import datetime

@main.route('/api/events/filter', methods=['GET'])
def filter_events():
    user_id = request.args.get('user_id', type=int)
    viewer_id = request.args.get('viewer_id', type=int)
    status = request.args.get('status')  # accepted, declined, pending
    past = request.args.get('past')  # true / false

    if not user_id:
        return jsonify({'error': 'Missing user_id'}), 400

    now = datetime.utcnow()
    query = Event.query.filter_by(creator_id=user_id)

    if past == 'true':
        query = query.filter(Event.start_date < now)
    elif past == 'false':
        query = query.filter(Event.start_date >= now)

    events = query.all()
    result = []

    for event in events:
        data = event.to_dict()

        # скрыть контент до начала события
        if event.start_date > now:
            data['content'] = None

        # скрываем поля для чужого календаря
        if viewer_id and viewer_id != event.creator_id:
            data.pop('location', None)

        # фильтрация по статусу приглашения (если viewer_id указан)
        if status and viewer_id:
            invite = EventInvite.query.filter_by(
                event_id=event.id,
                invitee_id=viewer_id
            ).first()
            if not invite or invite.invite_status != status:
                continue  # фильтр не совпал

        result.append(data)

    return jsonify(result)
@main.route('/api/events/respond', methods=['POST'])
def respond_to_invite():
    data = request.get_json()
    invite_id = data.get('invite_id')
    response = data.get('status')  # accepted, declined, canceled

    invite = EventInvite.query.get(invite_id)
    if not invite:
        return jsonify({'error': 'Invite not found'}), 404

    invite.invite_status = response
    db.session.commit()
    return jsonify({'message': 'Response recorded'})
from app.models.event_comment import EventComment

@main.route('/api/events/<int:event_id>/comments', methods=['GET'])
def get_event_comments(event_id):
    comments = EventComment.query.filter_by(event_id=event_id).order_by(EventComment.created_at.asc()).all()
    return jsonify([c.to_dict() for c in comments])


@main.route('/api/events/<int:event_id>/comments', methods=['POST'])
def add_event_comment(event_id):
    data = request.get_json()
    user_id = data.get('user_id')
    text = data.get('text')

    if not user_id or not text:
        return jsonify({'error': 'Missing user_id or text'}), 400

    comment = EventComment(
        event_id=event_id,
        user_id=user_id,
        text=text
    )
    db.session.add(comment)
    db.session.commit()
    return jsonify(comment.to_dict()), 201
import os
from flask import request, jsonify, send_from_directory, current_app
from werkzeug.utils import secure_filename
from app.models.event_attachment import EventAttachment

UPLOAD_FOLDER = 'app/static/uploads'

@main.route('/api/events/<int:event_id>/attachments', methods=['POST'])
def upload_attachment(event_id):
    file = request.files.get('file')
    if not file:
        return jsonify({'error': 'No file provided'}), 400

    filename = secure_filename(file.filename)
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    file.save(file_path)

    attachment = EventAttachment(event_id=event_id, filename=filename, url=f'/static/uploads/{filename}')
    db.session.add(attachment)
    db.session.commit()
    return jsonify(attachment.to_dict()), 201


@main.route('/api/events/<int:event_id>/attachments', methods=['GET'])
def get_attachments(event_id):
    attachments = EventAttachment.query.filter_by(event_id=event_id).all()
    return jsonify([a.to_dict() for a in attachments])


