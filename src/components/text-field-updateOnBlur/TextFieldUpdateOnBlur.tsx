import React, { useState } from 'react'
import { TextField } from '@material-ui/core'

interface TextFieldUpdateOnBlurProps {
  value: string
  autoFocus?: boolean
  onBlur: (text: string) => void
}

const TextFieldUpdateOnBlur: React.FC<TextFieldUpdateOnBlurProps> = (
  props: TextFieldUpdateOnBlurProps
) => {
  const { value, onBlur, autoFocus } = props
  const [text, setText] = useState<string>(value)
  return (
    <TextField
      value={text}
      onBlur={e => onBlur(text)}
      autoFocus={autoFocus}
      onChange={e => setText(e.target.value)}
    />
  )
}

export default TextFieldUpdateOnBlur
