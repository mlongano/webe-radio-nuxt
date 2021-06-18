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
