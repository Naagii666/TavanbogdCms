import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor = ({setValue}) => {
  const [reactQuillRef, setReactQuilRef] = useState();
  const [quillRef, setQuillRef] = useState();

  const attachQuillRefs = () => {
    if (typeof reactQuillRef?.getEditor !== 'function') return;
    setQuillRef(reactQuillRef?.getEditor());
  }

  useEffect(() => {
    attachQuillRefs();
  })

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["link", "image"],
        ["clean"],
        ["color"],
      ],
      // handlers: {
      //   image: imageHandlerFunction
      // }
    },
  };

  return (
    <>
      <ReactQuill
        ref={setReactQuilRef}
        theme="snow"
        onChange={() => setValue(quillRef.container.firstChild.innerHTML)}
        modules={modules}
      />
    </>
  );
};

export default TextEditor;
