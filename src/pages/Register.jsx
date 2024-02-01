

import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { loginSchema } from "@/utils/validations/auth";
import { toast } from "react-toastify";
import Input from "@/components/Input";
import axios from "@/utils/axios";



const initialValues = {
  username: "",
  password: ""
};

const Register = () => {


  const navigate = useNavigate();


  const submitHandler = async (values) => {
    try {
      const response = await   axios.post('/api/auth/register', {email:values.username,   password:values.password });
   
      toast.success('Registration successful');

      navigate('/login')

    } catch (error) {

      console.log(error, 'error.response.data')
      if (error.response && error.response?.data?.error
        ) {
        // If server returns error, set errors state with error message
        toast.error( error.response?.data?.error);
      }
    }
  };




  return (
 
    <div className="flex h-screen">
      <div className="sm:w-1/2 p-8 flex justify-center items-center bg-[#1135a7]">
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={(values) => submitHandler(values)}>
          {({
            errors,
            values,
            isValidating,
            isSubmitting,
            handleBlur,
            touched
          }) => (
            <Form className="w-full max-w-[500px]">
              <h2 className="text-3xl text-white font-semibold">
                Welcome to 
              </h2>
              <Input
                label="Email"
                required
                id="username"
                name="username"
                labelClass="block capitalize tracking-wide text-white  text-xs font-bold mb-5"
                type="email"
                errorText={errors.username}
                error={touched.username}
                onBlur={handleBlur}
                inputClass="appearance-none block w-full rounded-none py-3 px-4 mb-3 leading-tight focus:outline-none"
                placeholder="Email"
                containerClass="w-full md:mb-5 mt-6"
              />

              <Input
                label="Password"
                id="password"
                name="password"
                type="password"
                labelClass="block capitalize tracking-wide text-white  text-xs font-bold mb-5"
                errorText={errors.password}
                error={touched.password}
                onBlur={handleBlur}
                inputClass="py-2 px-3 rounded-none"
                placeholder="Password"
                containerClass="relative "
              />

              <div className="w-full mt-10 md:mb-0">
                <button
               
                  type="submit"
               
                  disabled={isValidating || !loginSchema.isValidSync(values)}
                  className="bg-[#fcd12a] opacity-100 py-1.5 w-1/2 px-16 border uppercase rounded hover:bg-[#1135a7] hover:text-white">
                  Sign Up
                </button>
               
             
              </div>
              <div>
                <p className="text-white mt-2">
                  <span className="mr-1">Already have an account?</span>
                  <Link to="/login" className="text-[#FCD12A]">
                    Login
                  </Link>
                </p>
            
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className="sm:w-1/2 hidden sm:hidden md:hidden lg:block w-full">
        <img
          className="h-screen w-full"
          src="/login.jpg"
          alt="React Image"
        />
      </div>
    </div>
   
  );
};
export default Register;
