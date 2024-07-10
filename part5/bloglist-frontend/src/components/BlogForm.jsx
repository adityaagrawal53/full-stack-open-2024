import { useState } from 'react'


const BlogForm = ({ handleBlogNew }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    handleBlogNew({
      title: title,
      author: author,
      url: url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
        title
          <input
            type="text"
            value={title}
            name="Title"
            data-testid='title'
            onChange={handleTitleChange}
            placeholder='write title here'
          />
        </div>
        <div>
        author
          <input
            type="text"
            value={author}
            name="Author"
            data-testid='author'
            onChange={handleAuthorChange}
            placeholder='write author here'
          />
        </div>
        <div>
        url
          <input
            type="text"
            value={url}
            name="Url"
            data-testid='url'
            onChange={handleUrlChange}
            placeholder='write url here'
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )}



export default BlogForm