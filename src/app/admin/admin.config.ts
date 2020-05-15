export const adminConfig = {
  establishments: {
    readLayout: [
      { name: 'id', layout: { type: 'string', key: 'id' } },
      { name: 'images', layout: { type: 'imageArray', key: 'imageUrl' } },
      {
        name: 'booking status',
        layout: {
          type: 'booking',
          keys: ['bookingStart', 'bookingEnd'],
        },
      },
      { name: 'name', layout: { type: 'string', key: 'establishmentName' } },
      { name: 'price', layout: { type: 'string', key: 'price' } },
      { name: 'max guests', layout: { type: 'string', key: 'maxGuests' } },
      { name: 'last updated', layout: { type: 'date', key: 'updatedAt' } },
    ],
  },
  enquiries: {
    readLayout: [{ name: 'id', layout: { type: 'string', key: 'id' } }],
  },
  messages: {
    readLayout: [{ name: 'id', layout: { type: 'string', key: 'id' } }],
  },
  posts: {
    readLayout: [{ name: 'id', layout: { type: 'string', key: 'id' } }],
  },
  users: {
    readLayout: [
      { name: 'uid', layout: { type: 'string', key: 'uid' } },
      { name: 'display name', layout: { type: 'string', key: 'displayName' } },
      { name: 'email', layout: { type: 'string', key: 'email' } },
      { name: 'images', layout: { type: 'image', key: 'photoURL' } },
      { name: 'roles', layout: { type: 'roles', key: 'roles' } },
    ],
  },
};

// Just to give the config some type declaration
export interface ReadInterface {
  name: string;
  layout: {
    type: string;
    key?: string;
    keys?: string[];
  };
}
