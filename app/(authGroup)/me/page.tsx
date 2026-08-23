import { MeProfile } from '@/components/me-profile'
import { getMe } from '@/service/getMe'


export default async function Page() {
  const currentUser = await getMe()

  return <MeProfile user={currentUser} />
}
