export const adminConfig = {
  establishments: {
    readLayout: [
      { name: 'id', type: 'string', key: 'id' },
      { name: 'images', type: 'imageArray', key: 'imageUrl' },
      { name: 'name', type: 'string', key: 'establishmentName' },
      { name: 'area', type: 'string', key: 'area' },
      { name: 'price', type: 'string', key: 'price' },
      { name: 'max guests', type: 'string', key: 'maxGuests' },
      { name: 'highlight', type: 'boolean', key: 'highlight' },
      { name: 'last updated', type: 'date', key: 'updatedAt' },
    ],
    writeLayout: [
      {
        name: 'Booking Status',
        type: 'booking',
        key: 'booking',
        editAble: true,
        size: 'half',
        layout: 'left',
      },
      {
        name: 'Name',
        type: 'string',
        key: 'establishmentName',
        editAble: true,
        size: 'half',
        layout: 'right',
      },
      {
        name: 'Email',
        type: 'email',
        key: 'establishmentEmail',
        editAble: true,
        size: 'half',
        layout: 'left',
      },
      {
        name: 'Price',
        type: 'number',
        key: 'price',
        editAble: true,
        size: 'small',
        layout: 'right',
      },
      {
        name: 'Max guests',
        type: 'number',
        key: 'maxGuests',
        editAble: true,
        size: 'small',
        layout: 'right',
      },
      {
        name: 'Images',
        type: 'imageArray',
        key: 'imageUrl',
        editAble: true,
        size: 'full',
        layout: 'left',
      },
      {
        name: 'Description',
        type: 'text',
        key: 'description',
        editAble: true,
        size: 'full',
        layout: 'left',
      },
      {
        name: 'Location',
        type: 'location',
        key: 'location',
        editAble: true,
        size: 'half',
        layout: 'left',
      },
      {
        name: 'Area',
        type: 'string',
        key: 'area',
        editAble: true,
        size: 'half',
        layout: 'right',
      },
      {
        name: 'Created at',
        type: 'date',
        key: 'createdAt',
        editAble: false,
        size: 'half',
        layout: 'left',
      },
      {
        name: 'Last updated',
        type: 'date',
        key: 'updatedAt',
        editAble: false,
        size: 'half',
        layout: 'right',
      },
      {
        name: 'Highlight on front page',
        type: 'boolean',
        key: 'highlight',
        editAble: true,
        size: 'small',
        layout: 'left',
      },
    ],
  },
  enquiries: {
    readLayout: [
      { name: 'id', type: 'string', key: 'id' },
      { name: 'establishmentId', type: 'string', key: 'establishmentId' },
      { name: 'name', type: 'string', key: 'name' },
      { name: 'email', type: 'string', key: 'email' },
      {
        name: 'booking status',
        type: 'booking',
        keys: ['bookingStart', 'bookingEnd'],
      },
    ],
  },
  messages: {
    readLayout: [
      { name: 'id', type: 'string', key: 'id' },
      { name: 'name', type: 'string', key: 'name' },
      { email: 'id', type: 'string', key: 'email' },
      { name: 'created at', type: 'date', key: 'createdAt' },
      { name: 'last updated', type: 'date', key: 'updatedAt' },
    ],
  },
  posts: {
    readLayout: [
      { name: 'id', type: 'string', key: 'id' },
      { name: 'title', type: 'string', key: 'title' },
      { email: 'image ', type: 'image', key: 'imageUrl' },
      { name: 'created at', type: 'date', key: 'createdAt' },
      { name: 'last updated', type: 'date', key: 'updatedAt' },
    ],
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

export interface WriteInterface {
  name: string;
  type: string;
  editAble: boolean;
  size: string;
  layout: string;
  key?: string;
  keys?: string[];
}
