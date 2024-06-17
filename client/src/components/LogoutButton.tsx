import { HiOutlineLogout } from 'react-icons/hi'
import useAuth from '~/common/hooks/useAuth'

const LogoutButton = () => {
  const logout = useAuth(x => x.logout)
  return (
    <button
      onClick={logout}
      type="button"
      className="rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
    >
      <HiOutlineLogout className="h-5 w-5" />
    </button>
  )
}

export default LogoutButton
