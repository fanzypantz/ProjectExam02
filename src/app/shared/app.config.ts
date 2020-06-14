export const firebaseConfig = {
  apiKey: 'AIzaSyAcTjgqq0ifpF5Hjcz334aiuHTxNztbN6I',
  authDomain: 'noroff-projectexam-02.firebaseapp.com',
  databaseURL: 'https://noroff-projectexam-02.firebaseio.com',
  projectId: 'noroff-projectexam-02',
  storageBucket: 'noroff-projectexam-02.appspot.com',
  messagingSenderId: '156222630589',
  appId: '1:156222630589:web:d3bbe08c66eff461fd25d4',
  measurementId: 'G-H8SZ64J4QX',
};

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ' +
  'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ' +
  'exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure ' +
  'dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit ' +
  'anim id est laborum.';

export const defaultEstablishments = [
  {
    establishmentName: 'Sunsssset Beach',
    establishmentEmail: 'info@sunsetbeach.com',
    area: 'Nordnes',
    imageUrl:
      'https://images.unsplash.com/photo-1439130490301-25e322d88054?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80',
    price: '85',
    maxGuests: '18',
    googleLat: 60.393388,
    googleLong: 5.22872,
    description:
      'Get ready for some amazing sunsets as you sip a cocktail and watch dolphins play in the harbour below.',
    selfCatering: true,
    highlight: false,
    id: '1',
  },
  {
    establishmentName: 'Rest Easy',
    establishmentEmail: 'management@resteasy.com',
    area: 'Arna',
    imageUrl:
      'https://images.unsplash.com/photo-1512552288940-3a300922a275?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80',
    price: '120',
    maxGuests: '14',
    googleLat: 60.396779,
    googleLong: 5.235602,
    description:
      'Need some time off from your busy life to relax and unwind? Choose Rest Easy for the complete relaxation experience you desire.',
    selfCatering: false,
    highlight: false,
    id: '2',
  },
  {
    establishmentName: 'The Hideaway',
    establishmentEmail: 'info@hideaway.com',
    area: 'Ytre Arna',
    imageUrl:
      'https://images.unsplash.com/photo-1551906993-c8b38a6ab201?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=666&q=80',
    price: '70',
    maxGuests: '2',
    googleLat: 60.425168,
    googleLong: 5.358141,
    description:
      'This secluded wilderness cabin is the perfect spot for a restful and cosy getaway.',
    selfCatering: true,
    highlight: false,
    id: '3',
  },
  {
    establishmentName: 'Farm Cottage',
    establishmentEmail: 'info@cottageholidays.com',
    area: 'Kronstad',
    imageUrl:
      'https://images.unsplash.com/photo-1505916349660-8d91a99c3e23?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
    price: '100',
    maxGuests: '8',
    googleLat: 60.42175,
    googleLong: 5.371878,
    description:
      'Voted the best B&B in Norway, this farm cottage is available for family holidays throughout the summer.',
    selfCatering: false,
    highlight: false,
    id: '4',
  },
  {
    establishmentName: 'Tree Tops',
    establishmentEmail: 'reservations@treetops.com',
    area: 'Bryggen',
    imageUrl:
      'https://images.unsplash.com/photo-1550355191-aa8a80b41353?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    price: '95',
    maxGuests: '6',
    googleLat: 60.405482,
    googleLong: 5.352511,
    description:
      'For a getaway like no other, this unique treehouse offers a cosy and comfortable wilderness experience.',
    selfCatering: true,
    highlight: true,
    id: '5',
  },
  {
    establishmentName: 'Coast to Coast',
    establishmentEmail: 'reservations@coasttocoast.com',
    area: 'Laksevåg',
    imageUrl:
      'https://images.unsplash.com/photo-1544085701-4d54e9f41c45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=889&q=80',
    price: '55',
    maxGuests: '4',
    googleLat: 60.397053,
    googleLong: 5.322961,
    description:
      'This trendy apartment in the heart of the city is the perfect base from which to explore Bergen.',
    selfCatering: true,
    highlight: false,
    id: '6',
  },
  {
    establishmentName: 'Koselig hytte Spa Resort',
    establishmentEmail: 'info@koselighyttespa.no',
    area: 'Årstad',
    imageUrl:
      'https://images.unsplash.com/photo-1469394576569-858815b13427?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=849&q=80',
    price: '105',
    maxGuests: '4',
    googleLat: 60.487134,
    googleLong: 5.353859,
    description:
      'A beautiful lakeside retreat where you can relax, unwind and explore the beauty of the natural world.',
    selfCatering: false,
    highlight: true,
    id: '7',
  },
  {
    establishmentName: 'City Break',
    establishmentEmail: 'info@citybreakapartment.no',
    area: 'Fyllingsdalen',
    imageUrl:
      'https://images.unsplash.com/photo-1509365390695-33aee754301f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
    price: '60',
    maxGuests: '2',
    googleLat: 60.390076,
    googleLong: 5.318007,
    description:
      "If you're in Bergen on business or for a holiday, this cosy and classy apartment is the perfect place to stay.",
    selfCatering: true,
    highlight: false,
    id: '8',
  },
  {
    establishmentName: 'Fjell Hotel',
    establishmentEmail: 'desk@fjellhotel.com',
    area: 'Fyllingsdalen',
    imageUrl:
      'https://images.unsplash.com/photo-1501117716987-c8c394bb29df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
    price: '160',
    maxGuests: '4',
    googleLat: 60.353245,
    googleLong: 5.118213,
    description:
      'For a restful and relaxing trip, come visit our luxurious boutique hotel, with views of the sea from all our rooms',
    selfCatering: false,
    highlight: false,
    id: '9',
  },
  {
    establishmentName: 'Glede Mountain Lodge',
    establishmentEmail: 'reservations@gledemountain.no',
    area: 'Bryggen',
    imageUrl:
      'https://images.unsplash.com/photo-1517320964276-a002fa203177?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=375&q=80',
    price: '110',
    maxGuests: '6',
    googleLat: 60.406214,
    googleLong: 5.37656,
    description:
      'A luxury hotel nestled in the mountains. Our award winning chef will cater for your every desire.',
    selfCatering: false,
    highlight: true,
    id: '10',
  },
  {
    establishmentName: 'Home from Home',
    establishmentEmail: 'info@homefromhome.com',
    area: 'Åsane',
    imageUrl:
      'https://images.unsplash.com/photo-1546555648-fb7876c40c58?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=755&q=80',
    price: '80',
    maxGuests: '10',
    googleLat: 60.345025,
    googleLong: 5.304774,
    description:
      'A large and tastefully decorated home away from home. Perfect for bigger families or groups of friends.',
    selfCatering: true,
    highlight: false,
    id: '11',
  },
  {
    establishmentName: 'Lodge Hotel',
    establishmentEmail: 'info@lodgehotel.com',
    area: 'Åsane',
    imageUrl:
      'https://images.unsplash.com/photo-1548873902-8b69fb85030a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
    price: '75',
    maxGuests: '20',
    googleLat: 60.311531,
    googleLong: 5.46815,
    description:
      'A family-friendly lodge with beautiful, well-appointed rooms. Located in a stunning valley close to winter sports facilities.',
    selfCatering: false,
    highlight: false,
    id: '12',
  },
  {
    establishmentName: 'The Shed',
    establishmentEmail: 'reservations@theshedaccomodation.no',
    area: 'Askøy',
    imageUrl:
      'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
    price: '50',
    maxGuests: '2',
    googleLat: 60.335076,
    googleLong: 5.406012,
    description:
      'A rustic and cosy rural cottage, perfect for romantic weekends away and quiet retreats into nature.',
    selfCatering: true,
    highlight: false,
    id: '13',
  },
  {
    establishmentName: 'Innsjø Hus',
    establishmentEmail: 'reservations@innsjøhus.no',
    area: 'Troldhaugen',
    imageUrl:
      'https://images.unsplash.com/photo-1469394576569-858815b13427?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=849&q=80',
    price: '200',
    maxGuests: '8',
    googleLat: 61.084654,
    googleLong: 6.228147,
    description:
      'Located on the banks of a beautiful and idyllic lake, this large and luxurious home is perfect for a rural getaway.',
    selfCatering: true,
    highlight: false,
    id: '14',
  },
  {
    establishmentName: 'Peace and Quiet',
    establishmentEmail: 'reservations@peaceandquiet.no',
    area: 'Ytrebygda',
    imageUrl:
      'https://images.unsplash.com/photo-1479123142480-cbdc7b84de24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=678&q=80',
    price: '150',
    maxGuests: '10',
    googleLat: 60.374245,
    googleLong: 6.200421,
    description:
      'A large and welcoming lake house retreat in the heart of a beautiful valley.',
    selfCatering: true,
    highlight: false,
    id: '15',
  },
  {
    establishmentName: "Adam's Place",
    establishmentEmail: 'reservations@adamsplace.no',
    area: 'Litlesotra',
    imageUrl:
      'https://images.unsplash.com/photo-1507038772120-7fff76f79d79?ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80',
    price: '60',
    maxGuests: '3',
    googleLat: 60.383708,
    googleLong: 5.364432,
    description:
      'Rest, relax and explore Bergen from this beautiful home in a quiet neighbourhood.',
    selfCatering: true,
    highlight: false,
    id: '16',
  },
  {
    establishmentName: 'Buena Vista',
    establishmentEmail: 'info@buenavista.com',
    area: 'Salhus',
    imageUrl:
      'https://images.unsplash.com/photo-1523791633495-94ebabc8a795?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
    price: '45',
    maxGuests: '6',
    googleLat: 60.374416,
    googleLong: 5.19431,
    description:
      'With wonderful views of the surrounding area, and a host who is passionate about the area, Buena Vista is a must for those looking for an authentic experience at a reasonable price.',
    selfCatering: false,
    highlight: false,
    id: '17',
  },
];

