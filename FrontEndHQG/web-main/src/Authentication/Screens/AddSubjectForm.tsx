import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { Switch } from "../../Common/Switch";
import { useAuth } from "../../Hooks/AuthContext";
import { on } from "events";
import { debounce } from "lodash";
import { useDescriptionModal } from "../../Hooks/DescriptionModal";
import { UserExistsModalElement } from "../../Common/Modals/UserExistsModalElement";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email().required("Email Required"),
  firstName: Yup.string().required("Firstname Required"),
  lastName: Yup.string().required("Lastname Required"),
  birthDay: Yup.number().min(1).max(31).required("Birth Day is Required"),
  birthMonth: Yup.number().required("Birth Month is Required"),
  birthYear: Yup.number()
    .min(new Date().getFullYear() - 130)
    .max(new Date().getFullYear() - 8)
    .required("Birth Year is Required"),
  gender: Yup.mixed()
    .oneOf(["male", "female"], "Please Select Gender")
    .required("Password Required"),
  password: Yup.string(),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

type AddSubjectForm = {
  onFormSubmit?: (v: any) => void;
};

type FieldError = {
  code: string;
  message: string;
};

type FusionAuthFieldErrors = {
  fieldErrors: {
    "user.email"?: FieldError[];
  };
};

export const AddSubjectForm = ({ onFormSubmit }: AddSubjectForm) => {
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [usePassword, setUsePassword] = useState(false);
  const [addSubjectLoading, setAddSubjectLoading] = useState<boolean>(false);
  const [done, setDone] = useState<string | null>(null);
  const [userAddError, setUserAddError] = useState<string | null>(null);
  const { setOpen, setClosed } = useDescriptionModal();

  return (
    <div>
      {addSubjectLoading ? (
        <div className="flex flex-col items-center mt-4">
          <svg
            aria-hidden="true"
            className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-charcoal"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
          <p className="text-primary-grey">Adding Subject to HeartQuest</p>
        </div>
      ) : null}
      {done ? (
        <div className="mt-4 text-primary-green text-center">{done}</div>
      ) : null}
      {userAddError ? (
        <div className="mt-4 text-primary-red text-center">{userAddError}</div>
      ) : null}
      <Formik
        initialValues={{
          email: "",
          firstName: "",
          lastName: "",
          birthDay: 1,
          birthMonth: 0,
          birthYear: 1960,
          gender: "male",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(v) => {
          onFormSubmit && onFormSubmit(v);
          setAddSubjectLoading(true);
          auth.addSubject(
            {
              email: v.email,
              firstName: v.firstName,
              lastName: v.lastName,
              birthdate: new Date(v.birthYear, v.birthMonth, v.birthDay),
              gender: v.gender as "male" | "female",
              password: v.password,
            },
            () => {
              setAddSubjectLoading(false);
              setDone(
                "Successfully created subject account, please reload to see them in your list."
              );
            },
            (err) => {
              console.log("Callback Error", err);
              if (axios.isAxiosError(err)) {
                const data = err.response?.data as FusionAuthFieldErrors;
                data.fieldErrors["user.email"]?.map((fe) => {
                  if (fe.code === "[duplicate]user.email") {
                    setUserAddError(
                      "<- This user already exist, please search for this user on the left"
                    );
                    setOpen(<UserExistsModalElement close={setClosed} />);
                  }
                });
              }
              setAddSubjectLoading(false);
            }
          );
        }}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form className="flex flex-col mt-8 w-full px-2">
            <Field
              name="email"
              placeholder="Email"
              className="flex flex-1 border-[1px] border-charcoal border-opacity-25 rounded-md p-2"
            />
            {errors.email && touched.email ? (
              <div className="text-red-600">{errors.email}</div>
            ) : null}

            <div className="mt-6"></div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col flex-1 w-full">
                <Field
                  name="firstName"
                  placeholder="First Name"
                  className="flex flex-1 border-[1px] border-charcoal border-opacity-25 rounded-md p-2"
                />
                {errors.firstName && touched.firstName ? (
                  <div className="text-red-600">{errors.firstName}</div>
                ) : null}
              </div>
              <div className="flex flex-col flex-1 w-full">
                <Field
                  name="lastName"
                  placeholder="Last Name"
                  className="flex flex-1 border-[1px] border-charcoal border-opacity-25 rounded-md p-2"
                />
                {errors.lastName && touched.lastName ? (
                  <div className="text-red-600">{errors.lastName}</div>
                ) : null}
              </div>
            </div>

            <div className="mt-6"></div>

            <div className="flex sm:flex-row flex-wrap gap-4">
              <div className="">
                <Field
                  name="birthDay"
                  placeholder="Birth Day"
                  className=" w-24 border-[1px] border-charcoal border-opacity-25 rounded-md p-2"
                />
              </div>
              <div className="">
                <Field
                  as="select"
                  name="birthMonth"
                  className="  border-[1px] border-charcoal border-opacity-25 rounded-md p-2"
                >
                  {[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ].map((m, i) => {
                    return (
                      <option key={i} value={i}>
                        {m}
                      </option>
                    );
                  })}
                </Field>
              </div>
              <div className="">
                <Field
                  name="birthYear"
                  placeholder="Birth Year"
                  className=" w-24 border-[1px] border-charcoal border-opacity-25 rounded-md p-2"
                />
              </div>
            </div>
            {errors.birthDay && touched.birthDay ? (
              <div className="text-red-600">{errors.birthDay}</div>
            ) : null}
            {errors.birthMonth && touched.birthMonth ? (
              <div className="text-red-600">{errors.birthMonth}</div>
            ) : null}
            {errors.birthYear && touched.birthYear ? (
              <div className="text-red-600">{errors.birthYear}</div>
            ) : null}

            <div className="mt-6"></div>

            <Field
              as="select"
              name="gender"
              placeholder="Gender"
              className="flex border-[1px] border-charcoal border-opacity-25 rounded-md p-2"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Field>

            {errors.gender && touched.gender ? (
              <div className="text-red-600">{errors.gender}</div>
            ) : null}

            <div className="mt-6"></div>

            <div className="flex flex-row items-center gap-2 mb-4 text-primary-grey">
              <Switch
                defaultChecked={false}
                onChange={() => {
                  setUsePassword(!usePassword);
                  setFieldValue("password", "");
                  setFieldValue("confirmPassword", "");
                }}
              />
              <p>Want to set a password for this user?</p>
            </div>

            {usePassword && (
              <div className="flex flex-row">
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="flex flex-1 border-[1px] border-charcoal border-opacity-25 rounded-md p-2"
                />
                <button
                  type="button"
                  className="pl-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  )}
                </button>
              </div>
            )}
            {errors.password && touched.password ? (
              <div className="text-red-600">{errors.password}</div>
            ) : null}
            {usePassword && (
              <>
                <div className="mt-6"></div>
                <Field
                  name="confirmPassword"
                  type={showPassword ? "text" : "Password"}
                  placeholder="Password"
                  className="flex border-[1px] border-charcoal border-opacity-25 rounded-md p-2"
                />
              </>
            )}
            {errors.confirmPassword && touched.confirmPassword ? (
              <div className="text-red-600">{errors.confirmPassword}</div>
            ) : null}
            <button
              type="submit"
              className="bg-charcoal rounded-sm text-white py-2  mt-4"
            >
              Register Subject
            </button>
            {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
          </Form>
        )}
      </Formik>
    </div>
  );
};
