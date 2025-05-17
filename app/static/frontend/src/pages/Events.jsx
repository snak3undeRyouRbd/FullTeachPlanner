  import React, { useState } from 'react';
  import Navbar from '../components/Navbar';
  import EventTable from '../components/EventTable';
  // import Invites from '../components/Invites';
  import EventStats from '../components/EventStats';
  import TaskEfficiency from '../components/TaskEfficiency';
  import AddEventModal from '../components/AddEventModal';
  // import AddTaskModal from '../components/AddTaskModal';
  // import AddInviteModal from '../components/AddInviteModal';
  import SiteFooter from '../components/SiteFooter';
  import { useAuth } from '../context/AuthContext';

  const Events = () => {
    const { currentUser } = useAuth();
    const [showEventModal, setShowEventModal] = useState(false);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [showInviteModal, setShowInviteModal] = useState(false);

    const handleAddEvent = () => setShowEventModal(true);
    const handleAddTask = () => setShowTaskModal(true);
    const handleAddInvite = () => setShowInviteModal(true);

    return (
      <div className="d-flex flex-column min-vh-100">
        <Navbar
          userRole={currentUser?.role || 'учень'}
          onAddEvent={handleAddEvent}
          onAddTask={handleAddTask}
          onAddInvite={handleAddInvite}
        />
        <main className="flex-grow-1">
          <div className="py-4">
            <div className="container">
              <h1>Мій кабінет</h1>
              <p>Ласкаво просимо до вашого особистого кабінету</p>
              <div className="row">
                <div className="col-12 col-xl-8">
                  <div className="row">
                    <div className="col-12 mb-4">
                      <EventTable />
                    </div>
                    {/* <div className="col-12 col-xxl-6 mb-4" id="invites">
                      <Invites />
                    </div> */}
                  </div>
                </div>
                <div className="col-12 col-xl-4">
                  <div className="col-12 px-0 mb-4">
                    <EventStats />
                  </div>
                  <div className="col-12 px-0">
                    <TaskEfficiency />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <SiteFooter />

        <AddEventModal
          show={showEventModal}
          onHide={() => setShowEventModal(false)}
        />
        {/* <AddTaskModal
          show={showTaskModal}
          onHide={() => setShowTaskModal(false)}
        />
        <AddInviteModal
          show={showInviteModal}
          onHide={() => setShowInviteModal(false)}
        /> */}
      </div>
    );
  };

  export default Events;