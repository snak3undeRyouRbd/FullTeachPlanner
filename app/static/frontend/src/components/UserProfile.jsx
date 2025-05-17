import React from 'react';
import { Link } from 'react-router-dom';

const UserProfile = ({ user }) => (
  <Link className="nav-link dropdown-toggle pt-1 px-0" to="/profile">
    <div className="media d-flex align-items-center">
      <img
        className="avatar rounded-circle"
        alt="Profile"
        src={user.profile_photo || '/img/default-profile.jpg'}
      />
      <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
        <span className="mb-0 font-small fw-bold text-gray-900">
          {user.name}
        </span>
      </div>
    </div>
  </Link>
);

export default UserProfile;