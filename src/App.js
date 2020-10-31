import React from "react";
import {Menu} from "semantic-ui-react";
import BooksList from './Containers/BooksList'
import BookDetail from './Components/BookDetail'

class App extends React.Component {

  state = {
    api: [],
    selectedBook: "",
    liked: "",
    currentUser: {"id":1, "username":"pouros"}
  }

  componentDidMount() {
    fetch('http://localhost:3000/books')
      .then(resp => resp.json())
      .then(books => this.setState({ api: books }))
  }

  selectBook = book => {
    let liked = this.checkLiked(book)

    this.setState(() => (
      {
        selectedBook: book,
        liked: liked
      }
    ))
  }

  likeHandler = users => {
    if(this.state.liked) {
      let updatedUsers = users.filter(user => user.id !== this.state.currentUser.id)
      let updatedBook = {
        ...this.state.selectedBook,
        users: updatedUsers
      }

      fetch(`http://localhost:3000/books/${this.state.selectedBook.id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          accepts: "application/json"
        },
        body: JSON.stringify(updatedBook)
      })
      .then(resp => resp.json())
      .then(this.selectBook)
    } else {
      let updatedUsers = [...users, this.state.currentUser]
      let updatedBook = {
        ...this.state.selectedBook,
        users: updatedUsers
      }
      fetch(`http://localhost:3000/books/${this.state.selectedBook.id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          accepts: "application/json"
        },
        body: JSON.stringify(updatedBook)
      })
      .then(resp => resp.json())
      .then(this.selectBook)
    }
  }
  
  checkLiked = book => {
    return book.users.some(user => user.id === this.state.currentUser.id)
  }

  render() {
    return (
      <div>
        <Menu inverted>
          <Menu.Item header>Bookliker</Menu.Item>
        </Menu>
        <main>
        <Menu id="books-list" vertical inverted>
          <BooksList books={this.state.api} clickHandler={this.selectBook}/>
        </Menu>
          {this.state.selectedBook ? <BookDetail book={this.state.selectedBook} liked={this.state.liked} likeHandler={this.likeHandler}/> : null}
        </main>
      </div>
    )
  }
}

export default App;
