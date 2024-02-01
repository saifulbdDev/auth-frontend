import { toast } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { loginSchema } from "@/utils/validations/auth";
import { useGoogleLogin } from "@react-oauth/google";
import Input from "@/components/Input";

import axios from "@/utils/axios";

const initialValues = {
  username: "",
  password: ""
};

const Login = () => {
  const navigate = useNavigate();
  const submitHandler = async (values) => {
    try {
      const response = await axios.post("/api/auth/login", {
        email: values.username,
        password: values.password
      });

      if(response?.data?.token){
        setLocalStorageAndNavigate(response.data.token, response.data.user);
        }
    } catch (error) {

      handleAxiosError(error);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (res) => {
      const { code } = res;

      if (code) {
        console.log(res, "res");
        // Send response.tokenObj.id_token to your backend for verification

        axios
          .post("/api/auth/google-login", { code })
          .then((response) => {
            console.log(response.data);
            // Redirect or perform other actions based on response
            if(response?.data?.token){
              setLocalStorageAndNavigate(response.data.token, response.data.user);
            }
          })
          .catch((error) => {
            handleAxiosError(error);
          });
      }
    },
    flow: "auth-code",
    onError: (err) => console.log(err)
  });
  const handleAxiosError = (error) => {
    if (error.response && error.response.data?.msg) {
      toast.error(error.response.data.msg);
    } else {
      toast.error("An error occurred. Please try again later.");
    }
  };
  const setLocalStorageAndNavigate = (token, user) => {
    window.localStorage.setItem("jwt-token", JSON.stringify(token));
    window.localStorage.setItem("user", JSON.stringify(user));
    navigate('/');
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
              <h2 className="text-3xl text-white font-semibold">Welcome to</h2>
              <Input
                label="Email"
                required
                id="username"
                name="username"
                autoComplete="username" 
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
                autoComplete="current-password" 
                type="password"
                labelClass="block capitalize tracking-wide text-white  text-xs font-bold mb-5"
                errorText={errors.password}
                error={touched.password}
                onBlur={handleBlur}
                inputClass="py-2 px-3 rounded-none"
                placeholder="Password"
                containerClass="relative "
              />

              <div className="w-full flex items-center space-x-3  mt-10 md:mb-0 ">
                <button
                  type="submit"
                  disabled={isValidating || !loginSchema.isValidSync(values)}
                  className="bg-[#fcd12a] opacity-100 py-1.5 w-1/2 px-16 border uppercase rounded hover:bg-[#1135a7] hover:text-white">
                  Login
                </button>

                <button
                  type="button"
                  onClick={googleLogin}
                  className="px-4 py-2 border w-1/2 flex gap-2 justify-center bg-white border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
                  <img
                    className="w-6 h-6"
                    src="/google-color.svg"
                    loading="lazy"
                    alt="google logo"
                  />
                  <span>Login with Google</span>
                </button>
              
              </div>
              <div className="w-full ">
                <p className="text-white mt-1 ">
                  <span className="mr-1">Don't have an account?</span>
                  <Link to="/register" className="text-[#FCD12A]">
                    Sign Up
                  </Link>
                </p>
              </div>
             
            </Form>
          )}
        </Formik>
      </div>
      <div className="sm:w-1/2 hidden sm:hidden md:hidden lg:block w-full">
        <img className="h-screen w-full" src="/login.jpg" alt="React Image" />
      </div>
    </div>
  );
};
export default Login;
