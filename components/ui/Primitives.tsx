"use client";

import React, { ReactNode } from "react";
import Link from "next/link";

/* ─── Button ─── */
function createRipple(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const existing = el.querySelector(".ripple-span");
  if (existing) existing.remove();

  const rect = el.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const span = document.createElement("span");
  span.className = "ripple-span";
  span.style.cssText = `
    position: absolute;
    border-radius: 50%;
    width: ${size}px;
    height: ${size}px;
    top: ${e.clientY - rect.top - size / 2}px;
    left: ${e.clientX - rect.left - size / 2}px;
    background: rgba(255, 255, 255, 0.22);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
  `;
  el.style.position = "relative";
  el.style.overflow = "hidden";
  el.appendChild(span);
  setTimeout(() => span.remove(), 600);
}

/* ─── Button ─── */
interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "whatsapp";
  size?: "sm" | "md" | "lg";
  className?: string;
  external?: boolean;
}

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  external = false,
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-heading font-semibold rounded-xl transition-all duration-300 cursor-pointer btn-active";

  const variants = {
    primary:
      "bg-gradient-to-r from-saffron-500 to-saffron-600 text-white hover:from-saffron-600 hover:to-saffron-700 shadow-lg hover:shadow-saffron-500/25 hover:-translate-y-0.5 btn-shimmer",
    secondary:
      "bg-gradient-to-r from-maroon-700 to-maroon-800 text-white hover:from-maroon-800 hover:to-maroon-900 shadow-lg hover:shadow-maroon-700/25 hover:-translate-y-0.5",
    outline:
      "border-2 border-saffron-400 text-saffron-400 hover:bg-saffron-400 hover:text-white",
    ghost:
      "text-saffron-500 hover:bg-saffron-500/10",
    whatsapp:
      "bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-green-600/25 hover:-translate-y-0.5 btn-shimmer",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    createRipple(e);
    if (onClick) onClick();
  };

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes} onClick={handleClick}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleClick(e)}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={handleClick} className={classes}>
      {children}
    </button>
  );
}

/* ─── SectionHeading ─── */
interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={`mb-10 md:mb-14 ${centered ? "text-center" : ""}`}>
      <h2
        className={`font-heading font-bold text-2xl sm:text-3xl md:text-4xl ${
          light ? "text-white" : "text-temple-dark"
        }`}
      >
        {title}
      </h2>
      {/* Decorative element */}
      <div className={`flex items-center gap-3 mt-4 ${centered ? "justify-center" : ""}`}>
        <div className="h-0.5 w-12 bg-gradient-to-r from-transparent to-saffron-400" />
        <span className="text-saffron-500 text-lg">🕉</span>
        <div className="h-0.5 w-12 bg-gradient-to-l from-transparent to-saffron-400" />
      </div>
      {subtitle && (
        <p
          className={`mt-4 text-sm sm:text-base max-w-2xl ${centered ? "mx-auto" : ""} ${
            light ? "text-ivory-300" : "text-temple-dark/60"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ─── PremiumSectionHeading ─── */
interface PremiumSectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  light?: boolean;
  centered?: boolean;
}

export function PremiumSectionHeading({
  title,
  subtitle,
  badge,
  light = false,
  centered = true,
}: PremiumSectionHeadingProps) {
  return (
    <div className={`mb-14 md:mb-20 ${centered ? "text-center" : ""}`}>
      {badge && (
        <span className="inline-block px-3 py-1 rounded-full text-xs
          tracking-widest uppercase font-heading mb-5
          border border-saffron-500/30 text-saffron-400 bg-saffron-500/5">
          {badge}
        </span>
      )}
      <h2 className={`font-display font-bold
        text-3xl sm:text-4xl md:text-5xl leading-tight mb-5
        ${light ? "text-white" : "text-temple-dark"}`}>
        {title}
      </h2>
      <div className={`flex items-center gap-4 ${centered ? "justify-center" : ""}`}>
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-saffron-400/60" />
        <span className="text-saffron-500 text-xl">🕉</span>
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-saffron-400/60" />
      </div>
      {subtitle && (
        <p className={`mt-5 text-base sm:text-lg max-w-2xl font-serif leading-relaxed
          ${centered ? "mx-auto" : ""}
          ${light ? "text-ivory-300/70" : "text-temple-dark/55"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ─── Card ─── */
interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

export function Card({ children, className = "", hover = true, glass = false }: CardProps) {
  return (
    <div
      className={`rounded-2xl ${
        glass
          ? "bg-white/10 backdrop-blur-md border border-white/20"
          : "bg-white border border-ivory-200 shadow-sm"
      } ${
        hover
          ? "hover:shadow-xl hover:-translate-y-1 hover:shadow-saffron-500/5 transition-all duration-300"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ─── PremiumCard ─── */
interface PremiumCardProps {
  children: ReactNode;
  className?: string;
}

export function PremiumCard({ children, className = "" }: PremiumCardProps) {
  return (
    <div className={`
      relative rounded-2xl overflow-hidden group
      bg-white/[0.03] backdrop-blur-sm
      border border-white/10
      transition-all duration-500
      hover:border-saffron-500/30
      hover:shadow-[0_8px_60px_rgba(255,136,17,0.12)]
      hover:-translate-y-1.5
      ${className}
    `}>
      {/* Inner top highlight line */}
      <div className="absolute inset-x-0 top-0 h-px
        bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {/* Hover radial glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100
        transition-opacity duration-500 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,136,17,0.08), transparent)" }}
      />
      {/* Content */}
      <div className="relative z-10">{children}</div>
      {/* Bottom accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5
        bg-gradient-to-r from-transparent via-saffron-500/0 to-transparent
        group-hover:via-saffron-500/60 transition-all duration-500" />
    </div>
  );
}

/* ─── Badge ─── */
interface BadgeProps {
  children: ReactNode;
  variant?: "saffron" | "green" | "red" | "gold" | "maroon";
  className?: string;
}

export function Badge({ children, variant = "saffron", className = "" }: BadgeProps) {
  const variants = {
    saffron: "bg-saffron-100 text-saffron-700 border-saffron-200",
    green: "bg-green-100 text-green-700 border-green-200",
    red: "bg-red-100 text-red-700 border-red-200",
    gold: "bg-gold-100 text-gold-700 border-gold-200",
    maroon: "bg-maroon-100 text-maroon-700 border-maroon-200",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
