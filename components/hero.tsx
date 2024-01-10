import React from 'react'

function HeroSection() {
  return (
    <section className="w-full flex justify-center mb-[1rem] items-center flex-col">
      <h1 className="font-calsans md:text-[4.5rem] text-[2.5rem] justify-center flex lg:flex-row flex-col text-center">
        <span className="bg-clip-text bg-gradient-to-r items-center flex-1 from-purple-600 to-blue-400 text-transparent">
          GPT-4{' '}
        </span>{' '}
        &nbsp;Articles Summarizer
      </h1>
      <h2 className="md:text-lg text-sm lg:max-w-[70%] max-w-full container font-geist text-center ">
        Transform any article URL into a bite-sized summary with our AI magic!
        Paste the link, and voilà - instant clarity. Simplify, summarize,
        succeed
      </h2>
    </section>
  )
}

export default HeroSection
