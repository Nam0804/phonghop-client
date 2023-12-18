import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import React from "react";
const DefaultLayout = ({children}:any) => {
    return (
    <div>
      <header>
        <Header></Header>
      </header>
      <div style={{width:'80px',float:'left',height:'100%'}}>
        <Sidebar></Sidebar>
      </div>
      <section style={{width:'calc(100% - 80px)',float:'right'}}>
        {children}
      </section>
    </div>
    );
}
export default DefaultLayout
