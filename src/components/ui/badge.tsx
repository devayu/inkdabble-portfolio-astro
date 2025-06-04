export const Badge = ({ children }: any) => {
  return (
    <div className="flex items-center justify-center rounded-full border-[1px] border-[#1be9c2] p-2">
      <p className="text-xs font-semibold text-[#1be9c2]">{children}</p>
    </div>
  );
};
