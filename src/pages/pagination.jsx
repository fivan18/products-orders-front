import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { sessionService } from 'redux-react-session';
import axios from 'axios';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ReactPaginate from 'react-paginate';
import UserCollection from '../components/user-collection';
import ProductCollection from '../components/product-collection';
import OrderCollection from '../components/order-collection';

import { apiUrl } from '../utilities/utils';

import { addItems } from '../redux/item/item.actions';
import { selectItems } from '../redux/item/item.selectors';
import { getPage } from '../redux/item/item.utils';

const Pagination = ({
  match: { params: { itemsType } }, history, addItems, itemsForPage,
}) => {
  const [items, setItems] = useState([]);
  const [pagesNumber, setPagesNumber] = useState(1);
  const [perPage, setPerPage] = useState(10);

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
              addItems(data);

              setPerPage(10);
              setPagesNumber(Math.trunc(data.length / perPage));
              setItems(getPage(data, 0, perPage));
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
  }, [itemsType]);

  const handlePageClick = (element) => {
    const selectedPage = parseInt(element.selected, 10);
    setItems(getPage(itemsForPage, selectedPage, perPage));
  };

  return (
    <div className="">
      { (items.length > 0 && items[0].type === itemsType.slice(0, -1))
        && (
        <div>
          <h2>{itemsType}</h2>
          {(() => {
            switch (itemsType) {
              case 'users': return (<UserCollection users={items} />);
              case 'products': return (<ProductCollection products={items} />);
              case 'orders': return (<OrderCollection orders={items} />);
              default: return null;
            }
          })()}
          <ReactPaginate
            previousLabel="prev"
            nextLabel="next"
            breakLabel="..."
            breakClassName="break-me"
            pageCount={pagesNumber}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName="paginate"
            subContainerClassName="pages paginate"
            activeClassName="active"
          />
        </div>
        )}
    </div>
  );
};

const {
  func, shape, string, arrayOf,
} = PropTypes;

Pagination.propTypes = {
  match: shape({
    params: shape({
      itemsType: string,
    }),
  }).isRequired,
  history: shape({
    push: func,
  }).isRequired,
  addItems: func.isRequired,
  itemsForPage: arrayOf(
    shape({
      id: string,
      attributes: shape({
        first_name: string,
        last_name: string,
        initials: string,
        email: string,
      }),
    }),
  ).isRequired,
};

const mapStateToProps = createStructuredSelector({
  itemsForPage: selectItems,
});

const mapDispatchToProps = (dispatch) => ({
  addItems: (items) => dispatch(addItems(items)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Pagination));
