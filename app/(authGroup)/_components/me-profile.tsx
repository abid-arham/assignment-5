'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { KeyRound, Mail, Pencil, ShieldCheck, UserRound } from 'lucide-react'
import type { IUser } from '@/lib/types'
import { updateProfileAction } from '../_actions/updateProfileAction'
import { changePasswordAction } from '../_actions/changePasswordAction'

type MeProfileProps = {
  user: IUser | null
}

export function MeProfile({ user }: MeProfileProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const [name, setName] = useState(user?.name ?? '')
  const [nameMessage, setNameMessage] = useState<{ text: string; isError: boolean } | null>(null)

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [passwordMessage, setPasswordMessage] = useState<{ text: string; isError: boolean } | null>(null)

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

  const handleNameSubmit = () => {
    setNameMessage(null)
    if (!name.trim()) {
      setNameMessage({ text: 'Name cannot be empty.', isError: true })
      return
    }
    startTransition(async () => {
      const result = await updateProfileAction(name.trim())
      setNameMessage({ text: result.message, isError: !result.success })
      if (result.success) router.refresh()
    })
  }

  const handlePasswordSubmit = () => {
    setPasswordMessage(null)
    if (newPassword.length < 6) {
      setPasswordMessage({ text: 'New password must be at least 6 characters.', isError: true })
      return
    }
    startTransition(async () => {
      const result = await changePasswordAction(currentPassword, newPassword)
      setPasswordMessage({ text: result.message, isError: !result.success })
      if (result.success) {
        setCurrentPassword('')
        setNewPassword('')
      }
    })
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

        <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex items-center gap-4 border-b border-border px-6 py-6 sm:px-8">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground" aria-hidden="true">
              <Pencil className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Edit name</h2>
              <p className="text-sm text-muted-foreground">Update how your name appears</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 px-6 py-6 sm:px-8">
            {nameMessage && (
              <p className={`text-sm ${nameMessage.isError ? 'text-destructive' : 'text-muted-foreground'}`}>
                {nameMessage.text}
              </p>
            )}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <button
              type="button"
              disabled={isPending}
              onClick={handleNameSubmit}
              className="self-start rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
            >
              {isPending ? 'Saving...' : 'Save name'}
            </button>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex items-center gap-4 border-b border-border px-6 py-6 sm:px-8">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground" aria-hidden="true">
              <KeyRound className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Change password</h2>
              <p className="text-sm text-muted-foreground">Requires your current password</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 px-6 py-6 sm:px-8">
            {passwordMessage && (
              <p className={`text-sm ${passwordMessage.isError ? 'text-destructive' : 'text-muted-foreground'}`}>
                {passwordMessage.text}
              </p>
            )}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="currentPassword" className="text-sm font-medium text-foreground">Current password</label>
              <input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="newPassword" className="text-sm font-medium text-foreground">New password</label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <button
              type="button"
              disabled={isPending || !currentPassword || !newPassword}
              onClick={handlePasswordSubmit}
              className="self-start rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
            >
              {isPending ? 'Updating...' : 'Change password'}
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}