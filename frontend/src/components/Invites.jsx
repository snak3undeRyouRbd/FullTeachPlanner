import React, { useEffect, useState } from 'react';

const Invites = () => {
  const [invites, setInvites] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => setInvites(data.invites || []))
      .catch(err => console.error('Помилка при завантаженні invites:', err));
  }, []);

  const getStatusDotClass = (status) => {
    switch (status) {
      case 'Online': return 'bg-success';
      case 'In a meeting': return 'bg-warning';
      case 'Offline': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  const getStatusText = (invite_status) => {
    switch (invite_status) {
      case 'очікує': return 'Online';
      case 'відхилено': return 'Offline';
      case 'прийнято': return 'In a meeting';
      default: return 'Unknown';
    }
  };

  const getUserAvatar = (id) => `/img/team/profile-picture-${(id % 4) + 1}.jpg`;

  return (
    <div className="col-12 col-xxl-6 mb-4" id="invites">
      <div className="card border-0 shadow">
        <div className="card-header border-bottom d-flex align-items-center justify-content-between">
          <h2 className="fs-5 fw-bold mb-0">Запрошення</h2>
          <a href="#" className="btn btn-sm btn-primary">Дивитись усі</a>
        </div>
        <div className="card-body">
          <ul className="list-group list-group-flush list my--3">
            {invites.map((invite, index) => {
              const status = getStatusText(invite.invite_status);
              const dotClass = getStatusDotClass(status);
              return (
                <li className="list-group-item px-0" key={invite.id}>
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <a href="#" className="avatar">
                        <img className="rounded" alt="Аватар" src={getUserAvatar(index)} />
                      </a>
                    </div>
                    <div className="col-auto ms--2">
                      <h4 className="h6 mb-0">
                        <a href="#">Користувач #{invite.inviter_id}</a>
                      </h4>
                      <div className="d-flex align-items-center">
                        <div className={`${dotClass} dot rounded-circle me-1`}></div>
                        <small>{status}</small>
                      </div>
                    </div>
                    <div className="col text-end">
                      <a href="#" className="btn btn-sm btn-secondary d-inline-flex align-items-center">
                        <svg className="icon icon-xxs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                        </svg>
                        {invite.invite_status === 'очікує' ? 'Invite' : 'Message'}
                      </a>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Invites;
