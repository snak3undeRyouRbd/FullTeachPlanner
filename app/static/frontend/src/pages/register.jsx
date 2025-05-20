import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('учень');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          name,
          surname,
          password,
          role
        })
      });

      console.log("Ответ сервера:", response);

      if (!response.ok) {
        const result = await response.json();
        console.error("Ошибка регистрации:", result);
        setError(result?.error || 'Неизвестная ошибка');
        return;
      }

      const result = await response.json();
      console.log("Успешно зарегистрирован:", result);
      navigate('/auth/login');

    } catch (err) {
      console.error("Ошибка запроса:", err);
      setError('Сервер недоступен или возникла ошибка.');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4">Реєстрація</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label className="form-label">Імейл</label>
          <input type="email" className="form-control" value={email}
            onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Ім’я</label>
          <input type="text" className="form-control" value={name}
            onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Прізвище</label>
          <input type="text" className="form-control" value={surname}
            onChange={(e) => setSurname(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Пароль</label>
          <input type="password" className="form-control" value={password}
            onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Роль</label>
          <select className="form-select" value={role}
            onChange={(e) => setRole(e.target.value)}>
            <option value="учень">Учень</option>
            <option value="вчитель">Вчитель</option>
            <option value="батько">Батько</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Зареєструватися</button>
      </form>
    </div>
  );
}

export default Register;
