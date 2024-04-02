import { useUser } from '../../hooks/useUser'
import { UserTagContainer } from '../../types'

export default function UserTag(props: UserTagContainer) {
    const { id } = props

    const {  initials } = useUser(id)


    return (
        <div>{initials}</div>
    )
}
