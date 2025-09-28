import {PieChart, Pie, Cell, ResponsiveContainer} from "recharts";

const data = [
    {name: "Nike", value: 28, color: "#22c55e"},
    {name: "Adidas", value: 24, color: "#06b6d4"},
    {name: "Zara", value: 18, color: "#3b82f6"},
    {name: "H&M", value: 15, color: "#ef4444"},
    {name: "Uniqlo", value: 10, color: "#f97316"},
    {name: "Levi's", value: 5, color: "#84cc16"},
];

export default function ClothingBrandsPieChart() {
    return (
        <div className="flex flex-col items-center">
            {/* Pie Chart */}
            <div className="h-64 mb-6 w-full max-w-xs">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={2}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color}/>
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-y-2 gap-x-6 w-full">
                {data.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div
                            className="w-3 h-3 rounded-full flex-shrink-0"
                            style={{backgroundColor: item.color}}
                        />
                        <span className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                {item.name}
            </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
