import React, { useState } from 'react'

const Blog = ({ blog, user, update, remove }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const handleViewClick = () => {
    setShowDetails(!showDetails)
  }

  const updateLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: likes + 1,
      user: blog.user.id,
    }

    await update(blog.id, updatedBlog)
    setLikes(updatedBlog.likes)
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await remove(blog.id)
      window.location.reload()
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} className="blog">
      <div className="short">
        {blog.title} {blog.author}
        <button onClick={handleViewClick}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>
      {showDetails && (
        <div className="long">
          Link {blog.url}
          <br />
          Likes {likes}
          <button onClick={updateLike}>like</button>
          <br />
          User {blog.user.name}
          {blog.user.id === user.id && (
            <>
              <br />
              <button onClick={handleDelete}>remove</button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
