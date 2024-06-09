import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import UserService from "~/common/services/UserService";
import InputGroup from "~/components/InputGroup";

 const schema = z.object({
  identity: z.string()
});

type Idenitty = z.infer<typeof schema>

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Idenitty>({
    shouldFocusError: true,
    resolver: zodResolver(schema)
  });

  const mutation =  useMutation({
    mutationFn: (data: Idenitty) => {
      return UserService.Search(data.identity)
    },
    onSuccess: (data) => {
      console.log(data)
    }
  })

  const onSubmit = handleSubmit(data => {
    mutation.mutate(data)
  }) 
  return (
    <div>
      <form onSubmit={onSubmit}>
        <InputGroup
          autoFocus
          label="Buscar por identidad:"
          type="text"
          placeholder="0000-0000-00000"
          errorMessage={errors.identity?.message}
          {...register('identity')}
        />
      </form>
    </div>
  )
}

export default Home