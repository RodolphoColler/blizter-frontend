import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { createOrSignSocialUser } from '../../services/request';

function GoogleButton({ endpoint }) {
  const navigate = useNavigate();

  async function handleCredentialResponse(response) {
    await createOrSignSocialUser(response.credential, endpoint);

    navigate('/dashboard');
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: '100199167052-19lork61n9cr47i04m6n8230juu4hvos.apps.googleusercontent.com',
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById('buttonDiv'),
      { theme: 'outline', size: 'large', text: 'sign_in_with', width: '320' },
    );

    google.accounts.id.prompt();
  }, []);

  return <div id="buttonDiv" />;
}

GoogleButton.propTypes = {
  endpoint: PropTypes.string.isRequired,
};

export default GoogleButton;
