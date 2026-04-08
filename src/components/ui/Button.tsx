export default function Button({
  children,
  href,
  className = "",
  variant = 'primary'
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
  variant?: 'primary' | 'secondary';
}) {
  const baseClasses = "inline-flex items-center justify-center font-semibold px-6 py-3 rounded-md transition-all";
  const variants = {
    primary: "bg-nex-green text-black hover:brightness-110",
    secondary: "border border-white/20 text-white hover:border-nex-green/60"
  };

  const isExternal = href.startsWith('http');

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
