import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { sessionService } from 'redux-react-session';
import axios from 'axios';

import ItemCollection from '../components/item-collection';

import { apiUrl } from '../utilities/utils';

const Pagination = ({ match: { params: { itemsType } }, history }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let mounted = true;

    sessionService.loadSession()
      .then(({ token }) => {
        axios({
          method: 'get',
          url: `${apiUrl}/${itemsType}/`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then(({ data: { data } }) => {
            if (mounted) {
              setItems(data);
            }
          })
          .catch(() => {
            if (mounted) {
              history.push('/not-found');
            }
          });
      })
      .catch(() => {
        if (mounted) {
          history.push('/login');
        }
      });

    // eslint-disable-next-line no-return-assign
    return () => mounted = false;
  }, []);

  return (
    <div className="pagination">
      <div>{itemsType}</div>
      <ItemCollection items={items} itemsType={itemsType} />
    </div>
  );
};

const { func, shape, string } = PropTypes;

Pagination.propTypes = {
  match: shape({
    params: shape({
      itemsType: string,
    }),
  }).isRequired,
  history: shape({
    push: func,
  }).isRequired,
};

export default withRouter(Pagination);
