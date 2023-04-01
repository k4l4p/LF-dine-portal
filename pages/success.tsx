import MintSuccess from '@/components/MintSuccess'
import MainLayout from '@/layout/MainLayout'
import React, { ReactElement } from 'react'

const SuccessPage = () => {
  return (
    <MintSuccess />
  )
}

SuccessPage.getLayout = function getLayout(page: ReactElement) {
    return <MainLayout>{page}</MainLayout>
  }

export default SuccessPage
