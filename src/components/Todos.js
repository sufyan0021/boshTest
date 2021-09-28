import React, {useEffect, useState} from 'react';
import JSONData from "../dummyDb/todo";
import Button from 'react-bootstrap/Button';
import Table from './Table';
import Modal from '../components/TodoModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import {
    Route,
    Link
  } from "react-router-dom";


const TABLE_HEADS =  ["Task ID", "Task Name", "Project", "Comments", "Task Edit", "Task Delete"]

export default function Todos() {

    const [data,setTodos] = useState(JSONData.todos);
    const [modalShow, setModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editData, setEditData] = useState({});

    useEffect(() => {
        console.log("The data", JSONData);
    }, [])

    const handleModalShow = () => {
        setModalShow(true);
    }

    const handleEditModalShow = (e,idx) => {
        console.log("The e",e);
        console.log("The index",idx);
        setEditData(data[idx]);
        setEditModalShow(true);
    }

    const deleteData = (idx) => {
        const updatedData = data.filter((obj)=>{
            return obj.taskId !== idx;
        })
        console.log("The Updated data", updatedData);
        return updatedData;
    }

    const updateData = (updateObj) => {
        const updatedData = data.map((obj) => {
            if(obj.taskId === updateObj.taskId){
                return updateObj;
            }
            else{
                return obj;
            }
        })
        return updatedData;
    }

    const handleDelete = (idx) => {
        console.log("called",idx);
        setTodos(deleteData(idx))
    }

    const handleEditingDataSave = (obj) => {
        setTodos(updateData(obj))
    }

    const handleCreateTask = (obj) => {
        setTodos([...data,obj]);
    }

    return(
        <div className="todoComponentContainer"> 
            <Link to='/CreateTask'><div className="createActionContainer">
                <FontAwesomeIcon color="lightblue" icon={faPlusCircle} />
                <Button variant="light" className="createTaskAction" onClick={handleModalShow}>Create Tasks</Button>
            </div></Link>
            <Table data={data} buttons={JSONData.buttons} tableHeads={TABLE_HEADS} handleEditModalShow={handleEditModalShow} handleDelete={handleDelete}/>
            <Route path="/CreateTask"><Modal totalTask={data.length} title="Create Task" show={modalShow} handleCreateTask={handleCreateTask} onHide={() => setModalShow(false)}/></Route>
            <Route path="/EditTask"><Modal isEditModal editData={editData} title="Edit Task" handleEditingDataSave={handleEditingDataSave} show={editModalShow} onHide={() => setEditModalShow(false)}/></Route>
        </div>)
}