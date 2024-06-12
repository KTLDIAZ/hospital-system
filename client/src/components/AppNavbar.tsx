import { NavLink, useMatch } from 'react-router-dom'
import { DarkThemeToggle, Navbar } from 'flowbite-react'

const AppNavbar = () => {
  const matchHome = useMatch('/')
  const matchMedicine = useMatch('/medicine')
  const matchUser = useMatch('/user')
  return (
    <Navbar fluid rounded border>
      <Navbar.Brand as={NavLink} href="https://flowbite-react.com">
        <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Flowbite
        </span>
      </Navbar.Brand>
      <div className="md:hidden flex md:order-2">
        <DarkThemeToggle className="md:hidden" />
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse className="relative md:mr-12 lg:mr-20 xl:mr-32">
        <Navbar.Link as={NavLink} to="/" active={Boolean(matchHome)}>
          Home
        </Navbar.Link>
        <Navbar.Link as={NavLink} to="/medicine" active={Boolean(matchMedicine)}>
          Medicines
        </Navbar.Link>
        <Navbar.Link as={NavLink} to="/user" active={Boolean(matchUser)}>
          Users
        </Navbar.Link>
        <DarkThemeToggle className="absolute -right-12 -top-2 hidden md:block" />
      </Navbar.Collapse>
    </Navbar>
  )
}

export default AppNavbar
