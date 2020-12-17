import {useRouter} from 'next/router'

export const PersonalInformation = () => {
    const router = useRouter()
    function handleClick(e){
        e.preventDefault()
        router.back()
    }
    return (
        <form className="settings-form">
            <label htmlFor="display-name">Display Name</label>
            <input type="text" name="display-name" id="display-name"/>
            <label htmlFor="email">Email Address</label>
            <input type="email" name="email" id="email"/>
            <label htmlFor="display-name">Password</label>
            <input type="text" name="display-name" id="display-name"/>
            <button type="submit" onClick={handleClick}>Save Changes</button>
        </form>
    )
}
