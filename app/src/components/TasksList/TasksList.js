import './TasksList.css';
import React, { useState, useEffect } from 'react';
import DeleteIcon from '../../img/icons-delete.svg';
import Modal from 'react-modal';

function TaskList({ tasks, statusHeader, onDeleteTask, onUpdateStatus }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskId, setTaskId] = useState('');
    const [taskStatus, setTaskStatus] = useState('');
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    const onOpenTask = ( taskId, taskStatus, taskName, taskDesc) => {
        setTaskId(taskId);
        setTaskName(taskName);
        setTaskStatus(taskStatus);
        setTaskDescription(taskDesc);
        openModal();
    }

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='Tasks-list'>
            <div className='Tasks-list-header'>
                <p className='Tasks-list-title'>{statusHeader}</p>
            </div>
            <div className='Tasks-container'>
                {tasks.map((task, index) => (
                    <div
                        key={task.id}
                        className={`Task ${index % 2 === 0 ? 'Even' : 'Odd'}`}
                        onClick={() => onOpenTask(task.id, task.status, task.name, task.description)}
                    >
                        {task.name}
                    </div>
                ))}
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Cadastrar Nova Tarefa"
                ariaHideApp={false}
                style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
                content: {
                    height: 'fit-content',
                    maxHeight: '28rem',
                    margin: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                }}
            >
                <div className='Modal-container'>
                    <div className='Modal-header'>
                        <div className='Status-container'>
                            <select className='Status-selector' value={taskStatus} onChange={(e) => {
                                onUpdateStatus(taskId, e.target.value);
                                setTaskStatus( e.target.value);
                            }}>
                                <option value="to_do">Pendente</option>
                                <option value="doing">Em Progresso</option>
                                <option value="done">Concluído</option>
                            </select>
                        </div>
                        <button className='Close-modal-btn' onClick={closeModal}>X</button>
                    </div>
                    <div className='Modal-content'>
                        <div className='Task-title-container'>
                            {taskName}
                        </div>
                        <div>{taskDescription}</div>
                    </div>
                    <div className='Modal-footer'>
                        <button className='Delete-btn' onClick={() => onDeleteTask(taskId)}>
                            <img src={DeleteIcon} className="Delete-icon" alt="Deletar" />
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default TaskList;