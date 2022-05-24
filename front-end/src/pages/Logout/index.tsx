

import { useAppDispatch } from "app/hooks"
import { logoutUser } from "features/auth/authSlice"


const Logout = () => {
    const dispatch = useAppDispatch()
    dispatch(logoutUser())

    return (
        <div>
            Logging out
        </div>
    );
};

export default Logout;