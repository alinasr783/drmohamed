import React, { useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { useArticle } from '../hooks/useArticles'
import { useArticles } from '../hooks/useArticles'

export default function ArticleDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isRTL } = useLanguage()
  const { article, loading, error } = useArticle(id)
  const { articles } = useArticles()
  
  // Memoize related articles calculation
  const relatedArticles = useMemo(() => {
    if (!article || !articles) return []
    return articles
      .filter(a => a.id !== article.id)
      .slice(0, 3)
  }, [article, articles])
  
  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-slate-600">Loading article...</p>
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="min-h-screen pt-20 pb-16">
        <div className="container">
          <div className="text-center py-16">
            <i className="fa-solid fa-exclamation-circle text-5xl text-red-500 mb-4"></i>
            <h2 className="text-2xl font-bold mb-2">Error Loading Article</h2>
            <p className="text-slate-600 mb-6">Failed to load article: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn btn-primary"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  if (!article) {
    return (
      <div className="min-h-screen pt-20 pb-16">
        <div className="container">
          <div className="text-center py-16">
            <i className="fa-solid fa-file-circle-xmark text-5xl text-slate-300 mb-4"></i>
            <h2 className="text-2xl font-bold mb-2">Article Not Found</h2>
            <p className="text-slate-600 mb-6">The article you're looking for doesn't exist or has been removed.</p>
            <Link to="/articles" className="btn btn-primary">
              Back to Articles
            </Link>
          </div>
        </div>
      </div>
    )
  }
  
  const title = isRTL ? article.title_ar : article.title_en
  const content = isRTL ? article.content_ar : article.content_en
  
  const formattedDate = new Date(article.created_at).toLocaleDateString(
    isRTL ? 'ar-EG' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )
  
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container">
        <div className="mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-slate-600 hover:text-brand-700 transition-colors"
          >
            <i className="fa-solid fa-arrow-left mr-2"></i>
            Back
          </button>
        </div>
        
        <article className="bg-white rounded-xl shadow-card overflow-hidden">
          {/* Article Header */}
          <header className="p-6 md:p-8 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-sm font-medium px-3 py-1 rounded-full bg-brand-100 text-brand-800">
                {formattedDate}
              </span>
              <span className="text-sm font-medium px-3 py-1 rounded-full bg-slate-100 text-slate-800">
                Medical Insight
              </span>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold mb-4">{title}</h1>
            
            <div className="flex items-center text-slate-600">
              <div className="flex items-center">
                <i className="fa-solid fa-user-doctor mr-2"></i>
                <span>Dr. Mohamed Hamdi Elgawadi</span>
              </div>
              <span className="mx-2">•</span>
              <div className="flex items-center">
                <i className="fa-solid fa-clock mr-2"></i>
                <span>{Math.ceil(content.split(' ').length / 200)} min read</span>
              </div>
            </div>
          </header>
          
          {/* Article Image */}
          {article.image_url && (
            <div className="w-full h-64 md:h-96 overflow-hidden">
              <img 
                src={article.image_url} 
                alt={title}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          )}
          
          {/* Article Content */}
          <div className="p-6 md:p-8">
            <div 
              className="prose prose-lg max-w-none article-content"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </article>
        
        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <RelatedArticleCard 
                  key={relatedArticle.id} 
                  article={relatedArticle} 
                  isRTL={isRTL}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

const RelatedArticleCard = React.memo(({ article, isRTL }) => {
  const title = isRTL ? article.title_ar : article.title_en
  const formattedDate = new Date(article.created_at).toLocaleDateString(
    isRTL ? 'ar-EG' : 'en-US',
    { year: 'numeric', month: 'short', day: 'numeric' }
  )
  
  return (
    <Link 
      to={`/article/${article.id}`}
      className="card overflow-hidden transition-all duration-300 hover:shadow-soft hover:-translate-y-1"
    >
      {article.image_url ? (
        <div className="aspect-video overflow-hidden">
          <img 
            src={article.image_url} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="aspect-video bg-gradient-to-r from-brand-500 to-brand-700 flex items-center justify-center">
          <i className="fa-solid fa-newspaper text-white text-3xl"></i>
        </div>
      )}
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-brand-100 text-brand-800">
            {formattedDate}
          </span>
        </div>
        
        <h3 className="font-bold mb-2 line-clamp-2 group-hover:text-brand-700 transition-colors">
          {title}
        </h3>
      </div>
    </Link>
  )
})