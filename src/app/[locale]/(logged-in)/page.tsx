'use client'
import { NextPage } from 'next';
import { useAppSelector } from '@/lib/hooks'
import {useLocale, useTranslations} from 'next-intl';

const HomePage = () => {

    const t = useTranslations('Index');
    const locale = useLocale();

    const auth = useAppSelector((state) => state.auth)
    return (
        <div>
            {auth.value}
            {t('title')}
            {locale}
        </div>
    );
};

export default HomePage;
