# Article Summarizer using GPT-4

This is a simple AI summarizer built with **Next.js**, **Tailwind CSS**, and **TypeScript**. It's deployed on **Vercel** and powered by **RapidAPI**.

## Setup and Usage

Follow these steps to set up and run the application:

1. Clone the repository:
    ```bash
    git clone https://github.com/AntonyJudeShaman/article-summarizer.git
    ```

2. Install the dependencies. This project uses `pnpm`:
    ```bash
    pnpm i
    ```

3. Create a `.env` file and set your RapidAPI key:
    ```bash
    echo "NEXT_PUBLIC_API_ARTICLE_KEY=<RAPID-API-KEY>" > .env
    ```
    You can get your API key from [RapidAPI](https://rapidapi.com/restyler/api/article-extractor-and-summarizer)

4. To run the application, use the following command:
    ```bash
    pnpm dev
    ```
    or
    ```bash
    npm dev
    ```
