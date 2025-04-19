import React from 'react';
import Navbar from '../components/Navbar';
import Event from '../components/EventTable';
import Invites from '../components/Invites';
import SiteFooter from '../components/SiteFooter';

const Events = () => {
  return (
    <div>
		<Navbar />
		<h1>Мій кабінет</h1>
		<p>Ласкаво просимо до вашого особистого кабінету page Events</p>
    <Event />
    <Invites />
    <SiteFooter />
    </div>
  );
};

export default Events;