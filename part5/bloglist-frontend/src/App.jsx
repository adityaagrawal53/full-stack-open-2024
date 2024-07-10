import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState()
  const [notification, setNotification] = useState(null)
  const [style, setStyle] = useState('error')

  const blogFormRef = useRef()

  const notifyGood = (message) => {
    setNotification( message)
    setStyle('good')
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }
  const notifyError = (message) => {
    setNotification( message )
    setStyle('error')
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs.sort((a, b) => -(a.likes - b.likes)))
    })
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      notifyGood('Successfully logged in')
    } catch (exception) {
      notifyError('Wrong credentials')
    }
  }

  const handleBlogNew = async (newblog) => {
    try {
      const blog = await blogService.create({
        ...newblog
      })
      setBlogs(blogs.concat(blog))
      notifyGood('Successfully added a blog')
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      notifyError('Failed to add a blog')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }


  const remove = (id) => {
    blogService.remove(id)
    notifyGood('Successfully removed a blog')
    blogService.getAll().then(blogs => {
      setBlogs(blogs.sort((a, b) => -(a.likes - b.likes)))
    })
  }

  const update = (id, newObject) => {
    blogService.update(id, newObject)
    notifyGood('Successfully updated a blog')
  }


  return (
    <div>
      <Notification notification={notification} style={style}/>
      {
        !user
          ?
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          :
          <>
            <p>{user.name} logged in
              <button onClick={handleLogout}>logout</button></p>
            <Togglable buttonLabel='new blog' ref={blogFormRef}>
              <BlogForm handleBlogNew={handleBlogNew} />
            </Togglable>
            <BlogList blogs={blogs} user={user} update={update} remove={remove}/>
          </>
      }


    </div>
  )
}


export default App