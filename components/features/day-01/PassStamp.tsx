type PassStampProps = {
  mark?: string;
};

export function PassStamp({ mark = "1" }: PassStampProps) {
  return (
    <div
      className="motion-pass-stamp flex size-[56px] items-center justify-center rounded-full border border-foreground text-[22px] leading-none text-foreground"
      aria-hidden
    >
      {mark}
    </div>
  );
}
