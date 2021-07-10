import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export class BookForm extends Component {
  render() {
    return (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>New Book</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <label >Name of Book</label>
            <input onChange={this.props.updateName} type="text"/>

            <label >Description</label>
            <input onChange={this.props.updateDisc} type="text"/>

            <label >Status</label>
            <input onChange={this.props.updateStatus} type="text"/>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.props.closeAddForm} variant="secondary">
            Close
          </Button>
          <Button
            onClick={(e) => {
              this.props.addBook(e);
              this.props.closeAddForm();
            }}
          >
            New Book
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  }
}

export default BookForm;
