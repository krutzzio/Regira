import { Tags } from '../../types'

export default function Tag(props: Tags) {
  return (
    <div className='flex items-center bg-white rounded w-fit p-1 cursor-pointer'>
      {props.name}
    </div>
  )
}
