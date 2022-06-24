import React from "react";

import { Field, Form, Formik, FormikConfig } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { postRegister } from "api/user";
import { RegisterPayload, UserType } from "api/user/types";
import { useMutation } from "react-query";

const Register = () => {
  const navigate = useNavigate();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const [register] = useMutation(async (user: RegisterPayload) => {
    const res = await postRegister(user);
    return res.data;
  });

  const handleRegister: FormikConfig<any>["onSubmit"] = async (values) => {
    const user = (await register(values)) as UserType;
    localStorage.setItem("user_id", JSON.stringify(user.id));
    navigate("/dashboard");
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="px-5 pt-8 pb-6 mb-10 md:p-10 md:mb-0 flex items-center justify-end">
        <div className="text-gray-600 text-sm">
          <span className="md:inline hidden">Allready have an account ? </span>
          <Link to="/login" className="text-blue-600 underline">
            Login Here
          </Link>
        </div>
      </div>
      <div className="h-full flex flex-col max-w-sm mx-auto justify-center px-5">
        <div className="font-medium text-2xl mb-10 md:text-center text-black">
          Register
        </div>
        <div className="flex items-center justify-between text-center mb-8 text-gray-400 text-sm">
          <div className="bg-gray-400" style={{ height: 1, width: 92 }}></div>
          <div className="w-max mx-2">Enter Account Info</div>
          <div
            className="bg-gray-400 w-1/2"
            style={{ height: 1, width: 92 }}
          ></div>
        </div>
        <div>
          <Formik initialValues={initialValues} onSubmit={handleRegister}>
            <Form>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <div className="mt-2">
                  <Field
                    name="firstName"
                    placeholder="John"
                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:ring-1 sm:text-sm"
                  />
                </div>
              </div>
              <div className="mt-8">
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <div className="mt-2">
                  <Field
                    name="lastName"
                    placeholder="Johnson"
                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:ring-1 sm:text-sm"
                  />
                </div>
              </div>
              <div className="mt-8">
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <div className="mt-2">
                  <Field
                    name="email"
                    placeholder="email@gmail.com"
                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:ring-1 sm:text-sm"
                  />
                </div>
              </div>
              <div className="mt-8">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-2">
                  <Field
                    name="password"
                    type="password"
                    placeholder="*****"
                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:ring-1 sm:text-sm"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded shadow-sm transition-colors font-medium text-white bg-blue-600 hover:bg-blue-700 mt-12"
              >
                Register
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
