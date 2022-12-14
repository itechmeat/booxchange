import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { Book, fetchBookAsync } from '../../../api/books'

const BookPage: NextPage = () => {
  const router = useRouter()
  const { pid } = router.query

  const [book, setBook] = useState<Book | null>(null)

  const loadBook = async (id: any) => {
    const response = await fetchBookAsync(id)
    if (response) {
      setBook(response)
    }
  }

  useEffect(() => {
    if (pid) {
      loadBook(pid)
    }
  }, [pid])

  return (
    <>
      <Head>
        <title>Book {pid}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {book && <div>
        <h1>Book: {book.title}</h1>
        <p>{book.description}</p>
      </div>}
      <p>
        <Link href={`/books/${pid}/edit`}>Edit</Link>
      </p>
      <p>
        <Link href='/books'>All Books</Link>
      </p>
    </>
  )
}

export default BookPage
