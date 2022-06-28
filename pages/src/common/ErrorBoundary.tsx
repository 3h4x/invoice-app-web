import { Component, ReactNode } from 'react'

import { toast } from 'react-toastify'

export class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false }

  static getDerivedStateFromError(error: unknown) {
    if (error) {
      toast.error(`Error out of bounds: ${error}`)
    }
    return { hasError: true }
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    console.error(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}
