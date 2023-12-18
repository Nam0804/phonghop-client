'use client'

import DefaultLayout from '@/layouts/DefaultLayout';
import React, {FormEvent, useState} from 'react';
import AddUser from "@/components/addUser/addUser";
import DeleteUser from '@/components/deleteUser/deleteUser';

export default function Index() {
  return (
    <DefaultLayout>
        <AddUser />
        <DeleteUser />
    </DefaultLayout>
  );
}