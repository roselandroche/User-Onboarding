import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';

const UserForm = ({ errors, touched, status }) => {
    return (
        <Form>
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
    })
    // handleSubmit: (values, { setStatus }) => {

    // }
})(UserForm)