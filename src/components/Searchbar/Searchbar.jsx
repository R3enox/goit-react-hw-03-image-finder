import { Component } from 'react';
import css from './Searchbar.module.css';

export class Search extends Component {
  state = { value: '' };

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.handleSearch(this.state.value.trim());
    this.setState({
      value: '',
    });
  };
  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <input
            className={css.searchInput}
            type="text"
            placeholder="Search images and photos"
            autoComplete="off"
            autoFocus
            onChange={this.handleChange}
            value={this.state.value}
          />
        </form>
      </header>
    );
  }
}
