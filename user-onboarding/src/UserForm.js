import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const UserForm = ({ errors, touched, status }) => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        if(status) {
            setUsers([...users, status])
        }
    }, [status])

    return (
        <Form>
            <label className='title'>New User</label>

            {touched.name && errors.name && <p className='error'>{errors.name}</p>}
            <Field type='text' name='name' placeholder='Name' /> <br />

            {touched.email && errors.email && <p className='error'>{errors.email}</p>}
            <Field type='text' name='email' placeholder='Email' /> <br />

            {touched.password && errors.password && <p className='error'>{errors.password}</p>}
            <Field type='password' name='password' placeholder='Password' /> <br />
            
            {touched.tos && errors.tos && <p className='error'>{errors.tos}</p>}
            <label>
                <Field type='checkbox' name='tos' />
                <span>Terms of Service</span>
            </label> <br />

            <button type='submit'>Submit</button>

            {users.map((user) => (
                <div>
                    <p>User: {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
            ))}
        </Form>
    )
}

export default withFormik({
    mapPropsToValues: (values) => {
        return {
            name: values.name || '',
            email: values.email || '',
            password: values.password || '',
            tos: values.tos || ''
        }
    },
    validationSchema: yup.object().shape({
        name: yup.string().min(2).required('Name is required!'),
        email: yup.string().min(4).email().required('Email is required!'),
        password: yup.string().min(6).required('Password is required!'),
        tos: yup.boolean().oneOf([true], 'Terms of Service must be accepted!')
    }),
    handleSubmit: (values, { setStatus }) => {
        axios
            .post('https://reqres.in/api/users', values)
            .then((res) => {
                console.log(res)
                setStatus(res.data)
            })
            .catch((err) => {
                console.log('Error:', err)
            })
    }
})(UserForm)