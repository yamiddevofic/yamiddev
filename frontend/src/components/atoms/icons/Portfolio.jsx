export function Portfolio(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      width="1.2rem"
      height="1.2rem"
      style={{ marginRight: '10px' }} 
      {...props}
    >
      <path
        fill="currentColor"
        d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9zm3-8V2H8v1z"
      ></path>
    </svg>
  )
}
