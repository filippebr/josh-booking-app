import { trpc } from '@/utils/trpc'

export default function dashboard() {
  const { mutate } = trpc.admin.sensitive.useMutation()

  return (
    <div>
      dashboard{' '}
      <button type="button" onClick={() => mutate()}>
        TOP SECRET ACTION
      </button>
    </div>
  )
}
