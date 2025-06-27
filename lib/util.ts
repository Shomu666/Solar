import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...classes: (string | false | null | undefined)[]) =>
    classes.filter(Boolean).join(' ');