import FeedbackEntry from '@/components/feedback/entry/FeedbackEntry'
import React from 'react'

// write your logic here or make a component for writing feedbacks

const FeedbackEntryPage = ({ params }: { params: { id: number }}) => {

  return (
    <div className="text-black flex justify-center align-middle w-full flex-col h-auto">
        <FeedbackEntry id={params.id} />
    </div>
  )
}

export default FeedbackEntryPage