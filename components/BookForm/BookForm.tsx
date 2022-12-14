import { FC, useState, useEffect, useCallback } from 'react'
import router from 'next/router'
import { Alert, Button, Form, Input, InputNumber, Select, Upload } from 'antd'
import ImgCrop from 'antd-img-crop';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import { supabaseClient } from '../../libs/supabase';
import { useAppSelector } from '../../store/hooks'
import { Book, NewBook, emptyBook, postBookAsync, updateBookAsync } from '../../api/books'

type BookFormProps = {
  book?: Book
}

export const BookForm: FC<BookFormProps> = ({ book }) => {
  const [editedBook, setEditedBook] = useState<NewBook>(book || emptyBook)
  const { user } = useAppSelector((state) => state.user)  
  const { currancies } = useAppSelector((state) => state.currancies)  

  const [error, setError] = useState<string>('')
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const editBook = useCallback((key: string, value: any) => {
    setEditedBook({
      ...editedBook,
      [key]: value,
    })
  }, [editedBook])

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
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

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj as RcFile)
        reader.onload = () => resolve(reader.result as string)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }

  const upload = () => {
    fileList.forEach(async photo => {
      if (!supabaseClient || !photo.originFileObj || !user?.id) return
      const result = await supabaseClient.storage
        .from('books')
        .upload(`${user.id}-${photo.name}`, photo.originFileObj)
      console.log('===>', result)
    })
  }

  useEffect(() => {
    if (!editedBook.currancy_id && currancies?.length) {
      editBook('currancy_id', currancies[0].id)
    }
  }, [currancies, editBook, editedBook.currancy_id])

  const { Option } = Select
  const selectAfter = (
    <Select defaultValue={editedBook.currancy_id} style={{ width: 80 }} onChange={(value) => editBook('currancy_id', value)}>
      {currancies.map(currancy => (
        <Option value={currancy.id} key={currancy.id}>{currancy.code}</Option>
      ))}
    </Select>
  )

  return (
    <div>

      {error && <Alert message={error} type="error" />}

      <br />

      <h1>{editedBook.id ? 'Edit book': 'Add new book'}</h1>

      <ImgCrop rotate>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
        >
          {fileList.length < 5 && '+ Upload'}
        </Upload>
      </ImgCrop>
      <Button type='primary'  onClick={upload}>Upload</Button>

      <br />
      <br />

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
