const scrollToRef = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth'})
}
export default scrollToRef;