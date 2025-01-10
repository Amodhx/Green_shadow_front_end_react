import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from "chart.js";
import {useRef} from "react";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

function Chart({ incomeData }: { incomeData: number[] }) {
    const chartRef = useRef(null);

    const data = {
        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sept",
            "Oct",
            "Nov",
            "Dec",
        ],
        datasets: [
            {
                label: "Crops in Season",
                data: incomeData,
                borderColor: "#66b0ff",
                borderWidth: 3,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top" as const,
            },
        },
    };
    return (
        <div className="h-fit card mx-1 col-md-8 rounded-lg shadow-md relative top-4 left-4">
            <div className="card-body p-4">
                <h5 className="text-center text-lg font-semibold mb-4">Monthly Crops of Seasons</h5>
                <div className="w-full max-w-lg mx-auto">
                    <Line ref={chartRef} data={data} options={options} />
                </div>
            </div>
        </div>
    );
}

export default Chart;
