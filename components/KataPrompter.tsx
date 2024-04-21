import React from 'react'
import { TextareaWithText } from '@/components/TextareaWithText'

const KataPrompter = (): React.JSX.Element => {
  return (
    <div>
      <TextareaWithText
        label="Topic"
        description="what should the kata be about?"
      />
    </div>
  )
}

export default KataPrompter