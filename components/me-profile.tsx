'use client'

import { Mail, ShieldCheck, UserRound } from 'lucide-react'
import type { IUser } from '@/lib/types'

type MeProfileProps = {
  user: IUser | null
}

export function MeProfile({ user }: MeProfileProps) {
  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6 py-10 text-foreground">
        <section className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
          <h1 className="text-2xl font-semibold tracking-tight">Sign in required</h1>
          <p className="mt-3 leading-6 text-muted-foreground">
            We couldn&apos;t find a signed-in user for this request.
          </p>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground sm:px-10 sm:py-16">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10">
        <header className="flex flex-col gap-3">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Account
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Your profile
          </h1>
          <p className="max-w-xl text-pretty leading-6 text-muted-foreground">
            The details associated with your account.
          </p>
        </header>

        <section
          aria-labelledby="profile-details-heading"
          className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
        >
          <div className="flex items-center gap-4 border-b border-border px-6 py-6 sm:px-8">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground" aria-hidden="true">
              <UserRound className="size-5" />
            </div>
            <div>
              <h2 id="profile-details-heading" className="text-lg font-semibold">
                Profile details
              </h2>
              <p className="text-sm text-muted-foreground">Visible to you only</p>
            </div>
          </div>

          <dl className="divide-y divide-border">
            <div className="flex flex-col gap-2 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <dt className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                <UserRound className="size-4" aria-hidden="true" />
                Name
              </dt>
              <dd className="text-base font-medium sm:text-right">{user.name}</dd>
            </div>
            <div className="flex flex-col gap-2 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <dt className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                <Mail className="size-4" aria-hidden="true" />
                Email
              </dt>
              <dd className="break-all text-base font-medium sm:text-right">{user.email}</dd>
            </div>
            <div className="flex flex-col gap-2 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <dt className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                <ShieldCheck className="size-4" aria-hidden="true" />
                Role
              </dt>
              <dd className="text-base font-medium sm:text-right">{user.role}</dd>
            </div>
          </dl>
        </section>
      </div>
    </main>
  )
}

