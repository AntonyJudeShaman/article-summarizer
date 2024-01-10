// pages/index.js
'use client'
import { FormEvent, FormEventHandler, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Input } from '@/components/ui/input'
import { Copy, Check, History } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Icons } from './icons'
import { DialogClose } from '@radix-ui/react-dialog'

const rapidApiKey = process.env.NEXT_PUBLIC_API_ARTICLE_KEY

interface Article {
  url: string
  summary: string
}

function AiForm() {
  const [article, setArticle] = useState({
    url: '',
    summary: '',
  })
  const [data, setdata] = useState(null)
  const [error, setError] = useState<string>('')
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [allArticles, setAllArticles] = useState<Article[]>([])
  const [copied, setCopied] = useState<boolean | string>(false)

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem('articles') || '[]',
    )

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage)
    }
  }, [])

  const fetchData = async (e: FormEvent) => {
    e.preventDefault()
    setIsFetching(true)

    const existingArticle = allArticles.find((item) => item.url === article.url)

    if (existingArticle) return setArticle(existingArticle)

    try {
      const response = await fetch(
        `https://article-extractor-and-summarizer.p.rapidapi.com/summarize?url=${encodeURIComponent(
          article.url,
        )}&length=3`,
        {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': rapidApiKey as string,
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
      if (data) {
        const newArticle = { ...article, summary: data.summary }
        const updatedAllArticles = [newArticle, ...allArticles]

        // update state and local storage
        setArticle(newArticle)
        setAllArticles(updatedAllArticles)
        localStorage.setItem('articles', JSON.stringify(updatedAllArticles))
      }
      setdata(data)
      setError('')
      setIsFetching(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setError('Oops! Something went wrong. Please try again later.')
      setIsFetching(false)
    }
  }

  const handleCopy = (copyUrl: string) => {
    setCopied(copyUrl)
    navigator.clipboard.writeText(copyUrl)
    setTimeout(() => setCopied(true), 3000)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      fetchData(e)
    }
  }

  return (
    <div className="container flex justify-center flex-col mx-auto items-center">
      <form
        onSubmit={fetchData}
        className=" flex justify-center  flex-col items-center"
      >
        <div className=" flex flex-row">
          <Input
            placeholder="Enter Article URL"
            type="text"
            onKeyDown={handleKeyDown}
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            className="md:w-[35rem] sm:w-[30rem] lg:w-[50rem] w-[18rem] bg-white/80 text-zinc-950 font-sans font-semibold"
          />
          <div>
            <AlertDialog>
              <AlertDialogTrigger className="ml-2">
                <div className='bg-white/80 rounded-md text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4'><History/></div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex justify-between">
                    Article URL History
                    <AlertDialogCancel className=" bg-transparent hover:bg-transparent hover:text-blue-400 border-none">
                      <Icons.close className="md:-mt-2 -mt-6" />
                    </AlertDialogCancel>
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription className="w-full max-w-[25rem]">
                  {allArticles.reverse().map((item, index) => (
                    <div
                      key={`link-${index}`}
                      onClick={() => setArticle(item)}
                      className="link_card"
                    >
                      <div
                        className="copy_btn mt-2"
                        onClick={() => handleCopy(item.url)}
                      >
                        <AlertDialogCancel className="inner flex flex-row justify-start cursor-pointer bg-background p-2 px-2 rounded-xl font-geist border border-gray-600 text-blue-50 font-medium h-[60px] lg:w-[28rem] sm:w-[27rem] w-[20rem] items-center overflow-auto whitespace-nowrap">
                          <span className="flex items-center">
                            {copied === item.url ? (
                              <Check className="h-5 w-5 mr-2" />
                            ) : (
                              <Copy className="h-5 w-5 mr-2" />
                            )}
                          </span>
                          <span className="flex items-center">{item.url}</span>
                        </AlertDialogCancel>
                      </div>
                    </div>
                  ))}
                </AlertDialogDescription>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <Button className="max-w-[40%] mt-5" type="submit">
          Summarize
        </Button>
      </form>

      {error && !isFetching && (
        <div className="font-geist font-bold text-white rounded-3xl px-4 py-2 border border-red-200 bg-red-400/20 mt-5 text-center">
          Something went wrong. Please try again later.
        </div>
      )}
      {article && (
        <div className="my-10 max-w-full flex justify-center items-center">
          {isFetching ? (
            <div className=" flex flex-col justify-center items-center">
              <div className="typewriter mb-3">
                <div className="slide">
                  <i></i>
                </div>
                <div className="paper"></div>
                <div className="keyboard"></div>
              </div>
              <p className="font-bold font-geist">Generating summary...</p>
            </div>
          ) : error ? (
            <p className="font-inter font-bold text-black text-center"></p>
          ) : (
            article.summary && (
              <div className="flex flex-col gap-3 container bg-blue-950 p-8 border border-gray-600 shadow-2xl rounded-3xl">
                <h2 className="font-calsans font-bold text-3xl">
                  Article{' '}
                  <span className="bg-clip-text bg-gradient-to-r items-center from-purple-600 to-blue-400 text-transparent font-calsans">
                    Summary
                  </span>
                </h2>
                <div className="">
                  <p className="font-geist leading-6 text-md">
                    {article.summary}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  )
}

export default AiForm
