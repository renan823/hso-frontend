import useGet from "@/services/useGet";
import PageLoader from "./PageLoader";
import Chart from "react-apexcharts"

export default function UploadsChart () {
    const { data, isLoading, isError } = useGet("/api/files/count");

    if (isLoading || isError) {
        return (
            <PageLoader/>
        )
    }

    const files = data.files;
    const amount = data.amout;

    const labels = Object.keys(files);
    console.log(labels)
    console.log(labels.map((label) => files[label]))

    const options = {
        chart: {
            id: "envios",
            toolbar: false
        },
        xaxis: {
            categories: labels,
        },
        yaxis: {
            min: 0,
            stepSize: 1
        },
        colors: ["#7e22ce"]
    }

    const series = [{
        name: "envios",
        data: labels.map((label) => files[label])
    }]

    return (
        <div className="bg-white rounded-md">
            <div>
                <Chart type="area" width={700} options={options} series={series}/>
            </div>
        </div>
    )
}