import Cards from "../components/Dashboard/Cards.tsx";
import {useState} from "react";
import Chart from "../components/Dashboard/Chart.tsx";

function Dashboard(){
    const [incomeData] = useState<number[]>(
        Array.from({ length: 12 }, () => Math.floor(Math.random() * 20) + 5) // Dummy data
    );
    return(
        <>
            <Cards/>
            <div className="flex items-start space-x-4 mt-12">
                <div className="flex-1 mr-4 pr-4  mt-12">
                    <Chart incomeData={incomeData}/>
                </div>
                <div className="w-1/2 bg-white rounded-lg shadow-md pr-4 pl-4 mt-12">
                    <h5 className="text-center text-lg font-semibold mb-4">Calendar</h5>
                    <div className="h-64 border rounded-lg flex items-center justify-center">
                        Calendar Component
                    </div>
                </div>
            </div>


        </>
    )
}

export default Dashboard;