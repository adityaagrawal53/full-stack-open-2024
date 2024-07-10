import Blog from './Blog'

const BlogList = ({ blogs, user, update, remove }) => {
  return (
    <>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          update={update}
          remove={remove}
        />
      ))}
    </>
  )
}

export default BlogList
