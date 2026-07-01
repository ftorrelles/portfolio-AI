'use client';
import { useState, type ReactNode } from 'react';
import Image from 'next/image';

interface Props {
  slug: string;
  screenSlug: string;
  image: string;
  label: string;
  mockup?: ReactNode | null;
}

// Nex-Dark styled device/browser-chrome panel. Renders a hand-coded mockup
// of the real screen when provided, otherwise tries the real screenshot
// asset, falling back to a dashed placeholder (no broken-image icon) if
// neither exists.
export default function DeviceFrame({ slug, screenSlug, image, label, mockup }: Props) {
  const [imageFailed, setImageFailed] = useState(false);
  const src = `/case-studies/${slug}/${image}`;

  return (
    <div className="bg-nex-dark border border-nex-green/15 rounded-xl shadow-[0_0_40px_rgba(34,181,97,0.12)] overflow-hidden">
      {mockup ? (
        <div className="w-full overflow-hidden">{mockup}</div>
      ) : (
        <>
          {/* Browser chrome bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
            <span className="w-2.5 h-2.5 rounded-full bg-nex-green/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-nex-green/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-nex-green/20" />
            <span className="ml-3 text-xs text-nex-grey truncate">{label}</span>
          </div>

          {/* Screen content */}
          <div className="relative aspect-video w-full bg-nex-black/60">
            {!imageFailed ? (
              <Image
                key={`${slug}-${screenSlug}`}
                src={src}
                alt={label}
                fill
                sizes="(max-width: 768px) 100vw, 640px"
                className="object-cover"
                onError={() => setImageFailed(true)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center border-2 border-dashed border-nex-green/20 m-3 rounded-lg">
                <span className="text-nex-grey text-sm font-medium text-center px-4">{label}</span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
