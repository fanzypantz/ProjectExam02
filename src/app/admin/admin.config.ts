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
        size: 'full',
        layout: 'left',
      },
      {
        name: 'Name',
        type: 'string',
        key: 'establishmentName',
        editAble: true,
        size: 'half',
        layout: 'left',
      },
      {
        name: 'Email',
        type: 'email',
        key: 'establishmentEmail',
        editAble: true,
        size: 'half',
        layout: 'right',
      },
      {
        name: 'Price',
        type: 'number',
        key: 'price',
        editAble: true,
        size: 'small',
        layout: 'left',
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
        name: 'Area',
        type: 'string',
        key: 'area',
        editAble: true,
        size: 'half',
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
        name: 'Location',
        type: 'location',
        key: 'location',
        editAble: true,
        size: 'full',
        layout: 'left',
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
  reservations: {
    readLayout: [
      { name: 'id', type: 'string', key: 'id' },
      { name: 'establishmentId', type: 'string', key: 'establishmentId' },
      { name: 'name', type: 'string', key: 'name' },
      { name: 'email', type: 'string', key: 'email' },
      { name: 'rooms', type: 'string', key: 'rooms' },
      { name: 'persons', type: 'string', key: 'persons' },
      {
        name: 'booking status',
        type: 'booking',
        keys: ['bookingStart', 'bookingEnd'],
      },
    ],
    writeLayout: [
      {
        name: 'Booking start date',
        type: 'date',
        key: 'bookingStart',
        editAble: true,
        size: 'half',
        layout: 'left',
      },
      {
        name: 'Booking end date',
        type: 'date',
        key: 'bookingEnd',
        editAble: true,
        size: 'half',
        layout: 'right',
      },
      {
        name: 'Customer name',
        type: 'string',
        key: 'name',
        editAble: true,
        size: 'half',
        layout: 'left',
      },
      {
        name: 'Customer email',
        type: 'email',
        key: 'email',
        editAble: true,
        size: 'half',
        layout: 'right',
      },
      {
        name: 'Establishment ID',
        type: 'string',
        key: 'establishmentId',
        editAble: false,
        size: 'half',
        layout: 'left',
      },
      {
        name: 'Amount of rooms',
        type: 'number',
        key: 'rooms',
        editAble: true,
        size: 'small',
        layout: 'right',
      },
      {
        name: 'Amount of persons',
        type: 'number',
        key: 'persons',
        editAble: true,
        size: 'small',
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
    ],
  },
  messages: {
    readLayout: [
      { name: 'id', type: 'string', key: 'id' },
      { name: 'name', type: 'string', key: 'name' },
      { name: 'id', type: 'string', key: 'email' },
      { name: 'created at', type: 'date', key: 'createdAt' },
      { name: 'last updated', type: 'date', key: 'updatedAt' },
    ],
    writeLayout: [
      {
        name: 'Customer name',
        type: 'string',
        key: 'name',
        editAble: true,
        size: 'half',
        layout: 'left',
      },
      {
        name: 'Customer email',
        type: 'email',
        key: 'email',
        editAble: true,
        size: 'half',
        layout: 'right',
      },
      {
        name: 'Customer message',
        type: 'text',
        key: 'message',
        editAble: true,
        size: 'full',
        layout: 'left',
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
    ],
  },
  posts: {
    readLayout: [
      { name: 'id', type: 'string', key: 'id' },
      { name: 'title', type: 'string', key: 'title' },
      { name: 'image ', type: 'image', key: 'imageUrl' },
      { name: 'created at', type: 'date', key: 'createdAt' },
      { name: 'last updated', type: 'date', key: 'updatedAt' },
    ],
    writeLayout: [
      {
        name: 'Title',
        type: 'string',
        key: 'title',
        editAble: true,
        size: 'half',
        layout: 'left',
      },
      {
        name: 'Image details',
        type: 'string',
        key: 'imageDetails',
        editAble: true,
        size: 'half',
        layout: 'right',
      },
      {
        name: 'Main image',
        type: 'image',
        key: 'imageUrl',
        editAble: true,
        size: 'full',
        layout: 'left',
      },
      {
        name: 'Text',
        type: 'text',
        key: 'text',
        editAble: true,
        size: 'full',
        layout: 'left',
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
    writeLayout: [
      {
        name: 'Display Name',
        type: 'string',
        key: 'displayName',
        editAble: true,
        size: 'half',
        layout: 'left',
      },
      {
        name: 'Roles',
        type: 'roles',
        key: 'roles',
        editAble: true,
        size: 'half',
        layout: 'right',
      },
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

export interface RoleInterface {
  admin?: string;
  editor?: string;
  customer?: string;
}
