import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import '../BestBooks.css';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import BookForm from "./BookForm";
import UpdateForm from "./UpdateForm";

class MyFavoriteBooks extends React.Component {
  constructor() {
    super();
    this.state = {
      listBooks: [],
      email: '',
      name: '',
      description: '',
      status: '',
      showUpdate: false,
      index: 0,
      showAddForme: false,
    }
  }

  showAddForme = () => {
    this.setState({ showAddForme: !this.state.showAddForme, showUpdate: false });
  };
  closeAddForm = () => {
    this.setState({ showAddForme: false, showUpdate: false });
  };

  getUserInput = (e) => {
    console.log(e.target.value);
    this.setState({
      email: e.target.value
    })
    console.log(this.state.email);
  }

  sendRequest = (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_SERVER_URL}/user?email=${this.state.email}`;
    axios.get(url).then(response => {
      this.setState({
        listBooks: response.data
      })
      console.log(response.data);
    })
  }

  updateName = (e) => this.setState({ name: e.target.value });
  updateDisc = (e) => this.setState({ description: e.target.value });
  updateStatus = (e) => this.setState({ status: e.target.value });

  addBook = async (e) => {
    e.preventDefault();
    const bodyData = {
      bookName: this.state.name,
      bookDescription: this.state.description,
      bookStatus: this.state.status,
      email: this.props.auth0.user.email,
    };
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/book`, bodyData).then((res) => {
      this.setState({
        book: res.data.books,
      });
    });
  };

  deleteBook = async (index) => {
    const query = {
      email: this.props.auth0.user.email,
    };
    await axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/book/${this.state.book[index]._id}`, { params: query })
      .then((res) => {
        this.setState({
          book: res.data.books,
        });
      });
  };
  bookName;

  showUpdateForm = (idx) => {
    this.setState({
      index: idx,
      showUpdate: !this.state.showUpdate,
    });
  };

  update = async (e) => {
    e.preventDefault();
    const reqBody = {
      bookName: this.state.name,
      bookStatus: this.state.status,
      bookDescription: this.state.description,
      email: this.props.auth0.user.email,
    };
    await axios.put(`${process.env.REACT_APP_SERVER_URL}/book/${this.state.index}`, reqBody).then((res) => {
      this.setState({
        book: res.data.books,
      });
    });
  };

  render() {
    return (
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
        <Button
          onClick={this.showAddForme}
          style={{ marginBottom: "30px", backgroundColor: "#5E8B7E", color: "white", border: "none" }}
        >
          ADD NEW BOOK
        </Button>

        {this.state.showAddForme && (
          <BookForm
            closeAddForm={this.closeAddForm}
            addBook={this.addBook}
            updateName={this.updatekName}
            updateDisc={this.updateDisc}
            updateStatus={this.updateStatus}
          />
        )}

        {this.state.showUpdate && (
          <UpdateForm
            update={this.update}
            updateName={this.updateName}
            updateDisc={this.updateDisc}
            updateStatus={this.updateStatus}
            book={this.state.book[this.state.index]}
          />
        )}

        <from>
          <input type='text' placeholder="email" onChange={this.getUserInput} />
          < button onClick={(e) => { this.sendRequest(e) }}>search by email</button>
        </from> 


         {
          this.state.listBooks.map(book => {
            console.log(book.books);
            return book.books.map((item, indx) => {
              console.log(item.name);
              return <>
                <ListGroup horizontal={item} className="my-2" >
                  <ListGroup.Item variant="dark">name: {item.name}</ListGroup.Item>
                  <ListGroup.Item variant="dark">decription:{item.decription}</ListGroup.Item>
                  <ListGroup.Item variant="dark">status: {item.status}</ListGroup.Item>
                </ListGroup>

                <Button
                  className="m-3 btn btn-danger"
                  onClick={() => this.deleteBook(indx)}
                  style={{ backgroundColor: "#2F5D62", color: "white", border: "none" }}
                >
                  Delete Book
                </Button>
                <Button
                  className="m-3"
                  onClick={() => this.showUpdateForm(indx)}
                  style={{ backgroundColor: "#5E8B7E", color: "white", border: "none" }}
                >
                  Update Book
                </Button>
              </>
            })
          })
        }
      </Jumbotron>
    )
  }
}
export default withAuth0(MyFavoriteBooks);