import React, { useState } from 'react'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from '../../config/firebase';
import { Link, useNavigate } from 'react-router-dom';
import {  doc, setDoc } from 'firebase/firestore';

const { Title } = Typography
const { toastify } = window
const initialState = { fullName: '', email: '', password: '' };

export default function Register() {

    const [state, setState] = useState(initialState);
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false)

    const handleChnage = e => setState(s => ({ ...s, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();

        let { fullName, email, password } = state;
        fullName = fullName.trim();

        if (fullName.length < 3) { return toastify("Enter your Fullname", "error"); }
        if (!window.isEmail(email)) { return toastify("Enter your correct Email address", "error") }
        if (password.length < 6) { return toastify("Password must be at least 6 chars", "error") }

        setIsProcessing(true);

        createUserWithEmailAndPassword(auth, email, password)
            .then(async(userCredential) => {
                const user = userCredential.user;
                console.log("users =>", user)
                await setDoc(doc(firestore, "users", user.uid), {
                    name:fullName,
                    email:email,
                    uid:user.uid
                  });
                  
                navigate('/auth/login')
                toastify("A new user has successfully registered", "success")
            })
            .catch((error) => {
                console.error("error=>", error)
                switch (error.code) {
                    case "auth/email-already-in-use":
                        toastify("Email address already in use", "error")
                        break;
                    default:
                        toastify("Something went wrong while registering", "error")
                        break;
                }
            }).finally(() => {
                setIsProcessing(false)
            })
    }

    return (
        <main className='auth d-flex justify-content-center align-items-center'>
            <div className="card p-3 p-md-4 w-100" style={{ maxWidth: '450px' }}>
                <Title level={2} className="text-center">Register</Title>
                <Form onSubmitCapture={handleSubmit}>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Input size='large' type="text" placeholder="Enter FullName" name='fullName' value={state.fullName} onChange={handleChnage} />
                        </Col>
                        <Col span={24}>
                            <Input size='large' type="email" placeholder="Enter your Email" name='email' value={state.email} onChange={handleChnage} />
                        </Col>
                        <Col span={24}>
                            <Input.Password size='large' placeholder="Enter your password" name='password' value={state.password} onChange={handleChnage} />
                        </Col>
                        <Col span={24}>
                            <Button type='primary' size='large' htmlType='submit' block loading={isProcessing} onClick={handleSubmit}>Register</Button>
                            <p className=' d-flex justify-content-center mt-2'>Already have an account?  <Link to='/Auth/login' style={{ textDecoration: 'none', color: 'black' }}>  Signin</Link></p>
                        </Col>
                    </Row>
                </Form>
            </div>
        </main>
    )
}
