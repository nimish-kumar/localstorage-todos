import { RiErrorWarningFill } from "react-icons/ri";

function ValidationErrorMsg({ message }) {
  if (!message) return null;
  return (
    <div className="flex flex-row gap-2 items-center">
      <RiErrorWarningFill className="text-lg text-red-600" />
      <span className="text-red-500 text-sm">{message}</span>
    </div>
  );
}

export default ValidationErrorMsg;
