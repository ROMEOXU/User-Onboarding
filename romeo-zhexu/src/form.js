import React,{useState,useEffect} from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function CreateForm({values,touched,errors,status}){
// console.log('createform',props);
const [forms,setForms] = useState([]);
useEffect(()=>{
    console.log('status change',status)
    status && setForms(forms=>[...forms,status]);
},[status]);
    return(
        <div>
         <Form>
            <div className = 'smallForm'>
              <label htmlFor="name">Name</label>
              <Field id = 'name' name='name' type='text'></Field>
            </div>
            {touched.name && errors.name && (
              <p>{errors.name}</p>
              )}
            <div className = 'smallForm'>
             <label htmlFor="email">Email</label>
             <Field id = 'email' name='email' type='email'></Field>
            </div> 
            {touched.email && errors.email && (
              <p>{errors.email}</p>
              )}
            <div className = 'smallForm'>
             <label htmlFor="password">Password</label>
             <Field id = 'password' name='password' type='password'></Field>
            </div> 
            {touched.password && errors.password && (
              <p>{errors.password}</p>
              )}
            <div className = 'smallForm'>
             <label htmlFor="check">Terms of Service</label>
             <Field id = 'check' name='check' type='checkbox'></Field>
            </div>
            <button type = 'submit'>Submit</button>
         </Form>
         {forms.map(form=>{
             return(
             <ul key= {form.id}>
                 <li>Name:{form.name}</li>
                 <li>Email:{form.email}</li>
             </ul>
             )}
         )}
        </div>
    )
}

const FormwithFormik = withFormik({
    mapPropsToValues(props){
        return{
            name: props.name,
            email: props.email,
            password: props.password,
            check: false
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('what is your name?'),
        email: Yup.string().required('what is your email?'),
        password: Yup.string().required()
      }),
      handleSubmit(values,{setStatus,resetForm}){
          console.log('submitting',values);
          axios
          .post('https://reqres.in/api/users',values)
          .then(res=>{
              console.log('success',res);
              setStatus(res.data);
              resetForm()
              })
          
          .catch(err=>console.log(err.response))
      }
})(CreateForm);

export default FormwithFormik;