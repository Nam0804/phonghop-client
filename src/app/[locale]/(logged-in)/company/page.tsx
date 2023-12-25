'use client'
import React, {useState} from "react";
import DefaultLayout from "@/layouts/User/DefaultLayout";
import styles from'@/css/CompanyList.module.css';
import Table from "@/constants/Table/Table";
import datas from "./datatable";
import Button from "@/constants/Form/Button";
import Modal from "@/constants/Modal/ChangePasswordModal";

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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
        setIsChangePasswordModalOpen(false);
    };

    const openChangePasswordModal = () => {
        setIsChangePasswordModalOpen(true);
        setIsModalOpen(false);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsChangePasswordModalOpen(false);
    };
    const [passwordVisible, setpasswordVisible] = useState(false);
    const [password, setPassword] = useState('');
    const actions = [
        <button key="eye" className={styles.custombutton}><img src="/eye.svg" ></img></button>,
        <button key="skipdownline" className={styles.custombutton}><img src="/skipdownline.svg"></img></button>,
        <button key="edit" className={styles.custombutton}><img src="/edit.svg" onClick={openModal}></img></button>,
        <button key="delete" className={styles.custombutton} style={{backgroundColor:'#E56353'}}><img src="/delete.svg"></img></button>,
      ];
    return(
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
                {isModalOpen && (
                    <Modal title="Personal Information" onClose={closeModal} >
                    {
                        <>
                        <div className={styles.inputgroup}>
                            <div className={styles.inputform}>
                                <label htmlFor="name">Name*</label>
                                <input type="text" id="name" />
                            </div>
                            <div className={styles.inputform}>
                                <label htmlFor="title">Email Address*</label>
                                <input type="text" id="title" />
                            </div>
                            <div className={styles.inputform}>
                                <label htmlFor="company">Phone Number*</label>
                                <input type="text" id="company" />
                            </div>
                        </div>
                        <div className={styles.editsection}>
                            <button className={styles.editbtn} onClick={openChangePasswordModal}>CHANGE PASSWORD</button>
                        </div>
                        <div className={styles.btngroup}>
                            <Button className={styles.passbtn}>EDIT INFORMATION</Button>
                            <Button color="#FFF" className={styles.closebtn} onClick={closeModal}>CLOSE</Button>
                        </div>

                    </>
                    }
                    </Modal>
                )}
                </div>
                <div>
                {isChangePasswordModalOpen && (
                    <Modal title="Change Password" onClose={closeModal} >
                    {
                        <>
                        <div className={styles.inputgroup}>
                            <div className={styles.inputform1}>
                                <label htmlFor="name">Current Password*</label>
                                <img src="/pass.svg" alt="" className={styles.icon}/>
                                <input  type={passwordVisible ? 'text' : 'password'} name="password" placeholder="Password"/>
                                <img src={passwordVisible ? "/showpass.svg" : "/hidepass.svg"} alt="" className={styles.showhide} onClick={()=>setpasswordVisible(!passwordVisible)}/>
                            </div>
                            <div className={styles.inputform1}>
                                <label htmlFor="title">New Password*</label>
                                <img src="/pass.svg" alt="" className={styles.icon}/>
                                <input  type={passwordVisible ? 'text' : 'password'} name="password" placeholder="Password"/>
                                <img src={passwordVisible ? "/showpass.svg" : "/hidepass.svg"} alt="" className={styles.showhide} onClick={()=>setpasswordVisible(!passwordVisible)}/>
                            </div>
                            <div className={styles.inputform1} style={{ marginBottom:'50px' }}>
                                <label htmlFor="company">Confirm Password*</label>
                                <img src="/pass.svg" alt="" className={styles.icon}/>
                                <input  type={passwordVisible ? 'text' : 'password'} name="password" placeholder="Password"/>
                                <img src={passwordVisible ? "/showpass.svg" : "/hidepass.svg"} alt="" className={styles.showhide} onClick={()=>setpasswordVisible(!passwordVisible)}/>
                            </div>
                        </div>
                        <div className={styles.btngroup}>
                            <Button className={styles.passbtn}>SAVE</Button>
                            <Button color="#FFF" className={styles.closebtn} onClick={closeModal}>CLOSE</Button>
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