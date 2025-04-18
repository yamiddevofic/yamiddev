export async function getPosts() {
  const url = 'https://yamid.dev/wordpress/wp-json/wp/v2/posts?_embed';
  const cacheKey = 'wordpress-posts';
  
  try {
      console.log('Fetching WordPress posts from:', url);
      
      const response = await fetch(url, {
          headers: {
              'Content-Type': 'application/json',
          }
      });
      
      if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response:', {
              status: response.status,
              statusText: response.statusText,
              url: response.url,
              text: errorText
          });
          return [];
      }
      
      const data = await response.json();
      
      // Formatear datos para un mejor manejo
      const formattedPosts = data.map((post: any) => ({
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          date: post.date,
          modified: post.modified,
          featured_media: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null
      }));
      
      return formattedPosts;
  } catch (error) {
      console.error('Network error fetching posts:', error);
      return [];
  }
}