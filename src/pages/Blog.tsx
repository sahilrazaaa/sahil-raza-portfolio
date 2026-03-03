import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { sanityClient } from '../lib/sanity';

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  category: { title: string; slug: { current: string } } | null;
  excerpt: string;
}

export function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
    
    if (!projectId) {
      setError('Sanity Project ID is missing. Please configure VITE_SANITY_PROJECT_ID in your environment variables.');
      setLoading(false);
      return;
    }

    const query = `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      category-> { title, slug },
      excerpt
    }`;

    sanityClient
      .fetch(query)
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Sanity fetch error:', err);
        const message = err?.message || err?.toString?.() || 'Unknown error';
        setError(`Failed to fetch posts: ${message}. Check CORS origins at sanity.io/manage and ensure the schema is deployed.`);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-16 pb-24">
      <header className="space-y-4">
        <h1 className="font-serif text-5xl md:text-7xl font-light tracking-tighter">Blog</h1>
        <div className="h-px w-24 bg-white/20"></div>
        <p className="font-mono text-sm tracking-widest text-white/50 uppercase pt-4">Thoughts, Essays, and Updates</p>
      </header>

      <div className="space-y-12 max-w-3xl">
        {loading && (
          <p className="font-mono text-sm tracking-widest text-white/50 uppercase animate-pulse">Loading posts...</p>
        )}

        {error && (
          <div className="p-6 border border-red-500/30 bg-red-500/10 rounded-sm space-y-2">
            <h3 className="font-serif text-xl text-red-400">Configuration Required</h3>
            <p className="font-light text-white/70 text-sm leading-relaxed">{error}</p>
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <p className="font-light text-white/60">No posts found. Start writing in your Sanity Studio!</p>
        )}

        {!loading && !error && posts.map((post, i) => (
          <motion.article 
            key={post._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group block border-b border-white/10 pb-12"
          >
            <Link to={`/blog/${post.slug.current}`} className="flex flex-col space-y-4 cursor-pointer">
              <div className="flex items-center space-x-4">
                <span className="font-mono text-xs tracking-widest text-white/40">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
                {post.category && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-white/20"></span>
                    <span className="font-mono text-xs tracking-widest text-white/60 uppercase">{post.category.title}</span>
                  </>
                )}
              </div>
              <h2 className="font-serif text-3xl md:text-4xl italic group-hover:text-white/80 transition-colors">
                {post.title}
              </h2>
              <p className="font-light text-white/60 leading-relaxed">
                {post.excerpt}
              </p>
              <span className="font-mono text-xs tracking-widest text-white/40 uppercase group-hover:text-white transition-colors pt-4 flex items-center space-x-2">
                <span>Read More</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
