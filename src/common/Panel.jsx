import React from 'react';
import PropTypes from 'prop-types';

export default function Panel(props) {
  const { title, className, children } = props;

  return (
    <div className={className}>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

Panel.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

Panel.defaultProps = {
  title: '',
  className: null,
  children: null,
};
