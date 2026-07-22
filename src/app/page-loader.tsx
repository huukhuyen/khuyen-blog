export function PageLoader(): JSX.Element {
  return (
    <main aria-live="polite" className="page-loader" role="status">
      <div className="page-loader__content">
        <span aria-hidden="true" className="page-loader__orbit"><span /></span>
        <p>Chờ một chút nhé...</p>
      </div>
    </main>
  );
}
