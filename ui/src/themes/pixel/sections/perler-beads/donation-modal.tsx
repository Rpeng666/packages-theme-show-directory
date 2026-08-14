'use client';

import * as React from 'react';

export interface PerlerDonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** 注入图片渲染（app 用 next/image；package 无 Next 依赖） */
  ImageComponent?: React.ComponentType<{
    src: string;
    alt: string;
    fill?: boolean;
    className?: string;
  }>;
}

/**
 * Perler-beads donation modal — pixel retro chrome. Pure presentation; the
 * app injects the image renderer (next/image).
 */
export function DonationModal({ isOpen, onClose, ImageComponent }: PerlerDonationModalProps) {
  if (!isOpen) return null;

  const Img = (ImageComponent ?? defaultImage) as React.ComponentType<{
    src: string;
    alt: string;
    fill?: boolean;
    className?: string;
  }>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="max-h-[90vh] w-[calc(100vw-2rem)] overflow-y-auto border-2 border-foreground/15 bg-background pxl-corner-md shadow-2xl sm:w-full md:max-w-md">
        <div className="p-3 sm:p-6">
          <div className="mb-3 flex items-center justify-between sm:mb-5">
            <h3 className="flex items-center font-serif text-lg italic text-retro-pink sm:text-xl">
              <svg className="mr-2 size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M18 8h1a2 2 0 0 1 2 2v1c0 1.1-.9 2-2 2h-1" fill="#f9a8d4" />
                <path d="M6 8h12v9a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V8z" fill="#f9a8d4" />
                <path d="M6 8V7a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v1" fill="#f472b6" />
                <path d="M12 16v-4" stroke="#7d2a5a" />
              </svg>
              Buy Me A Milk Tea
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-muted-foreground/70 transition-colors duration-200 hover:text-foreground"
              aria-label="关闭"
            >
              <svg className="size-5 sm:size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="text-center">
            <p className="mb-3 text-sm text-muted-foreground sm:text-base">
              开源项目是把作者和用户紧紧联系在一起的社群，如果您希望这个项目继续发展，可以请作者喝一杯奶茶。
            </p>
            <p className="mb-4 text-sm text-muted-foreground sm:mb-6 sm:text-base">
              您的支持是作者把项目继续下去的动力。
            </p>
            <div className="mb-4 flex justify-center sm:mb-5">
              <div className="relative size-40 p-1 bg-retro-surface/40 pxl-corner-sm shadow-md sm:size-48 md:size-56 sm:p-2">
                <Img src="/donation-qr.jpg" alt="赞赏码" fill className="object-contain p-1 sm:p-2" />
              </div>
            </div>
            <p className="inline-block rounded-full bg-retro-surface/30 px-3 py-1.5 text-xs text-muted-foreground shadow-sm sm:px-4 sm:py-2 sm:text-sm">
              微信扫描上方赞赏码，请作者喝一杯奶茶。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const defaultImage: PerlerDonationModalProps['ImageComponent'] = ({ src, alt, fill, className }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src={src}
    alt={alt}
    className={className}
    style={fill ? { position: 'absolute', inset: 0, width: '100%', height: '100%' } : undefined}
    loading="lazy"
  />
);
