from flask import request, jsonify
from app import db
from app.models.task import Task
from app.models.user import User
from app.routes import main
from app.models.school_class import SchoolClass


from app.models.user import User
from app.models.task import Task
from app.models.school_class import SchoolClass
from app import db

@main.route('/api/tasks', methods=['POST'])
def create_task():
    data = request.get_json()

    class_id = data.get('class_id')
    assigned_to = data.get('assigned_to')  # если только одному
    created_by = data.get('created_by')

    if not created_by or not User.query.get(created_by):
        return jsonify({'error': 'Invalid teacher id'}), 400

    title = data.get('title')
    content = data.get('content')
    status = data.get('status', 'pending')
    due_date = data.get('due_date')
    event_id = data.get('event_id')

    tasks = []

    if class_id:
        students = User.query.filter_by(class_id=class_id, role='student').all()
        for student in students:
            task = Task(
                title=title,
                content=content,
                status=status,
                due_date=due_date,
                event_id=event_id,
                assigned_to=student.id,
                created_by=created_by
            )
            db.session.add(task)
            tasks.append(task)
        db.session.commit()
        return jsonify([t.to_dict() for t in tasks]), 201

    elif assigned_to:
        task = Task(
            title=title,
            content=content,
            status=status,
            due_date=due_date,
            event_id=event_id,
            assigned_to=assigned_to,
            created_by=created_by
        )
        db.session.add(task)
        db.session.commit()
        return jsonify(task.to_dict()), 201

    else:
        return jsonify({'error': 'Need class_id or assigned_to'}), 400

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

