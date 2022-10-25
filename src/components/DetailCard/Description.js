import React from 'react'
import { parsePath } from 'react-router-dom';

function Description(p) {
  console.log(p)
  return (
    <div>{p.description}</div>
  )
}
export { Description };