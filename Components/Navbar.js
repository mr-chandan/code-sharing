import Styles from '@/styles/Navbar.module.css'

export const Navbar = () => {
    return (

        <div className={Styles.container}>
            <div className={Styles.logo}><img src='coding-folder.png' className={Styles.img} /><div className={Styles.name}>Sharecode.com</div></div>
            <div className={Styles.list}>
                <div>Home</div>
                <div>Features</div>
                <div>Help</div>
                <div>Contact</div>
            </div>

        </div>
    )
}
