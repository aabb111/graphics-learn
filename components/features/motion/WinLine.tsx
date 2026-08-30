type WinLineProps = {
  children: string;
};

export function WinLine({ children }: WinLineProps) {
  return (
    <p className="motion-win-line text-[14px] leading-6 text-success">{children}</p>
  );
}
