import { React, Component } from "react";

export class UpdateForm extends Component {
  render() {
    return (
      <div>
        <form onSubmit={(e) => this.props.update(e)}>
          <fieldset>
            <label >Name of Book</label>
            <input value={this.props.book.name} onChange={(e) => this.props.updateName(e)} type="text" />

            <label >Description</label>
            <input
              value={this.props.book.description}
              onChange={(e) => this.props.updateDisc(e)}
              type="text"
            />

            <label >Status</label>
            <input
              value={this.props.book.status}
              onChange={(e) => this.props.updateStatus(e)}
              type="text"
            />

            <input
              type="submit"
              value="Update Book"
            />
          </fieldset>
        </form>
      </div>
    );
  }
}

export default UpdateForm;