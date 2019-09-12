import React from 'react';
import { withFormik, Form, Field } from 'formik';

const UserForm = () => {
    return (
        <Form>
            <Field type='text' name='name' placeholder='Name' /> <br />
            <Field type='text' name='email' placeholder='Email' /> <br />
            <Field type='text' name='password' placeholder='Password' /> <br />
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
            name: values.name || ''
        }
    }
})(UserForm)