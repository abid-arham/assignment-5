import { getAllUsers } from "@/service/admin/getAllUsers"
import { UserManagementTable } from "./user-management-table"


export default async function AdminUsersPage() {
  const users = await getAllUsers()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Users</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage platform users and their access.
        </p>
      </div>

      <UserManagementTable users={users} />
    </div>
  )
}