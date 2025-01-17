import React from 'react'
import { Editor } from './editor'

interface DocumetParams {
params : Promise<{documentsId : string}>
}

const DocumentIdPage = async ({params} : DocumetParams) => {

    const {documentsId} = await params
  return (
    <div>
        Documents with Id : {documentsId}
        <Editor />
    </div>
  )
}

export default DocumentIdPage
