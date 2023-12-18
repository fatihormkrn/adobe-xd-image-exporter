"use client";

import {useRef,useState} from "react";
export default function Home() {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);

  function handleChange(e){
    e.preventDefault();
    console.log("File has been added");

    if (e.target.files && e.target.files[0]){
      console.log(e.target.files);

      for (let i = 0;i < e.target.files.length; i++){
        setFiles((prevState) => [...prevState,e.target.files[i]]);
      }
    }
  }

  function handleSubmitFile(e){
    if (files.length === 0){

    }else{

    }
  }

  function handleDrop(e){
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]){
      for (let i = 0; i < e.dataTransfer.files.length; i++){
        setFiles((prevState) => [...prevState,e.dataTransfer.files[i]]);
      }
    }
  }

  function handleDragLeave(e){
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function handleDragEnter(e){
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function removeFile(fileName,idx){
    const newArr = [...files];
    newArr.splice(idx,1);
    setFiles([]);
    setFiles(newArr);
  }

  function openFileExplorer() {
    inputRef.current.value = "";
    inputRef.current.click();
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-300">
    <div className="max-w-[1300px] w-full bg-primary h-[90vh] w-100 flex items-center p-[135px]"> 
        <div className='wrapper w-full'>
            <h1 className='text-7xl text-title font-medium'><span className="font-bold">Adobe XD</span><br></br>Image Exporter</h1>
            <p className="text-white mt-[20px] text-[32px]">Extract all images used in Adobe XD files.</p>
            <form
        className={`${
          dragActive ? "bg-blue-400" : "bg-secondary"
        }  p-4 w-full rounded-lg border-dashed border-2 border-white  h-[400px] text-center flex flex-col items-center justify-center mt-[70px]`}
        onDragEnter={handleDragEnter}
        onSubmit={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
      >
        <input
          placeholder="fileInput"
          className="hidden"
          ref={inputRef}
          type="file"
          onChange={handleChange}
          accept=".xd"
        />

        <p className='text-white'>
          Dosyaları sürükleyip bırakın veya {" "}
          <span
            className="font-bold text-blue-600 cursor-pointer"
            onClick={openFileExplorer}
          >
            <u className='text-white'>Seçin</u>
          </span>
        </p>

        <div className="flex flex-col items-center p-3">
          {files.map((file, idx) => (
            <div key={idx} className="flex flex-row space-x-5">
              <span className='text-white'>{file.name}</span>
              <span
                className="text-white cursor-pointer"
                onClick={() => removeFile(file.name, idx)}>
                Kaldır
              </span>
            </div>
          ))}
        </div>
      </form>
        </div>
    </div>
    </main>
  )
 }