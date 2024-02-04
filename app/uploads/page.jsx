"use client"

import UploadsChart from "@/components/UploadsChart";
import { postFile } from "@/services/api";
import useGet from "@/services/useGet";
import { useRef, useState } from "react"
import { toast } from "react-hot-toast";

export default function Uploads () {

    const [file, setFile] = useState(null);

    const fileRef = useRef();

    let extensions = [];

    const { data, isLoading, isError } = useGet("/api/files/extensions");

    if (!isLoading) {
        extensions = data;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file) {
            toast.error("Nenhum arquivo enviado");
            return;
        }

        if (!extensions.includes(file.name.split(".").pop())) {
            toast.error("Extensão inválida");
            clearField();
            return;
        } 

        const payload = new FormData();

        payload.append("file", file);

        const { data, status } = await postFile("/api/files/upload", payload);

        if (status === 201) {
            toast.success(data.message);
        } else {
            toast.error(data.error);
        }

        clearField();
    }

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    }

    const clearField = () => {
        fileRef.current.value = "";
    }

    return (
        <div className="flex justify-center mt-auto items-center m-10 gap-5">
            <div className="m-10">
                <div className="flex shadow-md bg-purple-600 shadow-violet-600 rounded-md">
                    <div className="flex flex-colpy-2 px-10 justify-center items-center rounded-lg">
                        <form className="flex flex-col p-2" onSubmit={handleSubmit}>
                            <div>
                                <h1 className="text-white text-2xl my-3 font-bold">Upload de arquivos</h1>
                                <div className="my-5 p-2">
                                    <input className="font-bold" type="file" onChange={handleFileChange} ref={fileRef}/>
                                    { isLoading || isError ? <p></p> : <p className="text-white font-bold">Extensões permitidas: {data.join(" ")}</p>}
                                </div>
                            </div>
                            <div className="flex justify-center m-4 items-center">
                                <button className="bg-white px-8 text-lg py-2 h-fit rounded-md font-bold" type="submit">Enviar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="m-10">
                <div className="flex flex-col w-fit bg-violet-500 shadow-md shadow-violet-700 py-4 px-10 justify-center rounded-md">
                    <h1 className="text-white font-bold text-2xl">Acompanhe o envio de arquivos</h1>
                    <UploadsChart/>
                </div>
            </div>
        </div>
    )
}