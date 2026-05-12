import clsx, { type ClassValue } from 'clsx'

/** Helper para componer classNames condicionales con tipo seguro. */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs)
}
