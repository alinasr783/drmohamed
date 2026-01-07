import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'
import { useArticles } from '../../hooks/useArticles'

export default function Articles() {
  const { isRTL } = useLanguage()
  const { articles, loading, error } = useArticles()
  
  // Get only articles that should be shown on homepage, limited to 3
  const homepageArticles = useMemo(() => {
    return articles
      .filter(article => article.show_on_homepage)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 3)
  }, [articles])
  
  if (loading) return null
  if (error) return null
  if (homepageArticles.length === 0) return null
  
  // Featured article (first one)
  const featuredArticle = homepageArticles[0]
  // Other articles
  const otherArticles = homepageArticles.slice(1)
  
  return (
    <section id="articles" className="section">
      <div className="container">
        <div className="flex justify-between items-end mb-6">
          <h2 className="section-title">Our Latest Articles</h2>
          <Link to="/articles" className="text-brand-700 hover:text-brand-800 font-medium flex items-center">
            View all articles
            <i className="fa-solid fa-arrow-right ml-2 text-sm"></i>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Featured Article */}
          <Link 
            to={`/article/${featuredArticle.id}`} 
            className="card md:col-span-2 grid md:grid-cols-2 gap-4 items-center group overflow-hidden transition-all duration-300 hover:shadow-soft hover:-translate-y-1"
          >
            {featuredArticle.image_url ? (
              <div className="h-40 rounded-lg overflow-hidden">
                <img 
                  src={featuredArticle.image_url} 
                  alt={isRTL ? featuredArticle.title_ar : featuredArticle.title_en}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ) : (
              <div className="h-40 rounded-lg bg-gradient-to-r from-brand-500 to-brand-700 flex items-center justify-center">
                <i className="fa-solid fa-newspaper text-white text-4xl"></i>
              </div>
            )}
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-brand-100 text-brand-800">
                  {new Date(featuredArticle.created_at).toLocaleDateString(
                    isRTL ? 'ar-EG' : 'en-US', 
                    { year: 'numeric', month: 'short', day: 'numeric' }
                  )}
                </span>
              </div>
              <h3 className="font-bold text-lg mb-2 group-hover:text-brand-700 transition-colors">
                {isRTL ? featuredArticle.title_ar : featuredArticle.title_en}
              </h3>
              <button className="btn btn-outline mt-3 group-hover:bg-brand-600 group-hover:text-white group-hover:border-brand-600">
                Read more
              </button>
            </div>
          </Link>
          
          {/* Other Articles */}
          {otherArticles.map((article) => (
            <Link 
              key={article.id} 
              to={`/article/${article.id}`} 
              className="card p-5 group overflow-hidden transition-all duration-300 hover:shadow-soft hover:-translate-y-1"
            >
              {article.image_url ? (
                <div className="h-28 rounded-lg overflow-hidden mb-3">
                  <img 
                    src={article.image_url} 
                    alt={isRTL ? article.title_ar : article.title_en}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="h-28 rounded-lg bg-gradient-to-r from-brand-500 to-brand-700 flex items-center justify-center mb-3">
                  <i className="fa-solid fa-newspaper text-white text-2xl"></i>
                </div>
              )}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-brand-100 text-brand-800">
                  {new Date(article.created_at).toLocaleDateString(
                    isRTL ? 'ar-EG' : 'en-US', 
                    { year: 'numeric', month: 'short', day: 'numeric' }
                  )}
                </span>
              </div>
              <h3 className="font-bold mt-3 group-hover:text-brand-700 transition-colors line-clamp-2">
                {isRTL ? article.title_ar : article.title_en}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}