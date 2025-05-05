import { Logo } from '@/layout/RootLayout/components/Logo'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from 'antd'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
      <div className="flex flex-col items-center justify-center text-center p-6">
       <Logo className='size-[40vmin] animate-[spin_20s_linear_infinite]'/>
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Welcome to Domain Manager
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-xl">
          Manage your domains easily
        </p>
        <Link to="/domains">
          <Button type="primary" size="large">
            Go to App
          </Button>
        </Link>
      </div>
  )
}
