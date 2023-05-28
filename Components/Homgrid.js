import Styles from '@/styles/Home.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router';


export const Homgrid = () => {
  const [name, setname] = useState(null);
  const [room, setroom] = useState(null);
  const router = useRouter();

  function Btnclick() {
    if (room && name) {
      router.push({
        pathname: `/${room}`,
        query: { name }
      })
    }
  }
//home
  return (
    <div className={Styles.container}>
      <div className={Styles.contgrid}>
        <div className={Styles.form}>
          <div className={Styles.flexfont}>
            <div className={Styles.formtxt}>Welcome to a platform where you can share text or code!</div>
            <div className={Styles.text2}>Share and collaborate on code using simple links</div>
          </div>
          <div className={Styles.inp}>
            <div className={Styles.inpdiv}>
              <input className={Styles.input} onChange={(ev) => setname(ev.target.value)} type="text" placeholder="Name" />
              <input className={Styles.input} onChange={(ev) => setroom(ev.target.value)} type="text" placeholder="Code-id" />
            </div>
            <button
              className={`${Styles.btn} ${room && name ? Styles.whiteBtn : ''}`}
              type="button" onClick={Btnclick}>
              Send
            </button>

          </div>
        </div>
        <div className={Styles.imgbox}>< img src='codd.png' className={Styles.img} alt="codeimg" /></div>
      </div>
    </div>
  )
}



