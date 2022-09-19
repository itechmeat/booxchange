import { FC, useState } from 'react'
import router from 'next/router'
import { Alert, Button, Form, Input, InputNumber, Select } from 'antd'
import { useAppSelector } from '../../store/hooks'
import { Book, NewBook, emptyBook, postBookAsync, updateBookAsync } from '../../api/books'

type BookFormProps = {
  book?: Book
}

export const BookForm: FC<BookFormProps> = ({ book }) => {
  const [editedBook, setEditedBook] = useState<NewBook>(book || emptyBook)
  const { user } = useAppSelector((state) => state.user)  

  const [error, setError] = useState<string>('')

  const editBook = (key: string, value: any): void => {
    setEditedBook({
      ...editedBook,
      [key]: value,
    })
  }

  const onFinish = async () => {
    setError('')
    let result
    if (!book?.id) {
      result = await postBookAsync({
        ...editedBook,
        country_id: 'af26e340-53b1-49e8-bb3b-ae079d8d6afd',
        owner_id: user?.id,
      })
    } else {
      result = await updateBookAsync(book.id, editedBook)
    }
    
    if (result?.id) {
      router.push(`/books/${result.id}`)
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.error('Failed:', errorInfo)
  }

  const { Option } = Select
  const selectAfter = (
    <Select defaultValue="USD" style={{ width: 60 }}>
      <Option value="USD">$</Option>
      <Option value="EUR">€</Option>
      <Option value="GBP">£</Option>
      <Option value="CNY">¥</Option>
    </Select>
  )

  return (
    <div>

      {error && <Alert message={error} type="error" />}

      <br />

      <h1>Add new book</h1>

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="ISBN"
          name="isbn"
          initialValue={editedBook.isbn}
          >
          <Input onChange={(value) => editBook('isbn', value?.target?.value)} />
        </Form.Item>

        <Form.Item
          label="Title"
          name="title"
          initialValue={editedBook.title}
          rules={[{ required: true, message: 'Please input a title of the book!' }]}
        >
          <Input onChange={(value) => editBook('title', value?.target?.value)} />
        </Form.Item>

        <Form.Item
          label="Country"
          name="country"
          initialValue={editedBook.country_id}
        >
          <Input onChange={(value) => editBook('country_id', value?.target?.value)} />
        </Form.Item>

        <Form.Item
          label="City"
          name="city"
          initialValue={editedBook.city_id}
        >
          <Input onChange={(value) => editBook('city_id', value?.target?.value)} disabled />
        </Form.Item>

        <Form.Item
          label="Language of the book"
          name="language"
          initialValue={editedBook.language_id}
        >
          <Input onChange={(value) => editBook('language_id', value?.target?.value)} disabled />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          initialValue={editedBook.description}
        >
          <Input.TextArea onChange={(value) => editBook('description', value?.target?.value)} />
        </Form.Item>

        <Form.Item label="Price">
          <InputNumber addonAfter={selectAfter} defaultValue={editedBook.price} onChange={(value) => editBook('price', value || 0)} />
        </Form.Item>

        <Form.Item label="Year">
          <InputNumber defaultValue={editedBook.year} onChange={(value) => editBook('year', value || 0)} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
