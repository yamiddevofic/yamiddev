interface ContentProps {
  children: React.ReactNode;
}

export default function Content({ children }: ContentProps) {
  return (
    <div className="max-w-7xl min-h-32 h-full mx-auto px-2 py-4 bg-gray-100 border border-gray-500 rounded-[0_0_22px_22px] break-all">
      {children}
    </div>
  );
}