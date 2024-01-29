import { post } from "@/services/api";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function DataframeEditor ({ data }) {

    let { filename, rows } = data;

    const [dataframe, setDataframe] = useState(data.dataframe);
    const [column, setColumn] = useState(null);

    const header = dataframe[0];

    const columns = Object.keys(header);

    const handleInputChange = (event) => {
        setColumn(event.target.value);
    }

    const handleDeleteColumn = async () => {
        if (!columns.includes(column)) {
            toast.error("Essa coluna não existe");
            return
        }

        const payload = { filename, columns: [column] };

        const headers = {'Content-Type': 'application/json', 'Accept': '*/*'}

        const { data, status } = await post("/api/dataframes/alter", payload, headers);

        if (status === 200) {
            setDataframe(data.dataframe);
            toast.success("Dataframe alterado");
        } else {
            toast.error(data.error);
        }
    }

    return (
        <div>
            <div className="flex justify-between px-7 my-5">
                <div>
                    <h2>Arquivo: {filename}</h2>
                    <h3>Amostra com {dataframe.length} linhas (total de {rows})</h3>
                </div>
                <div>
                    <div className="flex justify-between">
                        <div>
                            <p>Digite o nome de uma coluna para excluí-la</p>
                            <select onChange={handleInputChange}>
                                <option value="">Escolher coluna</option>
                                {
                                    columns.map((column, index) => <option key={index} value={column}>{column}</option>)
                                }
                            </select>
                        </div>
                        <button onClick={handleDeleteColumn}>Aplicar</button>
                    </div>
                </div>
            </div>
            <div className="flex justify-center p-4 bg-white">
                <table className="table bg-slate-600 p-3">
                    <thead className="p-4 bg-slate-600">
                        <tr>
                            {
                                columns.map((item, index) => <th key={index}>{item}</th>)
                            }
                        </tr>
                    </thead>
                    <tbody className="p-4 bg-slate-600">
                        {
                            dataframe.map((data, index) => {
                                return (
                                    <tr key={index} className={index % 2 === 0 ? "bg-black" : "bg-red-500"}>
                                        {
                                            columns.map((item, index) => <td className=" p-3 m-4 w-fit h-fit" key={index}>{data[item]}</td>)
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