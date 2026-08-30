type HoldHintProps = {
  show: boolean;
};

export function HoldHint({ show }: HoldHintProps) {
  if (!show) return null;

  return (
    <p className="mt-3 text-[14px] leading-6 text-foreground motion-hold motion-hold-in">
      稳住
    </p>
  );
}
