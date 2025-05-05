import { Link } from '@tanstack/react-router'
import { Logo } from './Logo'

export default function Header() {
  return (
    <header className="p-2 flex gap-2 bg-white shadow text-black justify-between">
      <nav className="flex flex-row">
        <div className="px-2 font-bold">
          <Link to="/">
            <Logo />
          </Link>
        </div>
      </nav>
    </header>
  )
}
