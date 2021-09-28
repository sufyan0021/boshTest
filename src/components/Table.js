import React, {useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import {
    Link
  } from "react-router-dom";

export default function TodoTable(props) {

    useEffect(()=>{
        console.log(props.data);
    })

    return (
        <Table responsive>
            <thead>
                <tr>
                {props.tableHeads.map((headerName)=>{
                    return <th>{headerName}</th>
                })}
                </tr>
            </thead>
            <tbody>
                
                {props.data.map((obj,idx)=>{
                    return (<tr key={idx}>
                                <td>{obj.taskId}</td>
                                <td>{obj.taskName}</td>
                                <td>{obj.projectName}</td>
                                <td>{obj.comments}</td>
                                <td><Link to="/EditTask"><Button variant="light" onClick={(e)=>{props.handleEditModalShow(e,obj.taskId)}}>{props.buttons.edit}</Button></Link></td>
                                <td><Button variant="light" onClick={()=>{props.handleDelete(obj.taskId)}}>{props.buttons.delete}</Button></td>
                            </tr>)
                })}
            </tbody>
    </Table>
    )
}