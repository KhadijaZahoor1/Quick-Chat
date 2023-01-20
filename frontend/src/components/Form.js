import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
  const notify = () => toast("Your message send successfully 😉");

  //// define initial values of form fields
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      code: "",
      message: "",
      image: "",
    },
    // form validation
    validationSchema: Yup.object({
      firstname: Yup.string()
        .max(15, "Must be 5 characters or more")
        .required("*First name required"),
      lastname: Yup.string()
        .max(15, "Must be 6 characters or more")
        .required("*Last name required"),
      code: Yup.number()
        .min(3, "must be 3 digits")
        .required("*Code is required"),
      message: Yup.string()
        .max(100, "Must be less than 100 characters")
        .required("*Message must be required"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm({ values: "" });
      notify();
      //// post req here
      fetch("http://localhost:8000/whatsappmsg", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  console.log(formik.values);

  return (
    /// form layout
    <>
      <div class="screen">
        <div class="screen__content">
          <form
            class="login"
            onSubmit={formik.handleSubmit}
            action="/single"
            method="POST"
            enctype="multipart/form-data"
          >
            {/* firstname field  */}
            <div class="login__field">
              <i class="login__icon fas fa-user"></i>
              <input
                className="px-2 border-b rounded border-[#4C489D] py-1 focus:outline-none active:outline-none"
                id="firstname"
                type="text"
                placeholder="First Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstname}
              />
              {formik.touched.firstname && formik.errors.firstname ? (
                <p className="text-red-700 text-xs">
                  {formik.errors.firstname}
                </p>
              ) : null}
            </div>
            {/* lastname field */}
            <div class="login__field">
              <i class="login__icon fas fa-lock"></i>
              <input
                className="px-2 border-b rounded border-[#4C489D] py-1 focus:outline-none active:outline-none"
                placeholder="Last Name"
                id="lastname"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastname}
              />
              {formik.touched.lastname && formik.errors.lastname ? (
                <p className="text-red-700 text-xs">{formik.errors.lastname}</p>
              ) : null}
            </div>
            {/* code field */}
            <div class="login__field">
              <i class="login__icon fas fa-lock"></i>
              <input
                className="px-2 border-b rounded border-[#4C489D] py-1 focus:outline-none active:outline-none"
                id="code"
                type="text"
                placeholder="Your code"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.code}
              />
              {formik.touched.code && formik.errors.code ? (
                <p className="text-red-700 text-xs">{formik.errors.code}</p>
              ) : null}
            </div>
            {/* image field */}
            {/* <input
              type="file"
              id="image"
              placeholder="Choose file"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.image}
            /> */}

            {/* message field  */}
            <div class="login__field">
              <i class="login__icon fas fa-lock"></i>
              <textarea
                className="px-2 border rounded border-[#4C489D] py-1 focus:outline-none active:outline-none"
                id="message"
                rows="4"
                cols="20"
                name="message"
                placeholder="Your message"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
              ></textarea>
              {formik.touched.message && formik.errors.message ? (
                <p className="text-red-700 text-xs">{formik.errors.message}</p>
              ) : null}
            </div>
            <button class="button login__submit" type="submit">
              Send
            </button>
            <ToastContainer />
          </form>
        </div>
        <div class="screen__background sm:hidden">
          <span class="screen__background__shape screen__background__shape4"></span>
          <span class="screen__background__shape screen__background__shape3"></span>
          <span class="screen__background__shape screen__background__shape2"></span>
          <span class="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </>
  );
};

export default Form;
