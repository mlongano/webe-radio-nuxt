<template>
  <div class="px-6">
    <BackButton />
    <main>
      <h1 class="text-2xl mb-6">
        {{ posts.data[0].attributes.title }}
      </h1>

      <div>
        <img
          class="shadow-lg rounded-lg max-w-prose"
          alt="Article image"
          v-if="posts.data[0].attributes.image"
          :src="$getStrapiImage(posts.data[0].attributes.image.data.attributes.url)"
        />
      </div>
      <markdown-it-vue
        class="text-gray-700 text-3xl p-2 mt-0.5"
        :content="article"
      />

      <div v-if="related">
        <PostList :posts="related" />
      </div>
      <div class="">
        <Tags :post="posts.data[0]" />
      </div>
    </main>
  </div>
</template>

<script>
import postQuery from "~/apollo/queries/post/post";
import Tags from "~/components/Tags";
import PostList from "~/components/PostList";
import BackButton from "~/components/BackButton";

export default {
  components: {
    Tags,
    PostList,
    BackButton,
  },
  data() {
    return {
      posts: [
        {
          tags: [],
        },
      ],
    };
  },
  apollo: {
    posts: {
      prefetch: true,
      query: postQuery,
      variables() {
        return { slug: this.$route.params.slug };
      },
    },
  },
  computed: {
    article() {
      let article = this.posts?.data[0]?.attributes?.article || "";
      return article;
    },
    related() {
      let tags = this.posts?.data[0]?.attributes?.tags;
      let currentPost = JSON.stringify({
          title: this.posts?.data[0]?.attributes?.title,
          slug: this.posts?.data[0]?.attributes?.slug,
          __typename:"Post",
          });
      let posts = [];
      if (!tags?.data) return posts;
      tags.data.forEach((tag) => {
        posts.push(...tag?.attributes?.posts?.data);
      });

      posts = Array.from(
        new Set(posts.map((object) => JSON.stringify(object)))
      )
      .filter( post => post !== currentPost)
      .map((serialized) => JSON.parse(serialized));
      return posts;
    },
  },
};
</script>
