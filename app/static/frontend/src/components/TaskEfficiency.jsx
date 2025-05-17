import React from 'react';

const TaskEfficiency = () => {
  return (
    <div className="card border-0 shadow">
      <div className="card-body">
        <h2 className="fs-5 fw-bold mb-1">Ефективність</h2>
        <p>Загальна кількість запланованих завдань та виконаних із них</p>
        <div className="d-block">
          <div className="d-flex align-items-center me-5">
            <div className="icon-shape icon-sm icon-shape-danger rounded me-3">
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v2a1 1 0 102 0V9z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <div className="d-block">
              <label className="mb-0">Заплановано</label>
              <h4 className="mb-0">93</h4>
            </div>
          </div>
          <div className="d-flex align-items-center pt-3">
            <div className="icon-shape icon-sm icon-shape-purple rounded me-3">
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path>
              </svg>
            </div>
            <div className="d-block">
              <label className="mb-0">Виконано</label>
              <h4 className="mb-0">79</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskEfficiency;