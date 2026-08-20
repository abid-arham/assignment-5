import Link from 'next/link'
import { ArrowRight, ChevronDown, LogOut, User, Wrench } from 'lucide-react'
import { cookies } from 'next/headers'
import { logoutAction } from '@/app/(authGroup)/_actions/authActions'
import { MobileMenu } from './mobile-menu'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'

const links = [
  { label: 'Find a service', href: '/services' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'For technicians', href: '/auth/register?role=technician' },
]

export async function Navbar() {
  const isLoggedIn = !!(await cookies()).get('accessToken')?.value

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link href="/" className="group flex items-center gap-2.5" aria-label="FixItNow home">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform group-hover:-rotate-6">
            <Wrench className="size-4.5" strokeWidth={2.4} aria-hidden="true" />
          </span>
          <span className="font-sans text-lg font-bold tracking-tight text-foreground">
            FixIt<span className="text-primary">Now</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
              {link.label === 'How it works' && (
                <ChevronDown className="size-3.5 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex size-9 items-center justify-center rounded-full bg-secondary text-foreground transition-colors hover:bg-secondary/80">
                <User className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center gap-2">
                    <User className="size-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <form action={logoutAction} className="w-full">
                    <button className="flex w-full items-center gap-2 text-destructive">
                      <LogOut className="size-4" />
                      Log out
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login" className="rounded-full px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary">
                Sign in
              </Link>
              <Link href="/register" className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                Get started
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </>
          )}
        </div>

        <MobileMenu isLoggedIn={isLoggedIn} />
      </div>

    </header>
  )
}

export default Navbar
