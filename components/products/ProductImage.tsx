'use client';

import { useState } from 'react';
import { Package } from 'lucide-react';

interface ProductImageProps {
  src: string | null | undefined;
  alt: string;
  priority?: boolean;
  className?: string;
}

export default function ProductImage({ src, alt, priority, className = '' }: ProductImageProps) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return <Package size={48} className="text-ocean/30" />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      onError={() => setError(true)}
      className={`w-full h-full object-cover ${className}`}
    />
  );
}
