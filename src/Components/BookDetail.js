import React from 'react'
import {
  Container,
  Header,
  Button,
  List,
  Image
} from "semantic-ui-react";

const BookDetail = props => {
  const {book} = props

  const clickHandler = () => {
    props.likeHandler(book.users)
  }


  const renderLikes = () => {
    return book.users.map(user => <List.Item icon="user" key={user.id} content={user.username} />)
  }

  return (
    <Container text>
    <Header>{book.title}</Header>
      <Image
        src={book.img_url}
        size="small"
      />
      <p>{book.description}</p>
      <Button
        color="red"
        content={props.liked ? "Unlike" : "Like"}
        icon="heart"
        label={{
          basic: true,
          color: "red",
          pointing: "left",
          content: `${book.users.length}`
        }}
        onClick={clickHandler}
      />
      <Header>Liked by</Header>
      <List>
        {renderLikes()}
      </List>
    </Container>
    )
}

export default BookDetail