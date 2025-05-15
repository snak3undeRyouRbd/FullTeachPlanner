from flask import request, jsonify, session
from app import db
from app.models.user import User
from app.routes import main

@main.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()

    if User.query.filter_by(email=data.get('email')).first():
        return jsonify({'error': 'Email already registered'}), 400

    user = User(
        email=data['email'],
        name=data.get('name'),
        surname=data.get('surname'),
        role=data.get('role', 'учень'),
        birthday=data.get('birthday'),
        additional_info=data.get('additional_info'),
        profile_photo=data.get('profile_photo'),
        badge=data.get('badge'),
        class_id=data.get('class_id')
    )
    user.set_password(data['password'])

    db.session.add(user)
    db.session.commit()
    return jsonify(user.to_dict()), 201


@main.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data.get('email')).first()

    if not user or not user.check_password(data.get('password')):
        return jsonify({'error': 'Invalid email or password'}), 401

    session['user_id'] = user.id
    return jsonify({'message': 'Login successful', 'user': user.to_dict()})


@main.route('/api/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'Logged out'})


@main.route('/api/current_user', methods=['GET'])
def current_user():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Not logged in'}), 401

    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    return jsonify(user.to_dict())
