import React, { Component } from "react";
import { connect } from "react-redux";
import "./TableUser.scss";
import { getAllUsers, DeleteUser } from "../../ApiServices/api";

class TableUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      action: "EDIT",
    };
  }

  async componentDidMount() {
    let users = await getAllUsers();
    this.setState({
      userList: users.data.data,
    });
  }

  handleDelete = async (user) => {
    let a=await DeleteUser(user.id);
    alert("User deleted");
    await this.componentDidMount();
  };

  handleEdit = (user, action) => {
    this.props.handleEditUserFromDad(user, action);
  };
  render() {
    let { userList } = this.state;
    return (
      <>
        <div className="user-container">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Email</th>
                <th scope="col">FUll Name</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Position</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {userList &&
                userList.length > 0 &&
                userList.map((item, index) => {
                  return (
                    <tr>
                      <td>{item.email}</td>
                      <td>{item.fullName}</td>
                      <td>{item.phone}</td>
                      <td>{item.position}</td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() =>
                            this.handleEdit(item, this.state.action)
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h274.9c-2.4-6.8-3.4-14-2.6-21.3l6.8-60.9 1.2-11.1 7.9-7.9 77.3-77.3c-24.5-27.7-60-45.5-99.9-45.5zm45.3 145.3l-6.8 61c-1.1 10.2 7.5 18.8 17.6 17.6l60.9-6.8 137.9-137.9-71.7-71.7-137.9 137.8zM633 268.9L595.1 231c-9.3-9.3-24.5-9.3-33.8 0l-37.8 37.8-4.1 4.1 71.8 71.7 41.8-41.8c9.3-9.4 9.3-24.5 0-33.9z" />
                          </svg>
                          Edit
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => this.handleDelete(item)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z" />
                          </svg>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUser);
