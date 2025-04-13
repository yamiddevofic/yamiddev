import React from 'react';
import { ArrowRight } from 'lucide-react';
import format from 'date-fns/format';
import es from 'date-fns/locale/es';



const BlogCard = ({ title, excerpt, date, link }) => (
  <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm bg-opacity-50 dark:bg-opacity-50 js-show-on-scroll hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={() => window.open(link, '_blank')}>
    <div className="p-6 flex flex-col flex-grow">
        <h2 
            className="text-xl font-semibold text-gray-800 dark:text-white mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" 
            dangerouslySetInnerHTML={{ __html: title }} 
        />
        
        {excerpt && (
            <div 
            className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3" 
            dangerouslySetInnerHTML={{ __html: excerpt.replace(/<a.*?<\/a>/g, '') }}
            />
        )}
        
        <div class="mt-auto pt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700">
        {date && (
            <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {format(new Date(date), 'dd MMM yyyy', { locale: es })}
            </span>
        )}
        </div>
    </div>
</div>
);

const Blog = ({ posts }) => {
  // Tomar solo los primeros 3 posts
  const recentPosts = posts.slice(0, 3);

  return (
    <section className="pt-[15%] md:pt-[6%] pb-[5%] w-[100%] px-[5%]" id='blog'>
      <h2 className="text-4xl md:text-5xl font-bold text-center py-5 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-500 dark:to-emerald-500 js-show-on-scroll">
        Últimos Artículos
      </h2>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {recentPosts.map((post, index) => (
          <BlogCard 
            key={index}
            title={post.title.rendered}
            excerpt={post.excerpt.rendered}
            date={post.date}
            link={`/blog/${post.slug}`}
          />
        ))}
      </div>
      
      <div className="text-center mt-10 js-show-on-scroll">
        <a 
          href="/blog" 
          className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md transition-colors duration-300"
        >
          Ir a mi blog
          <ArrowRight className="w-5 h-5 ml-2" />
        </a>
      </div>
    </section>
  );
};

export default Blog;