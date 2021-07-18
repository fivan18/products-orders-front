import React from 'react';
import PropTypes from 'prop-types';

const ItemCollection = ({ items, itemsType }) => (
  <div>
    {(() => {
      switch (itemsType) {
        case 'users':
          return items.map(({
            id, attributes: {
              first_name: firstName, last_name: lastName, initials, email,
            },
          }) => (
            <div key={id}>
              {`${firstName} ${lastName} ${initials} ${email}`}
            </div>
          ));
        case 'products': return 'products';
        case 'orders': return 'orders';
        default: return null;
      }
    })()}
  </div>
);

const {
  shape, string, arrayOf,
} = PropTypes;

ItemCollection.propTypes = {
  items: arrayOf(
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
  itemsType: string.isRequired,
};

export default ItemCollection;
