import { trpc } from '@/utils/trpc'
import Image from 'next/image'
import { ChangeEvent, useState } from 'react'
import { HiLockClosed } from 'react-icons/hi'

interface LoginProps {}

export function Login() {
  const [input, setInput] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target

    setInput((prev) => ({ ...prev, [name]: value }))
  }

  const { mutate: login, isError } = trpc.admin.login.useMutation()

  return (
    <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <Image
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              start your 14-day free trial
            </a>
          </p>
        </div>
        <form className="mt-8 space-y-6" action="">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <p className="pb-1 text-sm text-red-600">
              {isError && 'Invalid login credentials'}
            </p>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                value={input.email}
                onChange={handleChange}
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border"
                placeholder="Email address"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-800"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                login(input)
              }}
              className="group relative flex w-full justify-center rounded-md border border-transparent"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <HiLockClosed
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
      login
    </div>
  )
}

export default Login
