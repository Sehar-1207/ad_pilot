'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface TimelineData {
  name: string;
  spend: number;
  revenue: number;
}

interface AnalyticsChartsProps {
  timelineData?: TimelineData[];
}

const zeroData: TimelineData[] = [
  { name: 'Mon', spend: 0, revenue: 0 },
  { name: 'Tue', spend: 0, revenue: 0 },
  { name: 'Wed', spend: 0, revenue: 0 },
  { name: 'Thu', spend: 0, revenue: 0 },
  { name: 'Fri', spend: 0, revenue: 0 },
  { name: 'Sat', spend: 0, revenue: 0 },
  { name: 'Sun', spend: 0, revenue: 0 },
];

export function AnalyticsCharts({
  timelineData = [],
}: AnalyticsChartsProps) {
  const chartData =
    timelineData.length > 0 ? timelineData : zeroData;

  return (
    <div className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-color)] shadow-sm overflow-hidden transition-colors duration-300">
      <div className="p-6 border-b border-[var(--border-color)] flex items-center justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-[var(--text-primary)]">
            Revenue vs Spend
          </h2>

          <p className="text-xs text-[var(--text-secondary)] font-medium mt-1">
            Daily comparison over past 7 days
          </p>
        </div>

        <div className="flex items-center gap-5 text-xs font-bold text-[var(--text-secondary)]">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#2DD4BF]" />
            Revenue
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#3B82F6]" />
            Spend
          </div>
        </div>
      </div>

      <div className="h-[350px] p-5">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 10,
              right: 20,
              left: 10,
              bottom: 10,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border-color)"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: 'var(--text-secondary)',
                fontSize: 11,
                fontWeight: 600,
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: 'var(--text-secondary)',
                fontSize: 11,
                fontWeight: 600,
              }}
              tickFormatter={(value) => `$${value}`}
              domain={[0, 'auto']}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                fontSize: '12px',
              }}
              formatter={(value, name) => [
                `$${Number(value).toLocaleString()}`,
                name === 'revenue' ? 'Revenue' : 'Spend',
              ]}
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#2DD4BF"
              strokeWidth={3}
              dot={{
                r: 4,
                strokeWidth: 2,
              }}
              activeDot={{
                r: 6,
              }}
            />

            <Line
              type="monotone"
              dataKey="spend"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{
                r: 4,
                strokeWidth: 2,
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}