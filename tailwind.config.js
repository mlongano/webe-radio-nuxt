const plugin = require( 'tailwindcss/plugin' );
const defaultTheme = require( 'tailwindcss/defaultTheme' );

module.exports = {
  purge: [],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': [ 'Montserrat', ...defaultTheme.fontFamily.sans ],
    },
    extend: {
      inset: {
        '1/10': '10%',
        '2/10': '20%',
        '3/10': '30%',
        '4/10': '40%',
        '5/10': '50%',
        '6/10': '60%',
        '7/10': '70%',
        '8/10': '80%',
        '9/10': '90%',
        '1/20': '5%',
        '3/20': '15%',
        '5/20': '25%',
        '7/20': '35%',
        '9/20': '45%',
        '11/20': '55%',
        '13/20': '65%',
        '15/20': '75%',
        '17/20': '85%',
        '19/20': '95%',
     },
      spacing: {
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '176': '44rem',
      },
      height: {
        "5v": "5vh",
        "10v": "10vh",
        "20v": "20vh",
        "30v": "30vh",
        "40v": "40vh",
        "50v": "50vh",
        "60v": "60vh",
        "70v": "70vh",
        "80v": "80vh",
        "90v": "90vh",
        "100v": "100vh",
      },
      boxShadow: {
        // One example using shadow-lg -> shadow-lg-invert
        'lg-invert':
          '0 10px 15px -3px rgba(255, 255, 255, 0.1), 0 4px 6px -2px rgba(255, 255, 255, 0.05)',
      },
      colors: {
        'dark-blue': '#26334E',
      },
      fontFamily: {
        'montserrat': [ 'Montserrat', 'sans-serif' ]
      },
      backgroundImage: theme => ( {

        'marconi-podcast': "url('~/assets/images/marconiPodcast.jpg')",
        'larosabianca-podcast': "url('~/assets/images/larosabiancaPodcast.jpg')",
        'tambosi-podcast': "url('~/assets/images/tambosiPodcast.jpg')",

      } )
    },
    darkSelector: '.dark-mode',
  },
  variants: {
    extend: {},
    backgroundColor: [ "dark", "dark-hover", "dark-group-hover", "dark-even", "dark-odd", "hover", "responsive" ],
    borderColor: [ "dark", "dark-hover", "dark-focus", "dark-focus-within", "hover", "responsive" ],
    textColor: [ "dark", "dark-hover", "dark-active", "hover", "responsive" ],
    // Control the shadows on dark mode to invert colors
    boxShadow: [ 'responsive', 'group-hover', 'focus-within', 'hover', 'focus', 'dark' ],
  },
  plugins: [
    require( 'tailwindcss-dark-mode' )(),
    require( '@tailwindcss/aspect-ratio' ),
    plugin( function ( { addBase, theme } ) {
      addBase( {
        'h1': { fontSize: theme( 'fontSize.2xl' ), fontWeight: theme( 'fontWeight.bold' )},
        'h2': { fontSize: theme( 'fontSize.xl' ) },
        'h3': { fontSize: theme( 'fontSize.lg' ) },
      } )
    } ),
  ],
}
