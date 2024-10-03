import { CREDENTIALS, emailRegex, NAME } from "@/utils/constants";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsCheckCircleFill } from "react-icons/bs";
import { RiErrorWarningFill } from "react-icons/ri";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        setSuccessMessage(false);
      }, 3500);
    }
  }, [successMessage]);

  const onSubmit = (submittedFormValues) => {
    if (
      submittedFormValues?.password !== submittedFormValues?.confirmPassword
    ) {
      setError("confirmPassword", {
        type: "custom",
        message: "Passwords do not match",
      });
      return;
    }

    if (localStorage.getItem(`${CREDENTIALS}_${submittedFormValues.email}`)) {
      setError("email", {
        type: "userAlreadyExists",
        message: "User already exists",
      });
      return;
    }

    localStorage.setItem(
      `${CREDENTIALS}_${submittedFormValues.email}`,
      submittedFormValues?.password
    );
    localStorage.setItem(
      `${NAME}_${submittedFormValues.email}`,
      submittedFormValues?.name
    );

    setSuccessMessage(true);
  };

  return (
    <div className="flex flex-col shadow-2xl py-10 px-10 w-1/3 rounded-xl font-geist-sans border border-gray">
      <span className="font-bold text-2xl">Sign Up</span>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 mt-8 justify-center items-center w-full"
      >
        <div className="flex flex-col gap-1 w-full">
          <label
            htmlFor="name"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your name"
            {...register("name", {
              required: "Name is a required field",
            })}
          />
          {errors?.name?.message && (
            <div className="flex flex-row gap-2 items-center">
              <RiErrorWarningFill className="text-lg text-red-600" />
              <span className="text-red-500 text-sm">
                {errors?.name?.message}
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label
            htmlFor="email"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is a required field",
              pattern: {
                value: emailRegex,
                message: "Please enter valid email",
              },
            })}
          />
          {errors?.email?.message && (
            <div className="flex flex-row gap-2 items-center">
              <RiErrorWarningFill className="text-lg text-red-600" />
              <span className="text-red-500 text-sm">
                {errors?.email?.message}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label
            htmlFor="password"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is a required field",
              minLength: {
                value: 7,
                message: "Min length required for password is 7",
              },
            })}
          />
          {errors?.password?.message && (
            <div className="flex flex-row gap-2 items-center">
              <RiErrorWarningFill className="text-lg text-red-600" />
              <span className="text-red-500 text-sm">
                {errors?.password?.message}
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label
            htmlFor="confirmPassword"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your password"
            {...register("confirmPassword", {
              required: "Re-enter above password to proceed",
            })}
          />
          {errors?.confirmPassword?.message && (
            <div className="flex flex-row gap-2 items-center">
              <RiErrorWarningFill className="text-lg text-red-600" />
              <span className="text-red-500 text-sm">
                {errors?.confirmPassword?.message}
              </span>
            </div>
          )}
        </div>
        {successMessage && (
          <div className="flex flex-row gap-2 mt-4 items-center">
            <BsCheckCircleFill className="text-2xl text-green-500" />
            <span className="text-green-500 font-bold text-sm">
              User created! You can login now
            </span>
          </div>
        )}
        <button
          type="submit"
          className="bg-orange-500 text-white h-10 w-1/2 rounded-md opacity-1 mt-1"
        >
          Sign Up
        </button>
      </form>
      <Link
        href="/login"
        className="text-sm max-w-fit font-semibold self-center text-red-400 mt-4"
      >
        Already a user? Login
      </Link>
    </div>
  );
}

export default SignUp;
