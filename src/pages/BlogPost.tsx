import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { PortableText } from '@portabletext/react';
import { ArrowLeft } from 'lucide-react';
import { sanityClient } from '../lib/sanity';

interface BlogPost {
  _id: string;
  title: string;
  publishedAt: string;
  category: { title: string; slug: { current: string } } | null;
  body: any;
}

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
    
    if (!projectId) {
      setError('Sanity Project ID is missing.');
      setLoading(false);
      return;
    }

    const query = `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      publishedAt,
      category-> { title, slug },
      body
    }`;

    sanityClient
      .fetch(query, { slug })
      .then((data) => {
        if (!data) {
          setError('Post not found.');
        } else {
          setPost(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch post.');
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <div className="font-mono text-sm tracking-widest text-white/50 uppercase animate-pulse">Loading post...</div>;
  }

  if (error || !post) {
    return (
      <div className="space-y-6">
        <Link to="/blog" className="inline-flex items-center space-x-2 text-white/50 hover:text-white transition-colors">
          <ArrowLeft size={16} />
          <span className="font-mono text-xs tracking-widest uppercase">Back to Blog</span>
        </Link>
        <div className="p-6 border border-red-500/30 bg-red-500/10 rounded-sm space-y-2">
          <h3 className="font-serif text-xl text-red-400">Error</h3>
          <p className="font-light text-white/70 text-sm leading-relaxed">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-16 pb-24 max-w-3xl"
    >
      <Link to="/blog" className="inline-flex items-center space-x-2 text-white/50 hover:text-white transition-colors">
        <ArrowLeft size={16} />
        <span className="font-mono text-xs tracking-widest uppercase">Back to Blog</span>
      </Link>

      <header className="space-y-6">
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
        <h1 className="font-serif text-4xl md:text-6xl font-light tracking-tighter leading-tight">
          {post.title}
        </h1>
        <div className="h-px w-24 bg-white/20"></div>
      </header>

      <div className="prose prose-invert prose-lg max-w-none font-light text-white/80 leading-relaxed prose-headings:font-serif prose-headings:font-light prose-a:text-white prose-a:underline-offset-4 hover:prose-a:text-white/80 transition-colors">
        <PortableText value={post.body} />
      </div>
    </motion.article>
  );
}
