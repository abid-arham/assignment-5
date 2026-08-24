"use client"

import { useMemo, useState, useTransition } from "react"
import { IAdminUser } from "@/lib/types"
import { updateUserStatusAction } from "@/app/(dashboardGroup)/_actions/updateUserStatusAction"

interface UserManagementTableProps {
  users: IAdminUser[]
}

export function UserManagementTable({ users }: UserManagementTableProps) {
  const [search, setSearch] = useState("")
  const [pendingUserId, setPendingUserId] = useState<string | null>(null)
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null)
  const [isPending, startTransition] = useTransition()

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return users

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    )
  }, [users, search])

  const handleToggleStatus = (user: IAdminUser) => {
    const nextStatus = user.activeStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE"

    setMessage(null)
    setPendingUserId(user.id)

    startTransition(async () => {
      const result = await updateUserStatusAction(user.id, nextStatus)
      setMessage({ text: result.message, isError: !result.success })
      setPendingUserId(null)
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search by name or email..."
        className="w-full max-w-sm rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
      />

      {message && (
        <div
          className={`rounded-lg border p-3 text-sm ${
            message.isError
              ? "border-destructive/30 text-destructive"
              : "border-border text-muted-foreground"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="overflow-x-auto rounded-2xl border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/30 text-left">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Joined</th>
              <th className="px-4 py-3 font-medium text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-muted-foreground">
                  No users found.
                </td>
              </tr>
            )}

            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b last:border-0">
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.role}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                      user.activeStatus === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.activeStatus}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    disabled={isPending && pendingUserId === user.id}
                    onClick={() => handleToggleStatus(user)}
                    className="rounded-full border px-4 py-1.5 text-xs font-medium hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isPending && pendingUserId === user.id
                      ? "Updating..."
                      : user.activeStatus === "ACTIVE"
                      ? "Block"
                      : "Unblock"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}