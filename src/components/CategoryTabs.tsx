import React, { useState } from "react";

interface CategoryTabsProps {
  fashionContent?: React.ReactNode;
  graphicContent?: React.ReactNode;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  fashionContent,
  graphicContent,
}) => {
  const [activeTab, setActiveTab] = useState("fashion");

  return (
    <div className="mx-auto my-8 h-[80vh] w-[90vw] overflow-hidden rounded-lg bg-white shadow-lg">
      {/* Browser Header */}
      <div className="flex flex-col gap-2 bg-gray-100 p-2">
        {/* Browser Controls */}
        <div className="flex gap-2 pl-2">
          <div className="h-3 w-3 cursor-pointer rounded-full bg-[#ff5f56]" />
          <div className="h-3 w-3 cursor-pointer rounded-full bg-[#ffbd2e]" />
          <div className="h-3 w-3 cursor-pointer rounded-full bg-[#27c93f]" />
        </div>

        {/* Browser Tabs */}
        <div className="flex gap-1 px-4">
          <button
            onClick={() => setActiveTab("fashion")}
            className={`rounded-t-md px-8 py-2 transition-colors ${activeTab === "fashion" ? "bg-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            Fashion
          </button>
          <button
            onClick={() => setActiveTab("graphic")}
            className={`rounded-t-md px-8 py-2 transition-colors ${activeTab === "graphic" ? "bg-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            Graphic
          </button>
        </div>
      </div>

      {/* Browser Content */}
      <div className="relative h-[calc(100%-5rem)]">
        <div
          className={`absolute h-full w-full overflow-y-auto p-8 transition-opacity duration-300 ${activeTab === "fashion" ? "visible opacity-100" : "invisible opacity-0"}`}
        >
          {/* {fashionContent} */}
        </div>
        <div
          className={`absolute h-full w-full overflow-y-auto p-8 transition-opacity duration-300 ${activeTab === "graphic" ? "visible opacity-100" : "invisible opacity-0"}`}
        >
          {/* {graphicContent} */}
        </div>
      </div>
    </div>
  );
};
