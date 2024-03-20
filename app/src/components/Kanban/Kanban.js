import './Kanban.css';
import React, { useState, useEffect } from 'react';
import TasksList from '../TasksList/TasksList'
import axios from 'axios';
import Modal from 'react-modal';
import Controllers from '../../Controllers'

function Kanban () {
    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [filtro, setFilter] = useState('');

    const [isShowSuccessPopup, setShowSuccessPopup] = useState(false);

    // Carrega a lista de tarefas ao montar o componente
    useEffect(() => {
        axios.get('http://localhost:3001/tasks')
        .then(response => {
            setTasks(response.data);
            setIsLoading(false);
        })
        .catch(error => console.error(error));
    }, []);

    // Mostra um popup avisando que uma nova task foi criada com sucesso
    const showSuccessPopup = () => {
        setShowSuccessPopup(true);
        setTimeout(() => setShowSuccessPopup(false), 3000); // Desaparece após 3 segundos
    };

    // Envia uma requisição para criar uma nova task
    const createTask = async () => {
        // Verifica se o nome está vazio
        if (!taskName) {
            alert('É obrigatório dar um nome à task.');
            return;
        }

        try {
            const newTask = await Controllers.createTask(taskName, taskDescription);
            setTasks([...tasks, newTask]);
            setTaskName('');
            setTaskDescription('');

            showSuccessPopup();
        } catch (error) {
            console.error(error);
        }
    };

    // Envia uma requisição para deletar uma tarefa com base em seu ID
    const deleteTask = async (taskId) => {
        // Confirmação antes de deletar
        if (window.confirm('Deseja realmente deletar esta task?')) {
            try {
                await deleteTask(taskId);
                setTasks(tasks.filter(task => task.id !== taskId));
            } catch (error) {
                console.error(error);
            }
        }
    };

    // Envia uma requisição para atualizar o status de uma task com base em seu ID
    const updateTaskStatus = async (taskId, newStatus) => {
        try {
            const updatedTask = await Controllers.updateTaskStatus(taskId, newStatus);
            // Atualiza o estado com a lista reorganizada de tarefas
            setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
        } catch (error) {
            console.error(error);
        }
    };

    // Envia uma requisição para alterar o título de uma task com base em seu ID
    const updateTaskTitle = async (taskId, newTitle) => {
        try {
            const updatedTask = await Controllers.updateTaskTitle(taskId, newTitle);
            // Atualiza o estado com a lista reorganizada de tarefas
            setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
        } catch (error) {
            console.error(error);
        }
    };

    // Envia uma requisição para alterar a descrição de uma task com base em seu ID
    const updateTaskDescription = async (taskId, newDescription) => {
        try {
            const updatedTask = await Controllers.updateTaskDescription(taskId, newDescription);
            // Atualiza o estado com a lista reorganizada de tarefas
            setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
        } catch (error) {
            console.error(error);
        }
    };

    const sortTasksById = (tasksList) => {
        return tasksList.sort((a, b) => a.id - b.id);
    };

    // Filtra a lista de tasks para exibir somente as desejadas
    const filterTasks = (tasksList) => {
        const orderedTasksList = sortTasksById(tasksList);

        return orderedTasksList.filter(task => 
            task.name.toLowerCase().includes(filtro.toLowerCase()) ||
            task.description.toLowerCase().includes(filtro.toLowerCase())
        );
    };

    const handleTitleChange = (event) => {
        let title = event.target.value;
        title = title.slice(0,100);
        setTaskName(title);
    }

    const handleDescChange = (event) => {
        let description = event.target.value;
        description = description.slice(0,500);
        setTaskDescription(description);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='Kanban'>
            {isShowSuccessPopup && (
                <div className="Success-popup-container">
                    <div className='Success-popup'>
                        <p>Nova tarefa criada com <span style={{ color: 'green' }}>sucesso</span>!</p>
                    </div>
                </div>
            )}
            <div className='Filter-container'>
                <div className='Filter-input'>
                    <label>Filtrar por:</label>
                    <input type="text" value={filtro} onChange={(e) => setFilter(e.target.value)} />
                </div>
            </div>
        
            {isLoading ? (
                <p>Carregando...</p>
            ) : (
                <div className='Tasks-lists-container'>
                    <TasksList
                        tasks={filterTasks(tasks.filter(task => task.status === "to_do"))}
                        statusHeader={"Pendente"}
                        onDeleteTask={deleteTask}
                        onUpdateStatus={updateTaskStatus}
                        onUpdateTaskTitle={updateTaskTitle}
                        onUpdateTaskDescription={updateTaskDescription}
                    />
                    <TasksList
                        tasks={filterTasks(tasks.filter(task => task.status === "doing"))}
                        statusHeader={"Em progresso"}
                        onDeleteTask={deleteTask}
                        onUpdateStatus={updateTaskStatus}
                        onUpdateTaskTitle={updateTaskTitle}
                        onUpdateTaskDescription={updateTaskDescription}
                    />
                    <TasksList
                        tasks={filterTasks(tasks.filter(task => task.status === "done"))}
                        statusHeader={"Concluído"}
                        onDeleteTask={deleteTask}
                        onUpdateStatus={updateTaskStatus}
                        onUpdateTaskTitle={updateTaskTitle}
                        onUpdateTaskDescription={updateTaskDescription}
                    />
                </div>
            )}

            <div className='Button-container'>
                <button className='Register-btn' onClick={openModal}>Criar nova tarefa</button>
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
                        <button className='Close-modal-btn' onClick={closeModal}>X</button>
                    </div>
                    <div className='Modal-content'>
                        <div className='Input-container'>
                            <label>Título:</label>
                            <input type="text" value={taskName} onChange={handleTitleChange} />
                        </div>
                        <div className='Input-container'>
                            <label>Descrição:</label>
                            <textarea type="text" rows={5} value={taskDescription} onChange={handleDescChange}/>
                        </div>
                    </div>
                    <div className='Modal-footer'>
                        <button className='Register-btn' onClick={createTask}>Criar</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Kanban;