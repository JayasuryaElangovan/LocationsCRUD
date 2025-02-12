import axios from "axios";

import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchema } from "../utils/validation";

const NewAddLocation = () => {
  const handleSubmit = async (values) => {
    const response = await axios.post(
      "http://localhost:8000/add-location",
      values
    );
    if (response.data.status === 200) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };
  return (
    <div className="w-full">
      <div className="flex items-center space-x-2">
        <Link to="/" className="text-xl">
          <IoMdArrowRoundBack />
        </Link>
        <p className="font-bold text-xl my-3">Add Location</p>
      </div>
      <Formik
        initialValues={{
          branch_id: "",
          address: "",
          address2: "",
          city: "",
          state: "",
          zip_code: "",
          country: "",
          country_description: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          resetForm();
        }}
      >
        {() => {
          return (
            <Form>
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="branch_id"
                  >
                    Branch Id
                  </label>
                  <Field name="branch_id" placeholder="Baby">
                    {({ field, form }) => (
                      <div className="flex flex-col ">
                        <input
                          className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${
                            form.errors.branch_id && form.touched.branch_id
                              ? "border-red-500 border"
                              : ""
                          }`}
                          {...field}
                        />
                        <ErrorMessage
                          component="span"
                          className="text-red-500 text-sm "
                          name="branch_id"
                        />
                      </div>
                    )}
                  </Field>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="city"
                  >
                    City
                  </label>
                  <Field name="city" placeholder="Baby">
                    {({ field, form }) => (
                      <div>
                        <input
                          className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${
                            form.errors.city && form.touched.city
                              ? "border border-red-500"
                              : ""
                          }`}
                          {...field}
                        />

                        <ErrorMessage
                          component="span"
                          className="text-red-500 text-sm"
                          name="city"
                        />
                      </div>
                    )}
                  </Field>
                </div>
              </div>

              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="address"
                  >
                    Address
                  </label>
                  <Field name="address" placeholder="Baby">
                    {({ field, form }) => (
                      <div>
                        <input
                          className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white ${
                            form.errors.address && form.touched.address
                              ? "border border-red-500"
                              : ""
                          }`}
                          {...field}
                        />

                        <ErrorMessage
                          component="span"
                          className="text-red-500 text-sm"
                          name="address"
                        />
                      </div>
                    )}
                  </Field>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="address2"
                  >
                    Address2
                  </label>
                  <Field name="address2" placeholder="Baby">
                    {({ field, form }) => (
                      <div>
                        <input
                          className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${
                            form.errors.address2 && form.touched.address2
                              ? "border border-red-500"
                              : ""
                          }`}
                          {...field}
                        />

                        <ErrorMessage
                          component="span"
                          className="text-red-500 text-sm"
                          name="address2"
                        />
                      </div>
                    )}
                  </Field>
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="state"
                  >
                    State
                  </label>
                  <Field name="state" placeholder="Baby">
                    {({ field, form }) => (
                      <div>
                        <input
                          className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white ${
                            form.errors.state && form.touched.state
                              ? "border border-red-500"
                              : ""
                          }`}
                          {...field}
                        />

                        <ErrorMessage
                          component="span"
                          className="text-red-500 text-sm"
                          name="state"
                        />
                      </div>
                    )}
                  </Field>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="zip_code"
                  >
                    Zip Code
                  </label>
                  <Field name="zip_code" placeholder="Baby">
                    {({ field, form }) => (
                      <div>
                        <input
                          className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${
                            form.errors.zip_code && form.touched.zip_code
                              ? "border border-red-500"
                              : ""
                          }`}
                          {...field}
                        />

                        <ErrorMessage
                          component="span"
                          className="text-red-500 text-sm"
                          name="zip_code"
                        />
                      </div>
                    )}
                  </Field>
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="country"
                  >
                    Country
                  </label>
                  <Field name="country" placeholder="Baby">
                    {({ field, form }) => (
                      <div>
                        <input
                          className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white ${
                            form.errors.country && form.touched.country
                              ? "border border-red-500"
                              : ""
                          }`}
                          {...field}
                        />

                        <ErrorMessage
                          component="span"
                          className="text-red-500 text-sm"
                          name="country"
                        />
                      </div>
                    )}
                  </Field>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="country_description"
                  >
                    Country Description
                  </label>
                  <Field name="country_description" placeholder="Baby">
                    {({ field, form }) => (
                      <div>
                        <input
                          className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white ${
                            form.errors.country_description &&
                            form.touched.country_description
                              ? "border border-red-500"
                              : ""
                          }`}
                          {...field}
                        />

                        <ErrorMessage
                          component="span"
                          className="text-red-500 text-sm"
                          name="country_description"
                        />
                      </div>
                    )}
                  </Field>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="border px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-300 hover:text-black"
                >
                  Submit
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
export default NewAddLocation;
