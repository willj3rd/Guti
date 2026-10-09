import Image from "next/image";
import { company } from "@/data/company";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href="#home"
      className={`brand ${compact ? "brand-compact" : ""}`}
      aria-label={`${company.name} — home`}
    >
      <Image src={company.logo} alt="" width={76} height={58} priority />
      <span className="brand-wordmark">
        GUTIÉRREZ<span>LANDSCAPING & MORE</span>
      </span>
    </a>
  );
}
