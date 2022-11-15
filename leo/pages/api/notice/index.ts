export async function getStaticProps() {
  const res = await fetch(`${process.env.API_URL}/posts`);
  const posts = await res.json();

  return {
    props: { posts }
  };
}
