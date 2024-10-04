import InlineEdit from "@/components/InlineEdit";
import ValidationErrorMsg from "@/components/ValidationErrorMsg";
import withAuth from "@/hoc/withAuth";
import {
  createTodo,
  deleteTodo,
  editTodo,
  resetStore,
  setStore,
  toggleCompleteTodo,
} from "@/redux/todos/slice";
import { CURRENT_ACTIVE_USER, NAME } from "@/utils/constants";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

function Tasks() {
  const currentUserName = localStorage.getItem(
    `${NAME}_${localStorage.getItem(CURRENT_ACTIVE_USER)}`
  );
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setStore(
        JSON.parse(
          localStorage.getItem(
            `tasks_${localStorage.getItem(CURRENT_ACTIVE_USER)}`
          )
        )
      )
    );
  }, []);

  // useEffect(() => {
  //   // Update localstorage on update of redux store
  //   if (!initialLoadRef.current && localStorage.getItem(CURRENT_ACTIVE_USER)) {
  // localStorage.setItem(
  //   `tasks_${localStorage.getItem(CURRENT_ACTIVE_USER)}`,
  //   JSON.stringify(todos)
  // );
  //   }
  //   initialLoadRef.current = false;
  // }, [todos]);

  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm();

  const onSubmit = ({ text }) => {
    dispatch(createTodo(text));
    reset();
  };

  return (
    <div>
      <button
        className="bg-red-600 text-white h-10 w-20 rounded-md absolute top-8 right-8"
        onClick={() => {
          localStorage.removeItem(CURRENT_ACTIVE_USER);
          dispatch(resetStore());
          router.replace("/login");
        }}
      >
        Logout
      </button>

      <div className="mt-12 flex flex-col">
        <div>
          <span className="text-orange-500 text-4xl font-geist-sans font-bold">
            Hi!
          </span>
          <span className="text-red-600 text-4xl font-geist-sans font-bold">
            {" "}
            {currentUserName},
          </span>
        </div>
        <form
          className="mt-12 flex flex-col w-full items-center justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <textarea
            className="border border-gray outline-none focus:border-gray-500 p-4 rounded-md"
            rows={1}
            cols={50}
            {...register("text", {
              required: "Todo cannot be empty",
            })}
          />
          <ValidationErrorMsg message={errors?.text?.message} />
          <button className="bg-red-400 text-white h-10 w-1/2 rounded-md mt-8 active:bg-red-600">
            Add tasks
          </button>
        </form>
        <hr className="border bg-gray-400 w-full mt-8 border-dashed mb-8" />
        {todos?.length === 0 && <span>NO TODOS FOUND!!!</span>}
        <ul className="flex flex-col gap-6">
          {todos?.map(({ key, value, isCompleted }) => (
            <li key={key}>
              <InlineEdit
                value={value}
                onChange={(text) => dispatch(editTodo({ key, value: text }))}
                onDelete={() => dispatch(deleteTodo(key))}
                toggleCheck={() => dispatch(toggleCompleteTodo(key))}
                isCompleted={isCompleted}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default withAuth(Tasks);
