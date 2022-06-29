import PropTypes from 'prop-types';

function FormError({ error }) {
  if (!error) return;

  return <p>{ error }</p>;
}

FormError.propTypes = {
  error: PropTypes.string.isRequired,
};

export default FormError;
