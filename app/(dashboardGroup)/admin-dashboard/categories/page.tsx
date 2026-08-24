import { getAllCategories } from "@/service/admin/getAllCategories"
import { CreateCategoryForm } from "./create-category-form"

export default async function AdminCategoriesPage() {
  const categories = await getAllCategories()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Categories</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage service categories available on the platform.
        </p>
      </div>

      <CreateCategoryForm />

      <div className="overflow-x-auto rounded-2xl border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/30 text-left">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Description</th>
              <th className="px-4 py-3 font-medium">Created</th>
            </tr>
          </thead>

          <tbody>
            {categories.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-muted-foreground">
                  No categories yet.
                </td>
              </tr>
            )}

            {categories.map((category) => (
              <tr key={category.id} className="border-b last:border-0">
                <td className="px-4 py-3 font-medium">{category.name}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {category.description ?? "—"}
                </td>
                <td className="px-4 py-3">
                  {new Date(category.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}