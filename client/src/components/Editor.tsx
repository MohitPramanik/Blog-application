// import { useEffect, useRef } from "react";
// import Quill from "quill";
// import "quill/dist/quill.snow.css";

// type EditorProps = {
//     onChange: (value: string) => void;
// };

// const Editor: React.FC<EditorProps> = ({ onChange }) => {
//     const editorRef = useRef<HTMLDivElement | null>(null);
//     const quillRef = useRef<Quill | null>(null);

//     useEffect(() => {
//         if (!editorRef.current || quillRef.current) return;
//         console.log("Quill initialized");

//         const quill = new Quill(editorRef.current, {
//             theme: "snow",
//             modules: {
//                 toolbar: [
//                     ["bold", "italic", "underline"],
//                     [{ list: "ordered" }, { list: "bullet" }],
//                     ["link", "image"],
//                 ],
//             },
//         });

//         quillRef.current = quill;

//         quill.on("text-change", () => {
//             onChange(quill.root.innerHTML);
//         });

//         return () => {
//             quill.off("text-change", () => {
//                 onChange(quill.root.innerHTML);
//             });
//         };
//     }, []);

//     return (
//         <div className="form-control">
//             <div ref={editorRef} />
//         </div>

//     );
// };

// export default Editor;

const Editor = () => {
  return (
    <div>
      {/* Feature to be implemented in future */}
    </div>
  )
}

export default Editor
