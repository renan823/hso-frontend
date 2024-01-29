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
        <div>
            <div>
                <h2 className="text-2xl">Selecione um arquivo para editar/visualizar</h2>
                <div>
                    <select onChange={handleSelectFile}>
                        <option value="none">Escolher arquivo...</option>
                        {
                            files.map((file, index) => <option key={index} value={file}>{file}</option>)
                        }
                    </select>
                    <button onClick={handleShowDataframe}>Selecionar</button>
                </div>
            </div>
            <div>
                {
                    !dataframe ? 
                        <p>Selecione um arquivo</p>
                    :
                        <DataframeEditor data={dataframe}/>
                }
            </div>
        </div>
    )
}