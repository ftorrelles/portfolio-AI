export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-nex-green mb-3">
      {children}
    </p>
  );
}
