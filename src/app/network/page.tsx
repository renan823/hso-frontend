"use client"

import FileSelector from "@/components/FileSelector";
import GraphContainer from "@/components/Graph/GraphContainer";
import Loader from "@/components/Loader";
import { Modal } from "@/components/Modal";
import { NetworkEditor } from "@/components/NetworkEditor";
import api from "@/services/api";
import { SerializedGraph } from "graphology-types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Network () {

    const [selectedFile, setSelectedfile] = useState("");
    const [network, setNetwork] = useState<SerializedGraph>();
    const [loading, setLoading] = useState(false);
    const [isOpen, setOpen] = useState<boolean>(false);

    useEffect(() => {
        async function fetch () {
            try {
                setLoading(true);

                const response = await api.post("/network/new", { filename: selectedFile });

                setNetwork(response.data.network);
                setOpen(true);
            } catch (error: any) {
                toast.error("Algo deu errado");
            } finally {
                setLoading(false);
            }
        }

        if (selectedFile && selectedFile.trim().length !== 0) {
            fetch();
        }
    }, [selectedFile])

    if (loading) {
        return (
            <div>
                <h2 className="text-center text-white text-2xl font-bold">A rede está sendo gerada</h2>
                <h2 className="text-center text-white text-2xl font-bold">Isso pode demorar um pouquinho...</h2>
                <Loader/>
            </div>
        )
    }

    return (
        <NetworkEditor.Layout.Body>
            <NetworkEditor.Layout.Header>
                <div className="w-full">
                    <FileSelector setSelectedFile={setSelectedfile}/>
                    <h2 className="text-white text-lg font-bold px-4">Ao selecionar um arquivo, a rede será gerada, juntamente com as métricas</h2>
                </div>
            </NetworkEditor.Layout.Header>
            <Modal.Root isOpen={isOpen}>
                <Modal.Header title="Explorar rede" handleClose={() => setOpen(false)}/>
                <Modal.Content>
                    <GraphContainer data={network}/>
                </Modal.Content>
            </Modal.Root>
        </NetworkEditor.Layout.Body>
    )
}