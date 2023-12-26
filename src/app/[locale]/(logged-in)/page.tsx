'use client'
import { NextPage } from 'next';
import { useAppSelector, useAppDispatch, useAppStore } from '@/lib/hooks'
import {useTranslations} from 'next-intl';

const HomePage = () => {

    const t = useTranslations('Index');

    const auth = useAppSelector((state) => state.auth) 
    return (
        <div>
            {auth.value}
            {t('title')}
        </div>
    );
};

export default HomePage;
