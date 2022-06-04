import { useAppSelector } from 'app/hooks'

const Profile = () => {
    const user = useAppSelector((state) => state.auth.user)

    return (
        <div>
            User name: {user?.name}
            <br />
            Email: {user?.email}
        </div>
    )
}

export default Profile
