import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Form } from 'react-bootstrap';
import { loginRequest } from '~/redux/auth/actions';

const LoginPage = () => {
   const { isGetProfileSuccess, profileResponse, isGetProfileFailure } =
    useSelector((store) => store.user);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
       email: Yup.string()
        .required('input.email.error.required')
        .matches(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          'input.email.matches.error.required',
        ),
      password: Yup.string()
        .trim()
        .required('input.password.error.required'),
    }),
    onSubmit: (values) => {
      console.log('values', values)
      dispatch(
        loginRequest({ email: values.email, password: values.password }),
      );
    },
  });

  console.log('profileResponse', profileResponse);
  

  return (
    <div className='login-page'>
      <div className='body'>
       <div className="heading">Đăng nhập</div>
       <Form noValidate onSubmit={formik.handleSubmit}>
      <Alert variant="danger">
          Đăng nhập thất bại. Vui lòng kiểm tra thông tin đăng nhập
      </Alert>
      <input className="input" type="email" name="email" id="email" placeholder="E-mail" onChange={(e)=>formik.setFieldValue(
                        'email',
                        e.target.value.toString(),
                      )}/>
      <input className="input" type="password" name="password" id="password" placeholder="Password"  onChange={(e)=>formik.setFieldValue(
                        'password',
                        e.target.value.toString(),
                      )}/>
      <Button type="submit">Đăng nhập</Button>
      </Form>
      </div>
    </div>
  )
}

export default LoginPage