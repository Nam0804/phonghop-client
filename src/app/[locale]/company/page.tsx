import React from "react";
import DefaultLayout from "@/layouts/DefaultLayout";
import styles from './CompanyList.module.css'
import Table from "@/components/Table/Table";
import datas from "./datatable";
import Button from "@/components/Form/Button";

const CompanyList = () => {
    const columns =[
        'No',
        'Company_Name',
        'Company_Domain',
        'Address',
        'Manager_Name',
        'Manager_Title',
        'Email',
        'Manager_Phone_Number',
    ]
    const actions = [
        <button key="eye" className={styles.custombutton}><img src="/eye.svg" ></img></button>,
        <button key="skipdownline" className={styles.custombutton}><img src="/skipdownline.svg"></img></button>,
        <button key="edit" className={styles.custombutton}><img src="/edit.svg"></img></button>,
        <button key="delete" className={styles.custombutton} style={{backgroundColor:'#E56353'}}><img src="/delete.svg"></img></button>,
      ];
    return(
        <DefaultLayout>
            <div className={styles.container}>
                <div className={styles.labelsection}>
                    <div className={styles.square}>
                    </div>
                    <h1 className={styles.label}>Company List</h1>
                </div>
                <div className={styles.companytable}>
                    <Table data={datas} columns={columns} actions={actions}>
                        
                    </Table>
                </div>
                <div className={styles.addco}>
                    <Button className={styles.addbtn}>ADD NEW COMPANY</Button>
                </div>
            </div>
        </DefaultLayout>
    );
}
export default CompanyList