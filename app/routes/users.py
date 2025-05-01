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
