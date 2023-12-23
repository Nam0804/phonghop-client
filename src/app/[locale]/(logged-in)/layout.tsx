import Header from '@/constants/Header/Header';
import Sidebar from '@/constants/Sidebar/Sidebar';
import {notFound} from 'next/navigation';
 
// Can be imported from a shared config
const locales = ['en', 'vn'];
 
export default function LocaleLayout({children, params: {locale}}:any) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();
  return (
    <html lang={locale}>
      <body style={{ margin: 0, padding: 0 }}>
      <header>
        <Header></Header>
      </header>
      <div style={{width:'80px',float:'left',height:'100%'}}>
        <Sidebar></Sidebar>
      </div>
      <section style={{width:'calc(100% - 80px)',float:'right'}}>
        {children}
      </section>
      </body>
    </html>
  );
}