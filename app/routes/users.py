from flask import request, jsonify
from app import db
from app.models.user import User
from app.routes import main

@main.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json()
    if User.query.filter_by(email=data.get('email')).first():
        return jsonify({'error': 'User with this email already exists'}), 400

    user = User(
        role=data.get('role'),
        name=data.get('name'),
        surname=data.get('surname'),
        email=data.get('email'),
        birthday=data.get('birthday'),
        additional_info=data.get('additional_info'),
        profile_photo=data.get('profile_photo'),
        badge=data.get('badge')
    )
    db.session.add(user)
    db.session.commit()
    return jsonify(user.to_dict()), 201
@main.route('/api/teacher/register-student', methods=['POST'])
def register_student_by_teacher():
    data = request.get_json()
    creator_id = data.get('creator_id')

    teacher = User.query.get(creator_id)
    if not teacher or teacher.role != 'teacher':
        return jsonify({'error': 'Only teachers can register students'}), 403

    if User.query.filter_by(email=data.get('email')).first():
        return jsonify({'error': 'User with this email already exists'}), 400

    student = User(
        role='student',
        name=data.get('name'),
        surname=data.get('surname'),
        email=data.get('email'),
        birthday=data.get('birthday'),
        additional_info=data.get('additional_info'),
        profile_photo=data.get('profile_photo'),
        badge=data.get('badge')
    )
    db.session.add(student)
    db.session.commit()
    return jsonify(student.to_dict()), 201
@main.route('/api/users/search', methods=['GET'])
def search_users():
    email = request.args.get('email')
    name = request.args.get('name')

    query = User.query

    if email:
        query = query.filter(User.email.ilike(f"%{email}%"))
    if name:
        query = query.filter(
            db.or_(
                User.name.ilike(f"%{name}%"),
                User.surname.ilike(f"%{name}%")
            )
        )

    users = query.all()
    return jsonify([user.to_dict() for user in users])
