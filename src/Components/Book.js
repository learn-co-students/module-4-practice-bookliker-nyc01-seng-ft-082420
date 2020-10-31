import React from 'react'
import {Menu} from 'semantic-ui-react'

const Book = props => {
  
  const clickHandler = () => {
    props.clickHandler(props.book)
  }
  return (
    <Menu.Item onClick={clickHandler}>
      <h3>{props.book.title}</h3>
    </Menu.Item>
  )
}

export default Book