import useDebounce from "@/hooks/useDebounce";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import ValidationErrorMsg from "../ValidationErrorMsg";

function InlineEdit({
  value,
  onChange,
  onDelete,
  toggleCheck,
  isCompleted = false,
}) {
  const [editable, setEditable] = useState(false);
  const [text, setText] = useState(value || "");

  const debouncedValue = useDebounce(text, 500);

  useEffect(() => {
    onChange && debouncedValue && onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row w-3/4 items-center gap-6">
        <input
          type="checkbox"
          onChange={() => toggleCheck && text && toggleCheck()}
          checked={isCompleted}
          className="w-8 h-8 text-blue-600 bg-gray-100 border-gray-300 rounded"
        />
        <input
          value={text}
          onChange={(e) => {
            setText(e?.target.value);
          }}
          contentEditable={editable}
          onClick={() => setEditable(true)}
          onBlur={() => setEditable(false)}
          disabled={isCompleted}
          className="outline-gray-300 p-4 w-full hover:bg-gray-100 rounded-md border border-gray-300"
        />
        <FaTrash
          onClick={() => onDelete && onDelete()}
          className="text-3xl text-red-700 active:text-gray-500"
        />
      </div>

      {!text && (
        <div className="ml-10 mt-2">
          <ValidationErrorMsg message={"Value cannot be empty"} />
        </div>
      )}
    </div>
  );
}

export default InlineEdit;
