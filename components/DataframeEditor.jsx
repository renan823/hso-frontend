import { post } from "@/services/api";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "./Modal";
import { Plus, X } from "lucide-react";

function ApplyFilterModal ({ open, onClose, setDataframe, filename }) {

    const initialFields = { target: "", value: "" }
    const [fields, setFields] = useState(initialFields);

    const [filters, setFilters] = useState({});

    const handleAddFilter = () => {
        if (!filters.hasOwnProperty(fields.target) && fields.target.trim() !== "") {
            setFilters({
                ...filters,
                [fields.target]: fields.value
            })
        }

        setFields(initialFields);
    }

    const handleRemoveFilter = (target) => {
        const filtersCopy = { ...filters };

        delete filtersCopy[target];

        setFilters(filtersCopy);
    }

    const handleChangeTarget = (event) => {
        setFields({
            ...fields,
            target: event.target.value.trim().toLowerCase()
        })
    }

    const handleChangeValue = (event) => {
        setFields({
            ...fields,
            value: event.target.value.trim().toLowerCase()
        })
    }

    const handleClose = () => {
        setFields(initialFields);
        setFilters({});
        onClose();
    }

    const handleApply = async () => {
        if (Object.keys(filters).length !== 0) {

            const payload = { filename, filter: filters };

            const { data, status } = await post(`/api/dataframes/filter`, payload);

            console.log(data)

            if (status === 200) {
                setDataframe(data.dataframe);
            } else {
                toast.error(data.error);
            }

            handleClose()
        }
    }

    return (
        <Modal title="Aplicar filtros" closeModal={handleClose} isOpen={open}>
            <h2 className="font-bold">Escolha a palavra para ser substituída e seu substituo</h2>
            <div className="my-4">
                <div className="flex justify-center flex-col items-center">
                    <div className="bg-purple-600 rounded-md py-4 px-5 shadow-md shadow-violet-800">
                        <div className="flex gap-5 items-center ">
                            <input placeholder="Palavra alvo..." className="h-9 p-2 font-bold rounded-md" type="text" onChange={handleChangeTarget} value={fields.target}/>
                            <input placeholder="Substituto..." className="h-9 p-2 font-bold rounded-md" type="text" onChange={handleChangeValue} value={fields.value}/>
                            <div className="bg-violet-900 rounded-sm p-1" onClick={handleAddFilter}>
                                <Plus color="white"/>
                            </div>
                        </div>
                        <h2 className="font-bold mt-1 text-white">*Uma vez aplicado, um filtro NÃO PODE ser desfeito</h2>
                    </div>
                    <div className="h-52 overflow-y-auto p-3">
                        <h2 className="font-bold">Filtros:</h2>
                        <ul className="m-2">
                            {
                                Object.keys(filters).map((item, index) => {
                                    return (
                                        <li key={index} className="flex items-center py-2 px-4 gap-4 ">
                                            <span className="bg-purple-600 py-1 px-3 rounded-sm text-white font-bold mx-3">Alvo:</span>
                                            <p className="font-bold">{item}</p>
                                            <span className="bg-purple-600 py-1 px-3 rounded-sm text-white font-bold mx-3">Substituto:</span>
                                            <p className="font-bold">{filters[item]}</p>
                                            <div className="bg-violet-900 rounded-sm p-1" onClick={() => handleRemoveFilter(item)}>
                                                <X color="white"/>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className="flex justify-end px-4">
                    <button className="bg-violet-600 py-2 px-5 text-white font-bold text-lg rounded-md shadow-md shadow-violet-900" onClick={handleApply}>Aplicar</button>
                </div>
            </div>
        </Modal>
    )
}

export default function DataframeEditor ({ data }) {

    const [isOpen, setOpen] = useState(false);
    
    const closeModal = () => setOpen(false);

    let { filename, rows } = data;

    const [dataframe, setDataframe] = useState(data.dataframe);
    const [column, setColumn] = useState(null);
    const [header, setHeader] = useState(dataframe[0]);
    const [columns, setColumns] = useState(Object.keys(header));

    const handleInputChange = (event) => {
        setColumn(event.target.value);
    }

    const handleDeleteColumn = async () => {
        if (!columns.includes(column)) {
            toast.error("Essa coluna não existe");
            return
        }

        const payload = { filename, columns: [column] };

        const { data, status } = await post("/api/dataframes/alter", payload);

        if (status === 200) {
            setDataframe(data.dataframe);
            toast.success("Dataframe alterado");
        } else {
            toast.error(data.error);
        }
    }

    return (
        <div>
            <div className="flex justify-between px-7 my-5 items-center ">
                <div className="flex gap-20">
                    <div>
                        <h2 className="font-bold text-xl">Arquivo: {filename}</h2>
                        <h2 className="font-bold text-xl">Amostra com {dataframe.length} linhas (total de {rows})</h2>
                    </div>
                    <div className="flex justify-center">
                        <button onClick={() => setOpen(true)} className="font-bold text-lg py-2 px-4 rounded-md border-2 border-violet-800 shadow-md shadow-purple-500">Aplicar filtros?</button>
                        <ApplyFilterModal open={isOpen} onClose={closeModal} setDataframe={setDataframe} filename={filename}/>
                    </div>
                </div>
                <div className="flex items-center">
                    <h2 className="text-xl font-bold m-4">Exclua colunas:</h2>
                    <div className="flex justify-between py-3 gap-10 px-4 bg-violet-600 items-center rounded-md shadow-md shadow-violet-800">
                        <div>
                            <select className="text-white text-lg bg-violet-600 font-bold" onChange={handleInputChange}>
                                <option className="font-bold text-lg" value="">Escolher coluna</option>
                                {
                                    columns.map((column, index) => <option className="font-bold text-lg" key={index} value={column}>{column}</option>)
                                }
                            </select>
                        </div>
                        <button className="bg-white p-2  text-lg font-bold rounded-sm" onClick={handleDeleteColumn}>Excluir</button>
                    </div>
                </div>
            </div>
            <div className="flex justify-center p-4 bg-white">
                <table className="table p-3">
                    <thead>
                        <tr className="p-3 bg-violet-800">
                            {
                                columns.map((item, index) => <th className="text-xl text-white font-bold p-3" key={index}>{item}</th>)
                            }
                        </tr>
                    </thead>
                    <tbody className="p-4">
                        {
                            dataframe.map((data, index) => {
                                return (
                                    <tr key={index} className={`${index !== 0 ? "border-t-2 border-violet-700": "" } text-lg font-bold p-2`}>
                                        {
                                            columns.map((item, index) => <td className="text-center p-3 m-4 w-fit h-fit" key={index}>{data[item]}</td>)
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}