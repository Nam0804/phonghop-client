'use client'
import React, { useState } from "react";
import styles from '@/css/CompanyList.module.css'
import Table from "@/constants/Table/Table";
import datas from "./datatable";
import Button from "@/constants/Form/Button";
import Modal from "@/constants/Modal/ModalCompany";



const CompanyList = () => {
    const columns = [
        'No',
        'Company_Name',
        'Company_Domain',
        'Address',
        'Manager_Name',
        'Manager_Title',
        'Email',
        'Manager_Phone_Number',
    ]
    const [isModalOpenDel, setIsModalOpenDel] = useState(false);

    const openModalDel = () => {
        setIsModalOpenDel(true);
    };

    const closeModalDel = () => {
        setIsModalOpenDel(false);
    };
    const [isModalOpenView, setIsModalOpenView] = useState(false);

    const openModalView = () => {
        setIsModalOpenView(true);
    };

    const closeModalView = () => {
        setIsModalOpenView(false);
    };
    const actions = [
        <button key="eye" className={styles.custombutton}><img src="/eye.svg" onClick={openModalView}></img></button>,
        <button key="skipdownline" className={styles.custombutton}><img src="/skipdownline.svg"></img></button>,
        <button key="edit" className={styles.custombutton}><img src="/edit.svg"></img></button>,
        <button key="delete" className={styles.custombutton} style={{ backgroundColor: '#E56353' }} onClick={openModalDel}><img src="/delete.svg"></img></button>,
    ];
    return (
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
            <div>
                {isModalOpenDel && (
                    <Modal title="Are you sure to delete this company?" onClose={closeModalDel} >
                        {
                            <>
                                <div className={styles.btngroup}>
                                    <Button className={styles.delbtn}>DELETE COMPANY</Button>
                                    <Button color="#FFF" className={styles.closebtn} onClick={closeModalDel}>CLOSE</Button>
                                </div>
                            </>
                        }
                    </Modal>
                )}
            </div>
            <div>
                {isModalOpenView && (
                    <Modal title="View Company Information" onClose={closeModalView} >
                        {
                            <>
                                <div className={styles.inputgroup}>
                                    <div className={styles.inputform}>
                                        <label htmlFor="name">Name</label>
                                        <input type="text" id="name" />
                                    </div>
                                    <div className={styles.inputform}>
                                        <label htmlFor="title">Address</label>
                                        <input type="text" id="title" />
                                    </div>
                                    <div className={styles.inputform}>
                                        <label htmlFor="company">Domain</label>
                                        <input type="text" id="company" />
                                    </div>
                                    <div className={styles.inputform}>
                                        <label htmlFor="email">Tax Code</label>
                                        <input type="email" id="email" />
                                    </div>
                                </div>
                                <div className={styles.btngroup}>
                                    <Button color="#FFF" className={styles.closebtnview} onClick={closeModalView}>CLOSE</Button>
                                </div>
                            </>
                        }
                    </Modal>
                )}
            </div>
        </div>
    );
}
export default CompanyList