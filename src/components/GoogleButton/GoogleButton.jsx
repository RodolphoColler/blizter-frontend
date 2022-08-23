import { useEffect } from 'react';

function GoogleButton() {
  function handleCredentialResponse(response) {
    jwt_decode(response.credential);
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: '100199167052-19lork61n9cr47i04m6n8230juu4hvos.apps.googleusercontent.com',
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById('buttonDiv'),
      { theme: 'outline', size: 'large', text: 'sign_in_with', width: '300' },
    );

    google.accounts.id.prompt();
  }, []);

  return <div id="buttonDiv" />;
}

export default GoogleButton;
