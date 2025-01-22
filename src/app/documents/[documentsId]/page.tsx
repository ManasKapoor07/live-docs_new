import React from 'react'
import { Editor } from './editor'
import { ToolBar } from './toolbar'
import { NavBar } from './navbar'

interface DocumetParams {
  params: Promise<{ documentsId: string }>
}

const DocumentIdPage = async ({ params }: DocumetParams) => {

  const { documentsId } = await params
  return (
    <div className='min-h-screen bg-[#FAFBFD]'>
      <div className='flex flex-col p-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden '>
        <NavBar />
        <ToolBar />
      </div>
      <div className='pt-[130px] print:pt-0'>
        <Editor />
      </div>
    </div>
  )
}

export default DocumentIdPage
