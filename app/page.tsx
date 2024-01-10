import AiForm from '@/components/ai-form'
import Hero from '@/components/hero'
import { SiteHeader } from '@/components/site-header'

export default function IndexPage() {
  return (
    <section className=" bg-gradient-to-br from-[#2d3f79] to-[#1c2a5e] min-h-screen -z-20">
      <SiteHeader />
      <div className='mt-[3rem]'>
        <Hero />
        <AiForm />
      </div>
    </section>
  )
}
