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
};

export interface AdminLayouts {
  type: string;
  key?: string;
  keys?: string[];
}

export interface ReadLayout {
  name: string;
  layout: AdminLayouts;
}
