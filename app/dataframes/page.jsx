"use client"

import DataframeEditor from "@/components/DataframeEditor";
import PageLoader from "@/components/PageLoader";
import { get } from "@/services/api";
import useGet from "@/services/useGet"
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Dataframes () {
    const { data, isLoading } = useGet("/api/files/");

    const [selectedFile, setSelectedFile] = useState(null);

    const [dataframe, setDataframe] = useState(null);

    let files = [];

    if (isLoading) {
        return <PageLoader/>
    }

    if (!isLoading) {
        files = data.files;
    }

    const handleSelectFile = (event) => {
        let value = event.target.value;

        if (value !== "none") {
            setSelectedFile(value)
        }
    }

    const handleShowDataframe = async () => {
        setDataframe(null);

        if (selectedFile) {
            const { data, status } = await get(`/api/dataframes/${selectedFile}`);

            if (status === 200) {
                setDataframe(data);
            } else {
                toast.error(data.error);
            }
        }
    }

    return (
        <div className="flex flex-col p-5">
            <div className="flex mx-10 border-2 border-violet-800 p-4 rounded-md my-4 items-center justify-around shadow-md shadow-purple-500">
                <h2 className="text-2xl font-bold">Selecione um arquivo para editar/visualizar:</h2>
                <div className="flex gap-14 bg-purple-500 w-fit px-4 py-3 rounded-md my-1 shadow-md shadow-purple-700">
                    <select onChange={handleSelectFile} className="text-white text-lg bg-purple-500 font-bold">
                        <option value="none" className="font-bold text-lg">Escolher arquivo...</option>
                        {
                            files.map((file, index) => <option className="font-bold text-lg" key={index} value={file}>{file}</option>)
                        }
                    </select>
                    <button className="bg-purple-700 p-2 text-white text-lg font-bold rounded-sm" onClick={handleShowDataframe}>Selecionar</button>
                </div>
            </div>
            <div className="flex mx-10 justify-center items-center my-4 border-2 border-violet-800 p-4 rounded-md shadow-md shadow-purple-500">
                {
                    !dataframe ? 
                        <h1 className="text-lg font-bold">Escolha um arquivo...</h1>
                    :
                        <DataframeEditor data={dataframe}/>
                }
            </div>
        </div>
    )
}