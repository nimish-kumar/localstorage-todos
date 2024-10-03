import ValidationErrorMsg from "@/components/ValidationErrorMsg";
import {
  CREDENTIALS,
  CURRENT_ACTIVE_USER,
  emailRegex,
} from "@/utils/constants";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const router = useRouter();

  const onSubmit = (submittedFormValues) => {
    if (!localStorage.getItem(`${CREDENTIALS}_${submittedFormValues.email}`)) {
      setError("email", {
        type: "userDoesntExists",
        message: "User doesn't exists, sign up",
      });
      return;
    }
    if (
      localStorage.getItem(`${CREDENTIALS}_${submittedFormValues.email}`) !==
      submittedFormValues.password
    ) {
      setError("password", {
        type: "wrongPasswd",
        message: "Wrong password",
      });
      return;
    }
    localStorage.setItem(CURRENT_ACTIVE_USER, submittedFormValues.email);
    router.replace("/tasks");
  };

  return (
    <div className="flex flex-col self-center shadow-2xl py-10 px-10 w-1/3 rounded-xl font-geist-sans border border-gray">
      <span className="font-bold text-2xl">Sign In</span>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 mt-8 justify-center items-center w-full"
      >
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
            <ValidationErrorMsg message={errors?.email?.message} />
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
            <ValidationErrorMsg message={errors?.password?.message} />
          )}
        </div>
        <button
          type="submit"
          className="bg-orange-500 text-white h-10 w-1/2 rounded-md opacity-1 mt-4"
        >
          Sign In
        </button>
      </form>
      <Link
        href="/signup"
        className="text-sm max-w-fit font-semibold self-center text-red-400 mt-4"
      >
        Not a user? Sign up
      </Link>
    </div>
  );
}

export default SignIn;
