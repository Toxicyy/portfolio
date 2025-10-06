import { createContext, useContext, useState } from "react";

interface TabsProps {
  children: React.ReactNode;
  defaultValue?: string;
  className?: string;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  children: React.ReactNode;
  value: string;
  className?: string;
}

interface TabsContentProps {
  children: React.ReactNode;
  value: string;
  className?: string;
}

const TabsContext = createContext<{
  activeTab: string;
  setActiveTab: (value: string) => void;
}>({
  activeTab: "",
  setActiveTab: () => {},
});

export const Tabs: React.FC<TabsProps> = ({
  children,
  defaultValue = "",
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList: React.FC<TabsListProps> = ({
  children,
  className = "",
}) => (
  <div
    className={`flex gap-2 bg-black/20 backdrop-blur-md rounded-full p-2 border border-purple-500/20 ${className}`}
  >
    {children}
  </div>
);

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  children,
  value,
  className = "",
}) => {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`rounded-full px-6 py-2 transition-all duration-300 ${
        isActive
          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
          : "text-gray-300 hover:text-white hover:bg-purple-500/20"
      } ${className}`}
    >
      {children}
    </button>
  );
};

export const TabsContent: React.FC<TabsContentProps> = ({
  children,
  value,
  className = "",
}) => {
  const { activeTab } = useContext(TabsContext);

  if (activeTab !== value) return null;

  return <div className={className}>{children}</div>;
};
