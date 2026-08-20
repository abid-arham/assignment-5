'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, LogOut, Menu, X } from 'lucide-react'
import { logoutAction } from '@/app/(authGroup)/_actions/authActions'

const links = [
  { label: 'Find a service', href: '/services' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'For technicians', href: '/auth/register?role=technician' },
]

export function MobileMenu({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        className="inline-flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary md:hidden"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full border-t border-border/70 bg-background px-5 py-5 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-foreground hover:bg-secondary"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 border-t border-border/70 pt-4">
              {isLoggedIn ? (
                <form action={logoutAction}>
                  <button className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-destructive px-5 py-2.5 text-sm font-semibold text-destructive-foreground">
                    Log out
                    <LogOut className="size-3.5" aria-hidden="true" />
                  </button>
                </form>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/login" onClick={() => setIsOpen(false)} className="rounded-full border border-border px-4 py-2.5 text-center text-sm font-semibold text-foreground">
                    Sign in
                  </Link>
                  <Link href="/register" onClick={() => setIsOpen(false)} className="rounded-full bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground">
                    Get started
                    <ArrowRight className="size-3.5 inline ml-1" aria-hidden="true" />
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
