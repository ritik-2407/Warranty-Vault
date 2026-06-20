import { UploadIcon } from "@/components/icons";

export function NoImagePlaceholder({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-1 text-[#9a6070] ${className}`}>
      <UploadIcon className="w-8 h-8" />
      <span className="text-[10px] font-medium uppercase tracking-wide">Upload image</span>
    </div>
  );
}
