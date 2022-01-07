import React from 'react';
import baseUrl from '../utils/baseUrl';
import axios from 'axios';
import { HeaderMessage, FooterMessage } from '../components/Common/WelcomeMessage';

export default function login() {
    return (
        <>
            <HeaderMessage />
            <FooterMessage />
        </>
    )
}
