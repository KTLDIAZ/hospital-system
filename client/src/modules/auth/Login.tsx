import { Button } from "flowbite-react"
import { useForm } from "react-hook-form"
import InputGroup from "~/components/InputGroup"
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import AuthService from "~/common/services/AuthService"
import { useLocation } from "react-router-dom"
import useAuth from "~/common/hooks/useAuth"

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(4, "Password must not be empty"),
});

type Login = z.infer<typeof schema>;

const Login = () => {
  const login = useAuth(s => s.login)
  const location = useLocation();
  const { search } = location;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Login>({
    shouldFocusError: true,
    resolver: zodResolver(schema)
  });

  const mutation =  useMutation({
    mutationFn: (data: Login) => {
      return AuthService.Login(data.email, data.password)
    },
    onSuccess: (succeed) => {
      if (succeed) login(search) 
    }
  })

  const onSubmit = handleSubmit(data => {
    mutation.mutate(data)
  }) 

  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Hospital system
      </h1>
      <form onSubmit={onSubmit} className="flex max-w-md md:min-w-80 flex-col gap-4">
        <InputGroup
          autoFocus
          autoComplete="email"
          label="Email"
          type="email"
          placeholder="johndoe@example.com"
          errorMessage={errors.email?.message}
          {...register("email")}
        />
        <InputGroup
          autoComplete="current-password"
          label="Password"
          type="password"
          placeholder="************"
            errorMessage={errors.password?.message}
          {...register("password")}
        />
        <Button type="submit">Login</Button>
      </form>
    </div>
  )
}

export default Login
