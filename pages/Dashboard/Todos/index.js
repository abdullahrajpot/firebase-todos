import React, { useEffect, useState } from 'react';
import { Button, Space, Table } from 'antd';
import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { firestore } from '../../../config/firebase'; // Make sure the path is correct
import { Link } from 'react-router-dom';
const { toastify } = window;

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      setIsProcessing(true);
      try {
        const querySnapshot = await getDocs(collection(firestore, "todos"));
        const todosData = querySnapshot.docs.map(doc => ({
          key: doc.id,
          ...doc.data()
        }));
        setTodos(todosData);
      } catch (error) {
        console.error("Error fetching todos: ", error);
      }
      setIsProcessing(false);
    };

    fetchTodos();
  }, []);

  const handleEdit = async (todo) => {
    const updatedTodo = { ...todo, Status: "Complete" };
    setIsProcessing(true);
    try {
      await setDoc(doc(firestore, "todos", todo.Id), updatedTodo);
      const updatedTodos = todos.map(item => {
        if (item.Id === updatedTodo.Id) return updatedTodo;
        return item;
      });
      setTodos(updatedTodos); // Update the state with the updated todos
      toastify("Todo updated successfully", "success");
    } catch (e) {
      console.error("Error updating document: ", e);
    }
    setIsProcessing(false);


  }
  const handleDelete = async (todo) => {
    try {
      await deleteDoc(doc(firestore, "todos", todo.Id));
      const afterDelete = todos.filter(item => item.Id !== todo.Id)
      setTodos(afterDelete)
      toastify("Todo deleted successfully", "success");
    } catch (e) {
      console.error("Error in deleting  document: ", e);
    }
  }


  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <Link>{text}</Link>,
      responsive: ['lg','md','sm','xs']
    },
    {
      title: 'Description',
      dataIndex: 'Description',
      key: 'Description',
      responsive: ['lg', 'md','sm', 'xs']
    },
    {
      title: 'Location',
      dataIndex: 'Location',
      key: 'Location',
      responsive: ['lg', 'md','sm', 'xs']
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
      responsive: ['lg', 'md','sm', 'xs']
    },
    {
      title: 'Date',
      key: 'dateCreated',
      dataIndex: 'dateCreated',
      responsive: ['lg','md','sm', 'xs'],
      render: (date) => date ? date.toDate().toLocaleString() : 'No Date',
    },
    {
      title: 'Action',
      key: 'action',
      responsive: ['lg', 'md','sm', 'xs'],
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button  onClick={() => handleDelete(record)}>Delete</Button>
        </Space>
        
      ),
    },
  ];

  return (
    <main className='d-flex justify-content-center align-items-center'>
      <div className="container">
        <h1 className='text-center mb-3'>Todos List</h1>
        <div className="row">
          <div className="col col-12">
            <Table style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', overflowY: 'auto', maxHeight: '80vh' }}
              columns={columns}
              dataSource={todos}
              loading={isProcessing}
              pagination={{ pageSize: 5 }}
            />
          </div>
        </div>
        <Link to='/dashboard' className='btn btn-primary mt-4' style={{textDecoration:"none",margin:'auto', display:'flex', justifyContent:'center', width:'40%' }}> Go Back</Link>
      </div>
    </main>
  );
}
