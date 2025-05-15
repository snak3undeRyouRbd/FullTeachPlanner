import React, { useState } from 'react';

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    dob: '',
    additional_info: '',
    profile_picture: null,
  });

  const handleChange = (e) => {
    const { id, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="row justify-content-center form-bg-image">
      <div className="col-12 d-flex align-items-center justify-content-center">
        <div className="bg-white shadow border-0 rounded border-light p-4 p-lg-5 w-100 fmxw-500">
          <form className="form" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="first_name" className="form-label">Ім&apos;я</label>
              <input
                type="text"
                className="form-control"
                id="first_name"
                placeholder="Введіть ім'я"
                required
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="last_name" className="form-label">Прізвище</label>
              <input
                type="text"
                className="form-control"
                id="last_name"
                placeholder="Введіть прізвище"
                required
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="form-label">Електронна пошта</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="example@company.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="dob" className="form-label">Дата народження</label>
              <input
                type="date"
                className="form-control"
                id="dob"
                required
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="additional_info" className="form-label">Додаткова інформація</label>
              <textarea
                className="form-control"
                id="additional_info"
                rows="3"
                placeholder="Введіть додаткову інформацію"
                value={formData.additional_info}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="profile_picture" className="form-label">Фотографія профілю</label>
              <input
                className="form-control"
                type="file"
                id="profile_picture"
                onChange={handleChange}
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-gray-800">Зберегти</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
