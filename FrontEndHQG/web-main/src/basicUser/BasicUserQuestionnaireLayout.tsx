import { Outlet } from '@tanstack/react-location'
import React from 'react'
import { MainHeader } from '../Common/MainHeader'
import { SecondaryMenu } from './SecondaryMenu'

export const BasicUserQuestionnaireLayout = () => {
  return (
    <div>
      <MainHeader />
      <SecondaryMenu />

      <Outlet />
    </div>
  )
}
