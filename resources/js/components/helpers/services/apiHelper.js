import React from 'react'
import Settings from '../settings'

const settings = new Settings;


export const endpoints = {
        "signup": settings.homeURL+"api/auth/user/register",
        "login": settings.homeURL+"api/auth/user/login"
    }

