import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error, info) {
    console.error('[page] render failed', error, info.componentStack);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <section className="mx-auto max-w-6xl px-4 sm:px-8 min-h-[50svh] flex flex-col justify-center">
        <h1 className="display text-[clamp(2.4rem,10vw,4.5rem)]">This page did not load.</h1>
        <p className="mt-4 text-ink/70">The site was probably updated while it was open.</p>
        <a href={window.location.pathname} className="meta link mt-6">reload →</a>
      </section>
    );
  }
}
