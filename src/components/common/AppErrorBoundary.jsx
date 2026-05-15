import { Component } from 'react';
import EmptyState from './EmptyState.jsx';

export default class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 p-6">
          <EmptyState title="La app encontro un error" description="Recarga la pagina para continuar." actionLabel="Recargar" onAction={() => window.location.reload()} />
        </div>
      );
    }
    return this.props.children;
  }
}
