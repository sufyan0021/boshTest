import React, {useEffect,useState} from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";


export default function TodoModal(props) {

  const selectedOption = !!props?.isEditModal ? props?.editData?.project : 'Select Project';
  const projectComments = !!props?.isEditModal? props?.editData?.comments: '';
  const projectTaskName = !!props?.isEditModal ? '' : props.editData?.taskName;
  let history = useHistory();

  const [currentData, setCurrentData] = useState({
    taskId:'',
    taskName: projectTaskName,
    projectName: selectedOption,
    comments: projectComments
  })

    useEffect(() => {
      const projectTaskId =  !!props?.isEditModal? props.editData.taskId : props?.totalTask + 1;
      const selectedOption = !!props?.isEditModal? props.editData.projectName : 'Select Project';
      const projectComments = !!props?.isEditModal? props?.editData?.comments: '';
      const projectTaskName = !!props?.isEditModal ? props.editData?.taskName: '';
      setCurrentData({
        taskId: projectTaskId,
        taskName: projectTaskName,
        projectName: selectedOption,
        comments: projectComments
      });
    }, [props])

    const handleChange = (event) => {
      setCurrentData({...currentData,[event.target.id]: event.target.value});
    }

    const handleValidation = () => {
      if(currentData.taskName === '' || currentData.projectName === ''|| currentData.comments === ''){
        alert("Please fill all fields");
        return false;
      }
      return true;
    }

    const handleEditSave = () => {
      if(!handleValidation()){
        return;
      }
      props.handleEditingDataSave(currentData); props.onHide();
      history.push("/") 
    }

    const handleNewTaskSave = () => {
      if(!handleValidation()){
        return;
      }
      props.handleCreateTask(currentData); props.onHide();
      history.push("/") 
    }

    return (
    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        {props.title}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>
        <label for="taskName">Task Name</label><br/>
        <input type="text" id="taskName" name="Task_Name" onChange={handleChange} value={currentData.taskName} />
      </p>
      <p>
        <label for="projectName">Project Name:</label><br/>
        <select value={currentData.projectName} onChange={handleChange} name="projectList" id="projectName">
          <option value="Select Project">Select Project</option>
          <option value="Project 1">Project 1</option>
          <option value="Project 2">Project 2</option>
          <option value="Project 3">Project 3</option>
          <option value="Project 4">Project 4</option>
        </select>
      </p>
      <p>
        <label for="comments">Comments:</label><br/>
        <textarea id="comments" name="project_comments" rows="4" cols="50" onChange={handleChange} value={currentData.comments}>
        </textarea>
      </p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="light" onClick={()=>{props.onHide(); history.push('/')}}>Cancel</Button>
      <Button variant="light" className="actionButton" onClick={props.isEditModal ? ()=> { handleEditSave() } : ()=>{handleNewTaskSave() }}>{props.isEditModal? 'Save':'Create Task'}</Button>
    </Modal.Footer>
  </Modal>)
}