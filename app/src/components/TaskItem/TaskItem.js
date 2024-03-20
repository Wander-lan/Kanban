import './TaskItem.css';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '../../img/icons-delete.svg';
import Modal from 'react-modal';

function TaskItem ({
    className,
    task,
    onDeleteTask,
    onUpdateStatus,
    onUpdateTaskTitle,
    onUpdateTaskDescription
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTitleEditing, setIsTitleEditing] = useState(false);
    const [isDescEditing, setIsDescEditing] = useState(false);
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
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='Task-item'>
            <div
                key={task.id}
                className={`Task ${className} ${task.status === 'done' ? 'Done' : ''}`}
                onClick={() => onOpenTask(task.id, task.status, task.name, task.description)}
            >
                {task.name}
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
                        {isTitleEditing ? (
                            <input
                                className="Title-input"
                                type="text"
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                                onBlur={(e) => {
                                    if (taskName) onUpdateTaskTitle(taskId, taskName);
                                    setIsTitleEditing(false);
                                }}
                            />
                        ):(
                            <div className='Task-title-container' onClick={(e) => setIsTitleEditing(true)}>
                                {taskName}
                            </div>
                        )}
                        
                        {isDescEditing ? (
                            <input
                                className="Description-input"
                                type="text"
                                value={taskDescription}
                                onChange={(e) => setTaskDescription(e.target.value)}
                                onBlur={(e) => {
                                    onUpdateTaskDescription(taskId, taskDescription);
                                    setIsDescEditing(false);
                                }}
                            />
                        ):(
                            <div className='Task-description-container' onClick={(e) => setIsDescEditing(true)}>
                                {taskDescription ? (<>{taskDescription}</>):(<>Adicione uma descrição...</>)}
                            </div>
                        )}
                    </div>
                    <div className='Modal-footer'>
                        <button className='Delete-btn' onClick={() => {onDeleteTask(taskId); closeModal()}}>
                            <img src={DeleteIcon} className="Delete-icon" alt="Deletar" />
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

TaskItem.propTypes = {
    className: PropTypes.string,
    task: PropTypes.object.isRequired,
    onDeleteTask: PropTypes.func.isRequired,
    onUpdateStatus: PropTypes.func.isRequired,
    onUpdateTaskTitle: PropTypes.func.isRequired,
    onUpdateTaskDescription: PropTypes.func.isRequired
};

export default TaskItem;