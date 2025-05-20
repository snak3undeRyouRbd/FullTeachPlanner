import React, { useState, useEffect } from 'react';

const ProfileEdit = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    class: '',
    birthday: '',
    profile_photo: null,
    data_visited: '',
    joined_at: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка данных пользователя
  useEffect(() => {
    fetch('/data.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const userData = data.users?.find((user) => user.id === 1) || data.user;
        if (!userData) throw new Error('Користувача не знайдено');
        setFormData({
          name: userData.name || '',
          email: userData.email || '',
          role: userData.role || '',
          class: userData.class || '',
          birthday: userData.birthday || '',
          profile_photo: null,
          data_visited: userData.data_visited || '',
          joined_at: userData.joined_at || '',
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading user data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { id, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        submitData.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch('/users/1', {
        method: 'PUT',
        body: submitData,
      });
      if (!response.ok) throw new Error('Не вдалося оновити профіль');
      alert('Профіль успішно оновлено!');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Завантаження...</div>;
  if (error) return <div>Помилка: {error}</div>;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center form-bg-image">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <div className="bg-white shadow border-0 rounded border-light p-4 p-lg-5 w-100 fmxw-500">
            <h2 className="mb-4">Редагувати профіль</h2>
            <form className="form" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="form-label">Ім'я</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Введіть ім'я та прізвище"
                  required
                  value={formData.name}
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
                <label htmlFor="role" className="form-label">Роль</label>
                <select
                  className="form-control"
                  id="role"
                  required
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="учень">Учень</option>
                  <option value="вчитель">Вчитель</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="class" className="form-label">Клас</label>
                <input
                  type="text"
                  className="form-control"
                  id="class"
                  placeholder="Введіть клас (наприклад, 8-A)"
                  value={formData.class}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="birthday" className="form-label">Дата народження</label>
                <input
                  type="date"
                  className="form-control"
                  id="birthday"
                  required
                  value={formData.birthday}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="profile_photo" className="form-label">Фотографія профілю</label>
                <input
                  className="form-control"
                  type="file"
                  id="profile_photo"
                  onChange={handleChange}
                />
                {formData.profile_photo && (
                  <p>Вибрано: {formData.profile_photo.name}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="data_visited" className="form-label">Останній візит</label>
                <input
                  type="text"
                  className="form-control"
                  id="data_visited"
                  value={formData.data_visited}
                  disabled
                />
              </div>
              <div className="mb-4">
                <label htmlFor="joined_at" className="form-label">Дата приєднання</label>
                <input
                  type="text"
                  className="form-control"
                  id="joined_at"
                  value={formData.joined_at}
                  disabled
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-gray-800">Зберегти</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;