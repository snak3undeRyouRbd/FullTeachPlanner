import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import AddInviteModal from '../components/AddInviteModal';
import { useAuth } from '../context/AuthContext';

const Invites = () => {
  const { currentUser } = useAuth();
  const [showInviteModal, setShowInviteModal] = useState(false);

  const handleAddInvite = () => setShowInviteModal(true);

  return (
    <div>
        <Navbar 
        userRole={currentUser?.role || 'учень'}
        onAddInvite={handleAddInvite}
        />
      <h1>Мої запрошення</h1>
      <div className="list-group list-group-flush">
      <h3 href="/events#invites" className="text-center py-3">
          Запрошення на подію
    </h3>
        
        <a href="/events#invites" className="list-group-item list-group-item-action border-bottom">
          <div className="row align-items-center">
            <div className="col-auto">
              {/* Avatar */}
              <img alt="Profile" src="/img/avatar.webp" className="avatar-md rounded" />
            </div>
            <div className="col ps-0 ms-2">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="h6 mb-0 text-small">Петро Еськів</h4>
                </div>
                <div className="text-end">
                  <small className="text-danger">a few moments ago</small>
                </div>
              </div>
              <p className="font-small mt-1 mb-0">Added you to an event "Project stand-up" tomorrow at 12:30 AM.</p>
            </div>
          </div>
        </a>

        <a href="/events#invites" className="list-group-item list-group-item-action border-bottom">
          <div className="row align-items-center">
            <div className="col-auto">
              {/* Avatar */}
              <img alt="Profile" src="/img/avatar.webp" className="avatar-md rounded" />
            </div>
            <div className="col ps-0 ms-2">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="h6 mb-0 text-small">Алла Сокрута</h4>
                </div>
                <div className="text-end">
                  <small>2 hrs ago</small>
                </div>
              </div>
              <p className="font-small mt-1 mb-0">New message: "We need to improve the UI/UX for the landing page."</p>
            </div>
          </div>
        </a>
        
        <a href="/events#invites" className="dropdown-item text-center fw-bold rounded-bottom py-3">
          <svg className="icon icon-xxs text-gray-400 me-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path>
          </svg>
          Дивитись усі
        </a>
      </div>

      <AddInviteModal
        show={showInviteModal}
        onHide={() => setShowInviteModal(false)}
      />
    </div>
  );
};

export default Invites;