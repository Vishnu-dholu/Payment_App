import React from "react";

export function Card({
  title,
  children,
  className,
}: {
  title: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}): JSX.Element {
  const cardClasses = `border border-gray-300 p-6 bg-white rounded-xl bg-[#ededed] shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out ${className}`;
  return (
    <div className={cardClasses}>
      <h1 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-4 mb-4">
        {title}
      </h1>
      <div className="text-gray-700">{children}</div>
    </div>
  );
}
