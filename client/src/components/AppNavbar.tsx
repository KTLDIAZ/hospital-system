import { NavLink, useMatch } from 'react-router-dom'
import { DarkThemeToggle, Navbar } from 'flowbite-react'
import LogoutButton from './LogoutButton'

const AppNavbar = () => {
  const matchHome = useMatch('/')
  const matchMedicine = useMatch('/medicine')
  const matchUser = useMatch('/user')
  return (
    <Navbar fluid rounded border>
      <Navbar.Brand as={NavLink} href="https://flowbite-react.com">
        <img src="/vite.svg" className="mr-3 h-6 sm:h-9" alt="Vite Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Flowbite
        </span>
      </Navbar.Brand>
      <div className="md:hidden flex md:order-2">
        <DarkThemeToggle className="md:hidden" />
        <LogoutButton />
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse className="relative md:mr-24 lg:mr-32 xl:mr-40">
        <Navbar.Link as={NavLink} to="/" active={Boolean(matchHome)}>
          Home
        </Navbar.Link>
        <Navbar.Link as={NavLink} to="/medicine" active={Boolean(matchMedicine)}>
          Medicines
        </Navbar.Link>
        <Navbar.Link as={NavLink} to="/user" active={Boolean(matchUser)}>
          Users
        </Navbar.Link>
        <div className="absolute -right-24 -top-2 hidden md:flex justify-center items-center gap-1">
          <DarkThemeToggle />
          <LogoutButton />
        </div>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default AppNavbar
