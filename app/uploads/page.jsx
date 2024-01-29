"use client"

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
        <div>
            <form onSubmit={handleSubmit}>
                <label>Escolha o arquivo para envio</label>
                { isLoading || isError ? <p></p> : <p>Extensões permitidas: {data.join(" ")}</p>}
                <input type="file" onChange={handleFileChange} ref={fileRef}/>
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}
