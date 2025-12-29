import React from "react";

const StatsCard = ({ title, value, subtitle, icon: Icon, trend }) => {
  return (
    <div className="
      bg-zinc-900 rounded-2xl p-6
      border border-yellow-300/20
      hover:border-yellow-300/40
      hover:-translate-y-1
      hover:shadow-yellow-300/20
      transition-all duration-300
    ">
      <div className="flex items-start justify-between">
        {/* ICON */}
        <div className="p-3 rounded-xl bg-yellow-300/10">
          <Icon className="w-6 h-6 text-yellow-300" />
        </div>

        {/* TREND */}
        {trend && (
          <span
            className={`text-sm font-semibold ${
              trend.isPositive ? "text-green-400" : "text-red-400"
            }`}
          >
            {trend.isPositive ? "+" : "-"}
            {Math.abs(trend.value)}%
          </span>
        )}
      </div>

      <div className="mt-4">
        <p className="text-gray-400 text-sm">{title}</p>

        <p className="text-3xl font-extrabold mt-1 text-white">
          {value}
        </p>

        {subtitle && (
          <p className="text-gray-400 text-sm mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
