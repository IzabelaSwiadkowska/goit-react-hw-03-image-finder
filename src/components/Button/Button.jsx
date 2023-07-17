import React, { Component } from 'react';
import styles from './Button.module.css';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { onLoadMore } = this.props;
    return (
      <div className={styles.button__container}>
        <button className={styles.button} type="button" onClick={onLoadMore}>
          Load more
        </button>
      </div>
    );
  }
}
Button.propTypes = {
  onLoadMore: PropTypes.func,
};
export default Button;