export const defaultReservations = [
  {
    name: 'TestPerson Personson',
    email: 'testEmail@test.com',
    rooms: 2,
    persons: 3,
  },
  {
    name: 'Remi Gallardo',
    email: 'testEmail@test.com',
    rooms: 1,
    persons: 1,
  },
  {
    name: 'Fredrik Venestad',
    email: 'testEmail@test.com',
    rooms: 4,
    persons: 4,
  },
  {
    name: 'Andreas Tollånes',
    email: 'andreas@tollanes.com',
    rooms: 1,
    persons: 2,
  },
];

export const defaultPosts = [
  {
    title: 'This is a cool place to visit',
    imageDetails: 'The beautiful fjords of Bergen',
    text: lorem,
  },
  {
    title: 'Visit the past of Bergen',
    imageDetails: 'Something about the nature',
    text: lorem,
  },
  {
    title: 'Bergen has some cool buildings',
    imageDetails: 'Picture by Bob Dylan',
    text: lorem,
  },

  {
    title: 'Visit the aquarium in downtown Bergen',
    imageDetails: 'Picture by Bob Ross',
    text: lorem,
  },
];

export const defaultMessages = [
  {
    name: 'Annoying customer',
    email: 'annoying@twat.com',
    message: 'You guys suck and should pay me to live in your housing!',
  },
  {
    name: 'Legitimate Customer',
    email: 'normal@customer.com',
    message: 'What is the menu items for the room service?',
  },
  {
    name: 'Weirdo McWeird',
    email: 'what@what.com',
    message: 'Can I haz cheezburgers',
  },
];
