'use client'

import DefaultLayout from '@/layouts/DefaultLayout';
import React, {FormEvent, useState} from 'react';
import AddUser from "@/components/user/add_user";

export default function Index() {
  return (
    <DefaultLayout>
      <AddUser></AddUser>
    </DefaultLayout>
  );
}