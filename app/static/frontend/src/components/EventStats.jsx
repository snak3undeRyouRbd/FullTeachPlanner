import React from 'react';

const EventStats = () => {
  return (
    <div className="card border-0 shadow">
      <div className="card-header d-flex flex-row align-items-center flex-0 border-bottom">
        <div className="d-block">
          <div className="h6 fw-normal text-gray mb-2">Кількість відвіданих подій</div>
          <h2 className="h3 fw-extrabold">452</h2>
          <div className="small mt-2">
            <span className="fas fa-angle-up text-success"></span>
            <span className="text-success fw-bold">18.2%</span>
          </div>
        </div>
        <div className="d-block ms-auto">
          <div className="d-flex align-items-center text-end mb-2">
            <span className="dot rounded-circle bg-gray-800 me-2"></span>
            <span className="fw-normal small">Липень</span>
          </div>
          <div className="d-flex align-items-center text-end">
            <span className="dot rounded-circle bg-secondary me-2"></span>
            <span className="fw-normal small">Серпень</span>
          </div>
        </div>
      </div>
      {/* <div className="card-body p-2">
        <div className="text-center">
          <p className="text-muted">Графік</p>
        </div>
      </div> */}
    </div>
  );
};

export default EventStats;