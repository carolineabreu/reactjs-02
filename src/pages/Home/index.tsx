import { zodResolver } from '@hookform/resolvers/zod'
import { differenceInSeconds } from 'date-fns'
import { Play } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'

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

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<String | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        setAmountSecondsPassed(
          differenceInSeconds(new Date(), activeCycle.startDate),
        )
      }, 1000)
    }
    // o useEffect pode ter um return, que sempre vai ser uma função e serve para quando executar o useEffect de novo porque teve alguma mudança nas dependências eu quero fazer algo pra "limpar"/resetar os ciclos passados
    return () => {
      clearInterval(interval)
    }
  }, [activeCycle])

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle]) // closures. usar arrow functions, pegar o estado atual da variável de cycle, copia o estado atual e adiciona o novo no final
    setActiveCycleId(id)
    setAmountSecondsPassed(0)

    reset() // retorna pros valores colocados no defaultValues
  }

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmout = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmout).padStart(2, '0') // método que preenche uma string até um tamanho especifico (2) (caso não tenha aquele tamanho ainda) com algum carácter ("0"). como estamos usando o padStart vai adicionar o "0" no começo da string

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">I will work on</label>
          <TaskInput
            id="task"
            type="text"
            list="task-suggestions"
            placeholder="Give your project a name"
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
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutes.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
