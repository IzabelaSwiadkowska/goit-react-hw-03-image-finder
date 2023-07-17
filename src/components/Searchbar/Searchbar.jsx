import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FiSearch } from 'react-icons/fi';

import styles from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };
  render() {
    return (
      <header className={styles.search__bar}>
        <form className={styles.search__form} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.search__form__button}>
            <FiSearch className={styles.button__icon} />
          </button>

          <input
            className={styles.search__form__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="query"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
Searchbar.propTypes = {
  handleSubmit: PropTypes.func,
};
export default Searchbar;
