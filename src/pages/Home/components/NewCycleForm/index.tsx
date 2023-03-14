import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { FormContainer, MinutesAmountInput, TaskInput } from './style'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Inform the task'),
  minutesAmount: zod.number().min(5).max(60),
})

// interface NewCycleFormData {
//   task: string
//   minutesAmount: number
// }  usar interface quando vai definir o objeto de validação e type quando vai criar uma tipagem a partir de outra referencia

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>
// inferir é definido automaticamente, automatizando o processo de falar qual a tipagem de algo

export function NewCycleForm() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  return (
    <FormContainer>
      <label htmlFor="task">I will work on</label>
      <TaskInput
        id="task"
        type="text"
        list="task-suggestions"
        placeholder="Give your project a name"
        disabled={!!activeCycle} // tem que ser um boolean o valor do disabled, os !! converte pra true se tiver algo dentro de activeCycle, se não, false
        {...register('task')} // esse 'task' vai ser o name do input e essa função retorna alguns métodos como onChange, onBlur, onFocus...como retorna várias coisas é utilizado o spread operator pra transformar cada método em um atributo/propriedade pro input
      />

      <datalist id="task-suggestions">
        <option value="project 1" />
        <option value="project 2" />
        <option value="project 3" />
        <option value="banana" />
      </datalist>

      <label htmlFor="minutesAmount">for</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutes.</span>
    </FormContainer>
  )
}
