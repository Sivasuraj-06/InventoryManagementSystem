import { useGetDashboardMetricsQuery } from "@/state/api";
import { TrendingDown, TrendingUp } from "lucide-react";
import React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/** USD → INR conversion rate */
const USD_TO_INR = 83;

const formatINRFromUSD = (usd: number) => {
  const inr = usd * USD_TO_INR;

  if (inr >= 1e7) return `₹${(inr / 1e7).toFixed(2)} Cr`;
  if (inr >= 1e5) return `₹${(inr / 1e5).toFixed(2)} L`;
  if (inr >= 1e3) return `₹${(inr / 1e3).toFixed(2)} K`;
  return `₹${inr.toLocaleString("en-IN")}`;
};

const CardPurchaseSummary = () => {
  const { data, isLoading } = useGetDashboardMetricsQuery();
  const purchaseData = data?.purchaseSummary || [];

  const lastDataPoint = purchaseData[purchaseData.length - 1] || null;
  const change = lastDataPoint?.changePercentage ?? 0;

  return (
    <div className="flex flex-col h-full row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1 bg-white shadow-md rounded-2xl overflow-hidden">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          {/* HEADER */}
          <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
              Purchase Summary
            </h2>
            <hr />
          </div>

          {/* BODY */}
          <div className="flex flex-col flex-grow">
            {/* SUMMARY */}
            <div className="mb-4 mt-7 px-7">
              <p className="text-xs text-gray-400">Purchased</p>
              <div className="flex items-center">
                <p className="text-2xl font-bold">
                  {lastDataPoint
                    ? formatINRFromUSD(lastDataPoint.totalPurchased)
                    : "₹0"}
                </p>

                {lastDataPoint && (
                  <p
                    className={`text-sm ${
                      change >= 0 ? "text-green-500" : "text-red-500"
                    } flex ml-3`}
                  >
                    {change >= 0 ? (
                      <TrendingUp className="w-5 h-5 mr-1" />
                    ) : (
                      <TrendingDown className="w-5 h-5 mr-1" />
                    )}
                    {Math.abs(change)}%
                  </p>
                )}
              </div>
            </div>

            {/* CHART */}
            <div className="flex-grow">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={purchaseData}
                  margin={{ top: 0, right: +20, left: -30, bottom: 0 }}
                >
                  <XAxis dataKey="date" tick={false} axisLine={false} />
                  <YAxis tickLine={false} tick={false} axisLine={false} />

                  <Tooltip
                    formatter={(value) =>
                      formatINRFromUSD((value as number) ?? 0)
                    }
                    labelFormatter={(label) => {
                      const date = new Date(label);
                      return date.toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      });
                    }}
                  />

                  <Area
                    type="linear"
                    dataKey="totalPurchased"
                    stroke="#8884d8"
                    fill="#8884d8"
                    dot={true}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CardPurchaseSummary;
