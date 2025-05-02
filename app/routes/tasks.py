from flask import request, jsonify
from app import db
from app.models.task import Task
from app.models.user import User
from app.routes import main

@main.route('/api/tasks', methods=['POST'])
def create_task():
    data = request.get_json()

    assigned_to = data.get('assigned_to')
    if assigned_to and not User.query.get(assigned_to):
        return jsonify({'error': 'Assigned user not found'}), 404

    task = Task(
        title=data.get('title'),
        content=data.get('content'),
        status=data.get('status', 'pending'),
        due_date=data.get('due_date'),
        event_id=data.get('event_id'),
        assigned_to=assigned_to
    )
    db.session.add(task)
    db.session.commit()
    return jsonify(task.to_dict()), 201
from datetime import date

@main.route('/api/tasks/today', methods=['GET'])
def get_today_tasks():
    user_id = request.args.get('user_id', type=int)
    if not user_id or not User.query.get(user_id):
        return jsonify({'error': 'Invalid user_id'}), 400

    today_str = date.today().isoformat()

    tasks = Task.query.filter(
        Task.assigned_to == user_id,
        Task.due_date.startswith(today_str)
    ).all()

    return jsonify([task.to_dict() for task in tasks])

