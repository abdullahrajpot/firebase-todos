import React, { useState } from 'react'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import { firestore } from '../../../config/firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import TextArea from 'antd/es/input/TextArea';
import { useAuthContext } from '../../../Contexts/AuthContext';
// import { Description } from '@mui/icons-material';

const { Title } = Typography
const { toastify } = window

export default function AddTodos() {
    const { user } = useAuthContext();

    const [state, setState] = useState({});
    const [file, setfile] = useState(null);
    // const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false)

    const handleChnage = e => setState(s => ({ ...s, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();

        let { title, Location, Description } = state;

        let todo = {
            title,
            Id: Math.random().toString(36).slice(2),
            Location,
            Description,
            Status: "InCompleted",
            dateCreated: serverTimestamp(),
            createdBy: { uid: user.uid }
        }

        setIsProcessing(true);
        if (file) {
            uploadFile()
        }
        else {
            createTodo(todo);
        }

        const createTodo = async (todo) => {
            console.log("create todo id running")
            try {
                await setDoc(doc(firestore, "todos", todo.Id), todo);

                toastify("Todo added successfully", "success")
            } catch (e) {
                console.error("Error adding document: ", e);
            }
            setIsProcessing(false);
        }
        const uploadFile = async (e) => {
            console.log("file", file)
            setIsProcessing(false);
        }
    }

    return (
        <main className='auth d-flex justify-content-center align-items-center'>
            <div className="card p-3 p-md-4 w-100" style={{ maxWidth: '750px' }}>
                <Title level={2} className="text-center">Add Todos</Title>
                <Form onFinish={handleSubmit}>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Input size='large' type="text" placeholder="Enter Title" name='title' value={state.title} onChange={handleChnage} />
                        </Col>
                        <Col span={24}>
                            <Input size='large' type="text" placeholder="Enter your Location" name='Location' value={state.Location} onChange={handleChnage} />
                        </Col>
                        <Col span={24}>
                            <TextArea rows={5} size='large' placeholder="Description" name='Description' style={{ resize: 'none' }} value={state.Description} onChange={handleChnage} />
                        </Col>
                        <Col span={24}>
                            <Input size='large' type="file" onChange={e => setfile(e.target.files[0])} />
                        </Col>
                        <Col span={24}>
                            <Button type='primary' className='mb-2' size='large' block loading={isProcessing} onClick={handleSubmit}>Add</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </main>
    )
}

