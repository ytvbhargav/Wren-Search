import WrenMark from "./WrenMark";

type Props = {
  bodyColor?: string;
  textColor?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: { mark: "h-7 w-auto", text: "text-base" },
  md: { mark: "h-10 w-auto", text: "text-xl" },
  lg: { mark: "h-16 w-auto", text: "text-3xl" },
};

export default function WrenLockup({
  bodyColor,
  textColor = "currentColor",
  size = "md",
  className,
}: Props) {
  const s = sizes[size];
  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`}>
      <WrenMark bodyColor={bodyColor} className={s.mark} />
      <span
        className={`font-bold ${s.text}`}
        style={{ color: textColor, letterSpacing: "0.18em" }}
      >
        WREN&nbsp;SEARCH
      </span>
    </div>
  );
}
