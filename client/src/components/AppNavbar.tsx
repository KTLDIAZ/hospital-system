import { NavLink } from 'react-router-dom'
import { DarkThemeToggle, Navbar } from 'flowbite-react'

const AppNavbar = () => {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand as={NavLink} href="https://flowbite-react.com">
        <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Flowbite
        </span>
      </Navbar.Brand>
      <div className="flex items-center justify-center gap-4">
        <div className="flex md:order-2 min-[800px]:mr-4 lg:mr-8 xl:mr-12">
          <DarkThemeToggle />
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse className="">
          <Navbar.Link href="#" active>
            Home
          </Navbar.Link>
          <Navbar.Link as={NavLink} href="#">
            About
          </Navbar.Link>
          <Navbar.Link href="#">Services</Navbar.Link>
          <Navbar.Link href="#">Pricing</Navbar.Link>
          <Navbar.Link href="#">Contact</Navbar.Link>
        </Navbar.Collapse>
      </div>
    </Navbar>
  )
}

export default AppNavbar
