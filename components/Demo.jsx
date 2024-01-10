// pages/index.js
'use client'
import { useState } from 'react'

const rapidApiKey = process.env.NEXT_PUBLIC_API_ARTICLE_KEY

function Demo() {
  const [articleUrl, setArticleUrl] = useState('')
  const [data, setdata] = useState(null)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://article-extractor-and-summarizer.p.rapidapi.com/summarize?url=${encodeURIComponent(
          articleUrl,
        )}&length=3`,
        {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': rapidApiKey,
            'X-RapidAPI-Host':
              'article-extractor-and-summarizer.p.rapidapi.com',
          },
        },
      )

      if (!response.ok) {
        throw new Error(
          `Failed to fetch data: ${response.status} ${response.statusText}`,
        )
      }

      const data = await response.json()
      setdata(data)
      setError(null)
    } catch (error) {
      console.error('Error fetching data:', error)
      setError('Error fetching data. Please try again.')
      setdata(null)
    }
  }

  return (
    <div>
      <label>
        Article URL:
        <input
          type="text"
          value={articleUrl}
          onChange={(e) => setArticleUrl(e.target.value)}
        />
      </label>
      <button onClick={fetchData}>Fetch data</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {data && (
        <div>
          <h2>data:</h2>
          <p>{data.summary}</p>
        </div>
      )}
    </div>
  )
}

export default Demo
