import useAuth from './useAuth'

function useAuthorization() {
  const roles = useAuth(x => x.roles)

  const isInRole = (validRoles: string[]) => {
    return validRoles.some(r => roles.includes(r))
  }

  const isAdmin = isInRole(['admin'])

  return { isInRole, isAdmin }
}

export default useAuthorization
