import React, { Component } from 'react';

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      inputText: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
  }

  handleChange(event) {
    this.setState({ inputText: event.target.value });
  }

  handleAddTodo() {
    const newTodo = {
      id: Date.now(),
      text: this.state.inputText
    };
    const updatedTodos = [...this.state.todos, newTodo];
    this.setState({ todos: updatedTodos, inputText: '' });
  }

  handleDeleteTodo(id) {
    const updatedTodos = this.state.todos.filter(todo => todo.id !== id);
    this.setState({ todos: updatedTodos });
  }

  render() {
    return (
      <div>
        <h1>Todo App</h1>
        <div>
          <input
            type="text"
            value={this.state.inputText}
            onChange={this.handleChange}
          />
          <button onClick={this.handleAddTodo}>Add Todo</button>
        </div>
        <ul>
          {this.state.todos.map(todo => (
            <li key={todo.id}>
              {todo.text}
              <button onClick={() => this.handleDeleteTodo(todo.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TodoApp;
