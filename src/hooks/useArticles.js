import { useState, useEffect } from 'react'
import { listArticles, getArticleById } from './supabase'

export function useArticles() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true)
        const data = await listArticles()
        setArticles(data)
        setError(null)
      } catch (err) {
        console.error('Error fetching articles:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  return { articles, loading, error }
}

export function useArticle(id) {
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return

    async function fetchArticle() {
      try {
        setLoading(true)
        const data = await getArticleById(id)
        setArticle(data)
        setError(null)
      } catch (err) {
        console.error('Error fetching article:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [id])

  return { article, loading, error }
}