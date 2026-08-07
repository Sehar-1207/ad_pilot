'use client';

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const timelineData = [
    { name: 'Mon', spend: 400, revenue: 1000 },
    { name: 'Tue', spend: 300, revenue: 800 },
    { name: 'Wed', spend: 550, revenue: 1500 },
    { name: 'Thu', spend: 450, revenue: 1200 },
    { name: 'Fri', spend: 600, revenue: 1800 },
    { name: 'Sat', spend: 750, revenue: 2400 },
    { name: 'Sun', spend: 650, revenue: 2100 },
];


export function AnalyticsCharts() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <div className="lg:col-span-2 bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-color)] shadow-sm p-6 transition-colors duration-300">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Revenue vs Spend</h2>
                        <p className="text-xs text-[var(--text-secondary)] font-medium">Daily comparison over past 7 days</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[var(--brand-teal)]" />
                            <span className="text-xs font-bold text-[var(--text-secondary)]">Revenue</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[var(--brand-blue)]" />
                            <span className="text-xs font-bold text-[var(--text-secondary)]">Spend</span>
                        </div>
                    </div>
                </div>

                <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={timelineData} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} tickFormatter={(val) => `$${val}`} />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)', borderRadius: '0.75rem', color: 'var(--text-primary)' }}
                            />
                            <Line type="monotone" dataKey="revenue" stroke="var(--brand-teal)" strokeWidth={3} dot={{ r: 4, fill: 'var(--brand-teal)' }} />
                            <Line type="monotone" dataKey="spend" stroke="var(--brand-blue)" strokeWidth={3} dot={{ r: 4, fill: 'var(--brand-blue)' }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}