import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './Blog.css';
import { ArrowRight, BookOpen } from 'lucide-react';

const mockPosts = [
  {
    id: 1,
    title: 'Introducing FormFlow 2.0',
    description: 'The ultimate form builder and backend. See what changed and how you can port your existing forms seamlessly.',
    published_at: '2026-03-22T00:00:00Z',
    tag_list: ['Product Updates'],
    url: '#'
  },
  {
    id: 2,
    title: 'How to block spam submissions effectively',
    description: 'Spam is a major issue for HTML forms. Learn how our AI-driven spam protection keeps your inbox clean.',
    published_at: '2026-03-15T00:00:00Z',
    tag_list: ['Guides'],
    url: '#'
  },
  {
    id: 3,
    title: 'Designing forms that convert',
    description: 'Best practices for UX and UI to maximize the submission rate of your contact and lead generation forms.',
    published_at: '2026-03-02T00:00:00Z',
    tag_list: ['Design'],
    url: '#'
  }
];

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://dev.to/api/articles?username=kaddev');
        if (response.ok) {
          const data = await response.json();
          // Fallback to mock posts if no articles are published yet, 
          // just to keep the UI looking good until you write something!
          setPosts(data.length > 0 ? data : mockPosts);
        } else {
          setPosts(mockPosts);
        }
      } catch (error) {
        console.error('Failed to fetch Dev.to articles:', error);
        setPosts(mockPosts);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="blog-section">
        <div className="blog-header">
          <h1>@kaddev Blog</h1>
          <p>Product updates, guides, and insights to help you build better forms, imported directly from Dev.to.</p>
          <a href="https://dev.to/kaddev" target="_blank" rel="noopener noreferrer" className="dev-profile-btn" style={{marginTop: '20px', display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#000', color: '#fff', padding: '10px 20px', borderRadius: '6px', fontWeight: '600', textDecoration: 'none'}}>
            <BookOpen size={18} /> View My Dev.to Profile
          </a>
        </div>
        
        {loading ? (
          <div style={{textAlign: 'center', padding: '40px', color: '#6b7280'}}>
            Loading articles from Dev.to...
          </div>
        ) : (
          <div className="blog-grid">
            {posts.map((post) => (
              <article key={post.id} className="blog-card" style={{display: 'flex', flexDirection: 'column'}}>
                {post.cover_image && (
                  <img src={post.cover_image} alt={post.title} style={{width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px 12px 0 0', marginBottom: '16px'}} />
                )}
                <div className="blog-category" style={{marginBottom: '12px'}}>
                  {post.tag_list && post.tag_list.length > 0 ? post.tag_list[0] : 'Article'}
                </div>
                <h2>{post.title}</h2>
                <p className="blog-excerpt" style={{flex: 1}}>{post.description}</p>
                <div className="blog-meta" style={{marginTop: '20px'}}>
                  <span>{formatDate(post.published_at)}</span>
                  <a href={post.url} target="_blank" rel="noopener noreferrer" className="read-more" style={{textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px'}}>
                    Read on Dev.to <ArrowRight size={14} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Blog;
