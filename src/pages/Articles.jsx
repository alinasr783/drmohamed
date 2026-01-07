import React, { useState, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { useArticles } from '../hooks/useArticles'

export default function ArticlesPage() {
  const { isRTL } = useLanguage()
  const { articles, loading, error } = useArticles()
  
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  
  const filteredAndSortedArticles = useMemo(() => {
    let result = articles.filter(article => 
      article.title_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.title_ar.includes(searchTerm)
    )
    
    // Sort articles
    if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    } else if (sortBy === 'oldest') {
      result.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    } else if (sortBy === 'title') {
      result.sort((a, b) => a.title_en.localeCompare(b.title_en))
    }
    
    return result
  }, [articles, searchTerm, sortBy])
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const articlesPerPage = 6
  
  const totalPages = Math.ceil(filteredAndSortedArticles.length / articlesPerPage)
  const startIndex = (currentPage - 1) * articlesPerPage
  const endIndex = startIndex + articlesPerPage
  const currentArticles = filteredAndSortedArticles.slice(startIndex, endIndex)
  
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page)
    // Scroll to top of articles section
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])
  
  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-slate-600">Loading articles...</p>
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
            <h2 className="text-2xl font-bold mb-2">Error Loading Articles</h2>
            <p className="text-slate-600 mb-6">Failed to load articles: {error}</p>
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
  
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container">
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Medical Articles</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Stay informed with our latest medical insights, research, and healthcare tips.
          </p>
        </div>
        
        {/* Search and Filter Section */}
        <div className="mb-10 bg-white rounded-xl p-6 shadow-card">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <div className="w-full md:w-1/3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1) // Reset to first page when searching
                  }}
                />
                <i className="fa-solid fa-search absolute left-3 top-3 text-slate-400"></i>
              </div>
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <select 
                className="px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value)
                  setCurrentPage(1) // Reset to first page when sorting
                }}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title A-Z</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Articles Grid */}
        {currentArticles.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentArticles.map((article) => (
                <ArticleCard key={article.id} article={article} isRTL={isRTL} />
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 rounded-lg border border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
                  >
                    <i className="fa-solid fa-chevron-left"></i>
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === page
                          ? 'bg-brand-600 text-white'
                          : 'border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 rounded-lg border border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
                  >
                    <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </nav>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <i className="fa-solid fa-file-lines text-5xl text-slate-300 mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">No articles found</h3>
            <p className="text-slate-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}

const ArticleCard = React.memo(({ article, isRTL }) => {
  const title = isRTL ? article.title_ar : article.title_en
  const formattedDate = new Date(article.created_at).toLocaleDateString(
    isRTL ? 'ar-EG' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )
  
  return (
    <Link 
      to={`/article/${article.id}`} 
      className="card group overflow-hidden transition-all duration-300 hover:shadow-soft hover:-translate-y-1"
    >
      {article.image_url ? (
        <div className="aspect-video overflow-hidden">
          <img 
            src={article.image_url} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="aspect-video bg-gradient-to-r from-brand-500 to-brand-700 flex items-center justify-center">
          <i className="fa-solid fa-newspaper text-white text-4xl"></i>
        </div>
      )}
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-brand-100 text-brand-800">
            {formattedDate}
          </span>
        </div>
        
        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-brand-700 transition-colors">
          {title}
        </h3>
        
        <button className="btn btn-outline btn-sm mt-3 group-hover:bg-brand-600 group-hover:text-white group-hover:border-brand-600">
          Read More
        </button>
      </div>
    </Link>
  )
})