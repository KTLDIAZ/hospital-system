import { NavLink } from 'react-router-dom'
import { DarkThemeToggle, Navbar } from 'flowbite-react'

const AppNavbar = () => {
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
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link as={NavLink} href="#">
          About
        </Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
        <DarkThemeToggle className="absolute -right-12 -top-2 hidden md:block" />
      </Navbar.Collapse>
    </Navbar>
  )
}

export default AppNavbar
