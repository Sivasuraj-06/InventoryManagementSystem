import { LucideIcon } from "lucide-react";
import React from "react";

type StatDetail = {
  title: string;
  amount: number; // USD value
  changePercentage: number;
  IconComponent: LucideIcon;
};

type StatCardProps = {
  title: string;
  primaryIcon: JSX.Element;
  details?: StatDetail[]; // ✅ optional to avoid crash
  dateRange: string;
};

/** USD → INR conversion rate (hard-coded) */
const USD_TO_INR = 83;

const formatINRFromUSD = (usd: number) => {
  const inr = usd * USD_TO_INR;

  if (inr >= 1e7) return `₹${(inr / 1e7).toFixed(2)} Cr`;
  if (inr >= 1e5) return `₹${(inr / 1e5).toFixed(2)} L`;
  return `₹${inr.toLocaleString("en-IN")}`;
};

const StatCard = ({
  title,
  primaryIcon,
  details = [], // ✅ DEFAULT VALUE (FIXES ERROR)
  dateRange,
}: StatCardProps) => {
  const formatPercentage = (value: number) => {
    const sign = value >= 0 ? "+" : "";
    return `${sign}${value.toFixed()}%`;
  };

  const getChangeColor = (value: number) =>
    value >= 0 ? "text-green-500" : "text-red-500";

  return (
    <div className="md:row-span-1 xl:row-span-2 bg-white col-span-1 shadow-md rounded-2xl flex flex-col justify-between">
      {/* HEADER */}
      <div>
        <div className="flex justify-between items-center mb-2 px-5 pt-4">
          <h2 className="font-semibold text-lg text-gray-700">{title}</h2>
          <span className="text-xs text-gray-400">{dateRange}</span>
        </div>
        <hr />
      </div>

      {/* BODY */}
      <div className="flex mb-6 items-center justify-around gap-4 px-5">
        <div className="rounded-full p-5 bg-blue-50 border-sky-300 border-[1px]">
          {primaryIcon}
        </div>

        <div className="flex-1">
          {details.length === 0 ? (
            <p className="text-sm text-gray-400 text-center">
              No data available
            </p>
          ) : (
            details.map((detail, index) => (
              <React.Fragment key={index}>
                <div className="flex items-center justify-between my-4">
                  <span className="text-gray-500">{detail.title}</span>

                  <span className="font-bold text-gray-800">
                    {formatINRFromUSD(detail.amount)}
                  </span>

                  <div className="flex items-center">
                    <detail.IconComponent
                      className={`w-4 h-4 mr-1 ${getChangeColor(
                        detail.changePercentage
                      )}`}
                    />
                    <span
                      className={`font-medium ${getChangeColor(
                        detail.changePercentage
                      )}`}
                    >
                      {formatPercentage(detail.changePercentage)}
                    </span>
                  </div>
                </div>

                {index < details.length - 1 && <hr />}
              </React.Fragment>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
