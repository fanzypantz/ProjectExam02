export const adminConfig = {
  establishments: {
    readLayout: [
      { name: 'id', type: 'string', key: 'id' },
      { name: 'images', type: 'imageArray', key: 'imageUrl' },
      {
        name: 'booking status',
        type: 'booking',
        keys: ['bookingStart', 'bookingEnd'],
      },
      { name: 'name', type: 'string', key: 'establishmentName' },
      { name: 'price', type: 'string', key: 'price' },
      { name: 'max guests', type: 'string', key: 'maxGuests' },
      { name: 'last updated', type: 'date', key: 'updatedAt' },
    ],
  },
  enquiries: {
    readLayout: [{ name: 'id', type: 'string', key: 'id' }],
  },
  messages: {
    readLayout: [{ name: 'id', type: 'string', key: 'id' }],
  },
  posts: {
    readLayout: [{ name: 'id', type: 'string', key: 'id' }],
  },
  users: {
    readLayout: [
      { name: 'uid', type: 'string', key: 'uid' },
      { name: 'display name', type: 'string', key: 'displayName' },
      { name: 'email', type: 'string', key: 'email' },
      { name: 'images', type: 'image', key: 'photoURL' },
      { name: 'roles', type: 'roles', key: 'roles' },
    ],
  },
};

// Just to give the config some type declaration
export interface ReadInterface {
  name: string;
  type: string;
  key?: string;
  keys?: string[];
}
