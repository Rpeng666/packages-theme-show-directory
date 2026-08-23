import { BrandGithubIcon, BrandSlackIcon, BrandXIcon, BrandYoutubeIcon, RaycastLogoNegIcon } from "@raycast/icons";

const socialLinks = [
  {
    href: "https://github.com/raycast/ray-so",
    label: "GitHub",
    icon: <BrandGithubIcon className="w-4 h-4" />,
  },
  {
    href: "https://x.com/raycast",
    label: "X",
    icon: <BrandXIcon className="w-4 h-4" />,
  },
  {
    href: "https://raycast.com/community",
    label: "Slack Community",
    icon: <BrandSlackIcon className="w-4 h-4" />,
  },
  {
    href: "https://www.youtube.com/@raycastapp",
    label: "YouTube",
    icon: <BrandYoutubeIcon className="w-4 h-4" />,
  },
];

/**
 * SocialFooter — 工作台底部的社交 footer（app 侧组件）。
 *
 * 注意：主题的 WorkbenchFooter 现在承载"控制条"（工作台底部 footer），
 * 不再是社交栏；社交 footer 保留为 app 本地组件，供 layout 与各页面
 * InfoDialog 使用。
 */
export function SocialFooter({ referral = "ray-so" }: { referral?: string }) {
  return (
    <div className="pt-2 mt-auto">
      <div className="flex items-center gap-2 mt-2 justify-between">
        <a
          href={`https://raycast.com/#ref=ray-so-${referral}`}
          className="flex items-center gap-1.5 text-gray-12 group"
        >
          <RaycastLogoNegIcon className="w-4 h-4 text-brand" />
          <span className="text-[13px] font-medium group-hover:underline">Made by Raycast</span>
        </a>
        <div className="flex gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-9 hover:text-gray-11 transition-colors"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
