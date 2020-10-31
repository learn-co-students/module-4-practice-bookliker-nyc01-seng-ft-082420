import React from 'react'

import Book from '../Components/Book'

const BooksList = props => {

  const renderBooks = () => {
    return props.books.map((book) => <Book key={book.id} book={book} clickHandler={props.clickHandler}/>)
  }

  return (
      <div>
        {renderBooks()}
      </div>
  ) 
  
}

export default BooksList