import { useForm } from "react-hook-form";
import { RiErrorWarningFill } from "react-icons/ri";

function SignUp() {
  // Accepts mail from subdomain also
  const emailRegex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.)*[a-zA-Z]{2,}$/;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
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
            class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
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
            class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
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
            class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
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
            class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
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
        <button
          type="submit"
          className="bg-orange-500 text-white h-10 w-1/2 rounded-md opacity-1 mt-4"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
