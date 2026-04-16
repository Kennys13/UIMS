"use client";

import { Bar, BarChart, CartesianGrid, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function AttendanceOverview({ records }: { records: Array<{ subject: string; percentage: number }> }) {
  const overall = Math.round(records.reduce((sum, item) => sum + item.percentage, 0) / Math.max(records.length, 1));
  const donut = [
    { name: "Present", value: overall },
    { name: "Gap", value: 100 - overall }
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="card-surface h-[320px] p-5">
        <p className="text-sm font-semibold text-slate-900">Subject-wise Attendance</p>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={records}>
              <CartesianGrid strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="subject" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="percentage" fill="#0f5f54" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="card-surface flex flex-col items-center justify-center p-5">
        <p className="text-sm font-semibold text-slate-900">Overall Attendance</p>
        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={donut} dataKey="value" innerRadius={58} outerRadius={84} fill="#e08e2f" stroke="none" />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <p className="-mt-20 text-4xl font-semibold text-slate-950">{overall}%</p>
      </div>
    </div>
  );
}
