import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Loader from './utils/Loader';
import Tooltip from './utils/Tooltip';

const CompletedTasks = () => {
  const authState = useSelector((state) => state.authReducer);

  const [completedTasks, setCompletedTasks] = useState([]);
  const [fetchData, { loading }] = useFetch();

  const fetchCompletedTasks = useCallback(() => {
    const config = { url: "/tasks/completed", method: "get", headers: { Authorization: authState.token } };
    fetchData(config, { showSuccessToast: false }).then((data) => setCompletedTasks(data.completedTasks));
  }, [authState.token, fetchData]);

  useEffect(() => {
    if (!authState.isLoggedIn) return;
    fetchCompletedTasks();
  }, [authState.isLoggedIn, fetchCompletedTasks]);

  const handleDelete = (id) => {
    const config = { url: `/tasks/${id}`, method: "delete", headers: { Authorization: authState.token } };
    fetchData(config).then(() => fetchCompletedTasks());
  };

  return (
    <>
      <div className="my-2 mx-auto max-w-[700px] py-4">
        {completedTasks.length !== 0 && <h2 className='my-2 ml-2 md:ml-0 text-xl'>Your tasks ({completedTasks.length})</h2>}
        {loading ? (
          <Loader />
        ) : (
          <div>
            {completedTasks.length === 0 ? (
              <div className='w-[600px] h-[300px] flex items-center justify-center gap-4'>
                <span>No Completed tasks found</span>
                <Link to="/tasks/add" className="bg-blue-500 text-white hover:bg-blue-600 font-medium rounded-md px-4 py-2">+ Add new task </Link>
              </div>
            ) : (
              completedTasks.map((task, index) => (
                <div key={task._id} className='bg-white my-4 p-4 text-gray-600 rounded-md shadow-md'>
                  <div className='flex'>
                    <span className='font-medium'>Task #{index + 1}</span>
                    <Tooltip text={"Edit this task"} position={"top"}>
                      <Link to={`/tasks/${task._id}`} className='ml-auto mr-2 text-green-600 cursor-pointer'>
                        <i className="fa-solid fa-pen"></i>
                      </Link>
                    </Tooltip>
                    <Tooltip text={"Delete this task"} position={"top"}>
                      <span className='text-red-500 cursor-pointer' onClick={() => handleDelete(task._id)}>
                        <i className="fa-solid fa-trash"></i>
                      </span>
                    </Tooltip>
                  </div>
                  <div className='whitespace-pre'>{task.description}</div>
                  <div>Deadline: {new Date(task.deadlineDate).toLocaleDateString('en-GB')}</div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CompletedTasks;
