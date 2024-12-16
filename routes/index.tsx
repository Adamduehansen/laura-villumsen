export default async function Home() {
  const response = await fetch(
    "https://wp.lauravillumsen.dk/wp-json/wp/v2/posts",
  );
  const json = await response.json();

  return (
    <div class="w-[500px]">
      {json.map((post) => {
        return <img src={post.featured_image_url} alt="" />;
      })}
    </div>
  );
}
