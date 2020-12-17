import React from 'react'
import { SettingsLink } from './SettingsLink'

export const SettingsMenu = () => {
    return (
        <div className="settings-menu">
            <SettingsLink title="Personal Information" subhead="Change your email, password and username" image="/images/settings1@2x.png" link="personal-information"/>
            <SettingsLink title="Privacy Settings" subhead="Control your data" image="/images/settings2@2x.png" link="privacy"/>
            <SettingsLink title="Payment Methods" subhead="Connect a card or bank account" image="/images/settings3@2x.png" link="payment-methods"/>
            <SettingsLink title="Subscriptions" subhead="Manage your subscriptions" image="/images/settings4@2x.png" link="subscriptions"/>
        </div>
    )
}
