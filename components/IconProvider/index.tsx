import { IconContext } from "react-icons";


export default function IconProvider ({children} : {children: React.ReactNode}) {
  return (
    <IconContext.Provider value={{size: '1rem', className: 'icon'}}>
      {children}
    </IconContext.Provider>
  )
}