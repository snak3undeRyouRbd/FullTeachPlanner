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
