export default ( context, inject ) => {
  // Utility Functions definitions
  const getStrapiImage = ( url ) => process.env.apiUri + url;

  const markdownImage = ( md ) => {
    let re = /(\!\[.*)(\]\(\/)/gm;
    return md.replace( re, "$1](" + process.env.apiUri + "/" );
  }

  const spreakerEmbed = (id, title, type="e", height="200px", theme="dark" ) => {
    const ref = type === "e" ? "e": "s";
    const resource = type === "e" ? "episode_key" : "show_key";
    let spreakerCode =
      `<a class="spreaker-player" href="https://www.spreaker.com/${ref}/${id}" data-resource="${resource}=${id}"
          data-width="100%" data-height="${height}" data-theme="${theme}" data-playlist="true" data-playlist-continuous="false" data-autoplay="false" data-live-autoplay="false" data-chapters-image="true" data-episode-image-position="left" data-hide-logo="false" data-hide-likes="false" data-hide-comments="false" data-hide-sharing="false" data-hide-download="true">Ascolta ${title} su Spreaker.</a>`;
    return spreakerCode;
  }
  // Inject $hello(msg) in Vue, context and store.
  inject( 'getStrapiImage', getStrapiImage )
  inject( 'markdownImage', markdownImage )
  inject( 'spreakerEmbed', spreakerEmbed )
  // For Nuxt <= 2.12, also add 👇
  context.$getStrapiImage = getStrapiImage
  context.$markdownImage = markdownImage
  context.$spreakerEmbed = spreakerEmbed
}
