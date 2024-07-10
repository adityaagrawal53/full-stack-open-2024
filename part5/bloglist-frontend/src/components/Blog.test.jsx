import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'

test('renders content showing blog title and author', () => {
  const user = {
    name: 'Test User',
    id: 1
  }

  const blog = {
    title: 'Trial test',
    author: 'Test Author',
    url: 'www.test.com',
    likes: 1,
    user
  }

  const { container } = render(<Blog blog={blog} user={user} />)

  const div = container.querySelector('.short')
  expect(div).toHaveTextContent(
    'Trial test'
  )
  expect(div).toHaveTextContent(
    'Test Author'
  )
})

test('renders blog url and number of likes upon pressing button', async () => {
  const user = {
    name: 'Test User',
    id: 1
  }

  const blog = {
    title: 'Trial test',
    author: 'Test Author',
    url: 'www.test.com',
    likes: 1,
    user
  }


  const { container } = render(<Blog blog={blog} user={user} />)
  expect(container).not.toHaveTextContent(
    'www.test.com'
  )
  expect(container).not.toHaveTextContent(
    'Likes 1'
  )


  const user_ = userEvent.setup()
  const button = screen.getByText('view')
  await user_.click(button)
  expect(container).toHaveTextContent(
    'www.test.com'
  )
  expect(container).toHaveTextContent(
    'Likes 1'
  )
})


test('clicking the like button twice calls the event handler twice', async () => {
  const user = {
    name: 'Test User',
    id: 1
  }

  const blog = {
    title: 'Trial test',
    author: 'Test Author',
    url: 'www.test.com',
    likes: 1,
    user
  }

  const mockHandler = vi.fn()

  const { container } = render(<Blog blog={blog} user={user} update={mockHandler}/>)
  const user_ = userEvent.setup()
  const button = screen.getByText('view')
  await user_.click(button)
  const likeButton = screen.getByText('like')
  await user_.click(likeButton)
  await user_.click(likeButton)

  expect(mockHandler).toHaveBeenCalledTimes(2)
})


test('creating a new blog is done with the correct props', async () => {
  const user = {
    name: 'Test User',
    id: 1
  }

  const blog = {
    title: 'Trial test',
    author: 'Test Author',
    url: 'www.test.com',
    likes: 1,
    user
  }

  const mockHandler = vi.fn()

  const { container } = render(<BlogForm handleBlogNew={mockHandler}/>)
  const user_ = userEvent.setup()
  const title = screen.getByPlaceholderText('write title here')
  const author = screen.getByPlaceholderText('write author here')
  const url = screen.getByPlaceholderText('write url here')
  const createButton = screen.getByText('create')

  await user_.type(title, 'Trial test')
  await user_.type(author, 'Test Author')
  await user_.type(url, 'www.test.com')
  screen.debug(container)

  await user_.click(createButton)

  expect(mockHandler).toHaveBeenCalledTimes(1)
  expect(mockHandler).toHaveBeenCalledWith({
    title: 'Trial test',
    author: 'Test Author',
    url: 'www.test.com'
  })
}
)
