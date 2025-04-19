import React from 'react';
import Navbar from '../components/Navbar';
import ProfileForm from '../components/ProfileForm';
import SiteFooter from '../components/SiteFooter';

const Profile = () => {
  return (
    <div>
		<Navbar />
		<h1>Мій кабінет</h1>
    <ProfileForm />
    <SiteFooter />
    </div>
  );
};

export default Profile;