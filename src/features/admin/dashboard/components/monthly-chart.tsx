import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
    { month: 'Jan', value: 800000 },
    { month: 'Feb', value: 420000 },
    { month: 'Mar', value: 380000 },
    { month: 'Apr', value: 480000 },
    { month: 'May', value: 850000 },
    { month: 'Jun', value: 840000 },
    { month: 'Jul', value: 820000 },
    { month: 'Aug', value: 780000 },
    { month: 'Sep', value: 320000 },
    { month: 'Oct', value: 600000 },
    { month: 'Nov', value: 180000 },
    { month: 'Dec', value: 720000 }
];

export default function MonthlyChart() {
    return (
        <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 20, right: 10, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="8 8" stroke="#e5e7eb" />
                    <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#6b7280' }}
                    />
                    <YAxis
                        domain={[0, 1000000]}
                        ticks={[0, 200000, 400000, 600000, 800000, 1000000]}
                        tickFormatter={(value) => (value / 1000) + 'K'}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#6b7280' }}
                    />
                    <Line
                        type="linear"
                        dataKey="value"
                        stroke="#1f2937"
                        strokeWidth={2.5}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}