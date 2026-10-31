import { Component, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  fallback?: (error: Error, reset: () => void) => ReactNode
}

type State = {
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  reset = () => {
    this.setState({ error: null })
  }

  render() {
    const { error } = this.state

    if (error) {
      if (this.props.fallback) {
        return this.props.fallback(error, this.reset)
      }

      return (
        <div className="rounded border border-red-300 bg-red-50 p-4 text-red-800">
          <h2 className="font-semibold">Something went wrong</h2>
          <p className="mt-1 text-sm">{error.message}</p>
          <button
            type="button"
            onClick={this.reset}
            className="mt-3 text-sm underline hover:no-underline"
          >
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}