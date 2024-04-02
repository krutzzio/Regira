import { useUser } from '../../hooks/useUser'
import { UserTagContainer } from '../../types'

export default function UserTag(props: UserTagContainer) {
    const { id } = props

    const { user, initials } = useUser(id)


    return (
        <div>{initials}</div>
    )
}
