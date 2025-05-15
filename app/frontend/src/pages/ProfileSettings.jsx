import React, { useState } from 'react';

const ProfileSettings = () => {

  const [noInvites, setNoInvites] = useState(false);
  const handleNoInvitesChange = (e) => {
    setNoInvites(e.target.checked);
  };

  return (
    <div>
      <h2 className="mt-5">Налаштування Профілю</h2>
        <form className="mt-4">
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="noInvitesCheck"
              checked={noInvites}
              onChange={handleNoInvitesChange}
            />
            <label className="form-check-label" htmlFor="noInvitesCheck">
              Не запрошувати мене
            </label>
            <p className="form-text text-muted">
              Увімкніть, щоб уникнути отримання запрошень на події.
            </p>
          </div>
        </form>

    </div>
  );
};

export default ProfileSettings;