import { sessionService } from 'redux-react-session';
import axios from 'axios';

import { apiUrl } from '../../utilities/utils';

export const login = (username, password, history, setInPrigress) => () => axios({
  method: 'post',
  url: `${apiUrl}/login`,
  data: {
    data: {
      attributes: {
        username,
        password,
      },
    },
  },
})
  .then(({ data: res }) => {
    const { data: { relationships: { user: { meta: { username } } } } } = res;
    const { data: { attributes: { token } } } = res;

    sessionService.saveSession({ token })
      .then(() => {
        sessionService.saveUser({ username })
          .then(() => {
            setInPrigress(false);
            history.push('/');
          });
      });
  })
  .catch(() => {
    setInPrigress(false);
    history.push('/not-found');
  });

export const logout = (history) => () => sessionService.loadSession()
  .then(({ token }) => {
    sessionService.deleteSession()
      .then(() => {
        sessionService.deleteUser();
      });
    axios({
      method: 'delete',
      url: `${apiUrl}/logout`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        history.push('/');
      })
      .catch(() => {
        history.push('/not-found');
      });
  })
  .catch(() => {
    history.push('/not-found');
  });
