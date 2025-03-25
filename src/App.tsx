

import './App.css'
import Main from './components/MainContent';
import { HeroText } from './components/Hero/HeroText';
import { HeaderMegaMenu } from './components/Navbar/Navbar';
import { FooterLinks } from './components/Footer/FooterLinks';
function App() {

  return (
    <>
      <HeaderMegaMenu />
      <HeroText/>
      <Main/>
      <FooterLinks/>
    </>
  )
}

export default App
