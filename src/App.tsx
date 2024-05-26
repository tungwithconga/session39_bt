import React, { useState, useEffect } from 'react';

export default function App() {
  const [taskName, setTaskName] = useState('');
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!taskName) {
      setError('Tên công việc không được phép để trống.');
      return;
    }

    if (tasks.some((task, index) => task.name === taskName && index !== editingIndex)) {
      setError('Tên công việc không được phép trùng.');
      return;
    }

    if (editingIndex !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === editingIndex ? { ...task, name: taskName } : task
      );
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setEditingIndex(null);
    } else {
      const newTask = { name: taskName, completed: false };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    setTaskName('');
  };

  const handleEdit = (index) => {
    setTaskName(tasks[index].name);
    setEditingIndex(index);
  };

  const handleModalClose = () => {
    setError('');
  };

  return (
    <>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card">
                <div className="card-body p-5">
                  <form className="d-flex justify-content-center align-items-center mb-4" onSubmit={handleFormSubmit}>
                    <div className="form-outline flex-fill">
                      <input
                        type="text"
                        id="form2"
                        className="form-control"
                        value={taskName}
                        onChange={handleTaskNameChange}
                      />
                      <label className="form-label" htmlFor="form2">
                        Nhập tên công việc
                      </label>
                    </div>
                    <button type="submit" className="btn btn-info ms-2">
                      {editingIndex !== null ? 'Sửa' : 'Thêm'}
                    </button>
                  </form>
                  {/* Tabs navs */}
                  <ul className="nav nav-tabs mb-4 pb-2">
                    <li className="nav-item" role="presentation">
                      <a className="nav-link active">Tất cả</a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a className="nav-link">Đã hoàn thành</a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a className="nav-link">Chưa hoàn thành</a>
                    </li>
                  </ul>
                  {/* Tabs navs */}
                  {/* Tabs content */}
                  <div className="tab-content" id="ex1-content">
                    <div className="tab-pane fade show active">
                      <ul className="list-group mb-0">
                        {tasks.map((task, index) => (
                          <li
                            key={index}
                            className="list-group-item d-flex align-items-center justify-content-between border-0 mb-2 rounded"
                            style={{ backgroundColor: '#f4f6f7' }}
                          >
                            <div>
                              <input
                                className="form-check-input me-2"
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => {
                                  const updatedTasks = tasks.map((t, i) =>
                                    i === index ? { ...t, completed: !t.completed } : t
                                  );
                                  setTasks(updatedTasks);
                                  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
                                }}
                              />
                              {task.completed ? <s>{task.name}</s> : <span>{task.name}</span>}
                            </div>
                            <div className="d-flex gap-3">
                              <i
                                className="fas fa-pen-to-square text-warning"
                                onClick={() => handleEdit(index)}
                              />
                              <i
                                className="far fa-trash-can text-danger"
                                onClick={() => {
                                  const updatedTasks = tasks.filter((_, i) => i !== index);
                                  setTasks(updatedTasks);
                                  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
                                }}
                              />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Modal cảnh báo lỗi */}
      {error && (
        <div className="overlay">
          <div className="modal-custom">
            <div className="modal-header-custom">
              <h5>Cảnh báo</h5>
              <i className="fas fa-xmark" onClick={handleModalClose} />
            </div>
            <div className="modal-body-custom">
              <p>{error}</p>
            </div>
            <div className="modal-footer-footer">
              <button className="btn btn-light" onClick={handleModalClose}>Đóng</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
