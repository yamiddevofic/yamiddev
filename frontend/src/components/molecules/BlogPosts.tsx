import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import React from 'react';  

type Post = {
  id: number;
  title: { rendered: string };
  slug: string;
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  modified: string;
  featured_media: string | null;
  _embedded?: any;
  categories?: number[];
};

export default function BlogPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://yamid.dev/wordpress/wp-json/wp/v2/posts?_embed')
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((post: any) => ({
          ...post,
          featured_media: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null
        }));
        setPosts(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching posts:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center py-12">Cargando artículos...</p>;

  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-300">No hay artículos disponibles</h2>
        <p className="mt-2 text-gray-500">Vuelve pronto para ver nuevos contenidos.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {posts.map((post, index) => (
        <article key={post.id} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm bg-opacity-50 dark:bg-opacity-50 overflow-hidden h-full flex flex-col transform transition duration-300 hover:-translate-y-1 hover:shadow-xl">
          <a href={`/blog/${post.slug}`} className="flex flex-col h-full">
            {post.featured_media && (
              <div className="relative h-48 overflow-hidden">
                <img src={post.featured_media} alt={post.title.rendered} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
              
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered.replace(/<a.*?<\/a>/g, '') }} />
              
              <div className="mt-auto pt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700">
                <span className="flex items-center">
                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {format(new Date(post.date), 'dd MMM yyyy', { locale: es })}
                </span>

                <span className="flex items-center text-blue-500 font-medium">
                  Leer más
                  <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </div>
          </a>
        </article>
      ))}
    </div>
  );
}
