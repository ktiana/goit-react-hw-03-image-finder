import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';

export default class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { query } = this.state;
    const normalizedQuery = query.trim().toLowerCase();
    if (!query.trim(normalizedQuery)) {
      alert('enter the search query');
      return;
    }

    this.props.onSubmit(normalizedQuery);

    this.setState({
      query: '',
    });
  };

  render() {
    const { query } = this.state;
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <BsSearch size={20} />
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
