import { useDropzone } from "react-dropzone";
import { primaryColor } from "../lib/constants.js";
import Image from "next/image";

const Dropzone = ({ onDrop, accept, hash }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
  });
  const bgImage = hash ? `https://ipfs.io/ipfs/${hash}` : "";
  console.log(bgImage);
  return (
    <div
      className={`dropzone-div text-xl cursor-pointer w-[200px] h-[200px] rounded-full  border-2 border-green-dark  ${
        isDragActive ? "bg-green-light" : ""
      }`}
      {...getRootProps()}
    >
      {bgImage ? (
        <img
          src={bgImage}
          alt=""
          width={200}
          height={200}
          className="w-full h-full object-cover  rounded-full "
        />
      ) : (
        <div className="text-center relative top-1/3">
          {isDragActive ? (
            <p className="dropzone-content ">
              {bgImage ? "Release to drop the files here" : ""}
            </p>
          ) : (
            <p className="dropzone-content">Drag & drop some files here</p>
          )}
        </div>
      )}
      <input className="dropzone-input" {...getInputProps()} />
    </div>
  );
};

export default Dropzone;
