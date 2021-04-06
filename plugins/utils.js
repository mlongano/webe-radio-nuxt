export default ( context, inject ) => {
  // Utility Functions definitions
  const getStrapiImage = ( url ) => process.env.apiUri + url;

  const markdownImage = ( md ) => {
    let re = /(\!\[.*)(\]\(\/)/gm;
    return md.replace( re, "$1](" + process.env.apiUri + "/" );
  }

  // Inject $hello(msg) in Vue, context and store.
  inject( 'getStrapiImage', getStrapiImage )
  inject( 'markdownImage', markdownImage )
  // For Nuxt <= 2.12, also add 👇
  context.$getStrapiImage = getStrapiImage
  context.$markdownImage = markdownImage
}
