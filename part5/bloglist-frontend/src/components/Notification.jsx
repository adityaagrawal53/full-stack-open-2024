const Notification = ({ notification, style }) => {
  if (notification === null) {
    return null
  }

  return (
    <div className={style}>
      {notification}
    </div>
  )
}

export default Notification