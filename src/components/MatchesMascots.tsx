import { Cat, Dog } from "./DiscoverBackground";
import { HeartIcon } from "./icons";

export default function MatchesMascots({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`relative h-56 w-full max-w-md ${className}`}>
      <svg viewBox="0 0 400 120" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-28 w-full">
        <path d="M0 120V70C60 30 150 20 230 36S350 40 400 70V120Z" fill="var(--color-hill)" opacity=".55" />
      </svg>
      <Dog className="absolute bottom-3 left-[10%] w-44" />
      <Cat className="absolute bottom-3 right-[6%] w-40" />
      <HeartIcon size={34} className="absolute left-[44%] top-0 fill-primary text-primary" />
      <HeartIcon size={24} className="absolute right-[6%] top-6 fill-primary text-primary" />
    </div>
  );
}
