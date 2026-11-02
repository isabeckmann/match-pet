export default function Tag({ children }: { children: string }) {
  return <span className="rounded-full bg-tag px-3 py-1 text-sm font-medium text-ink">{children}</span>;
}
