import { memo } from "react";
import "./InitialPageLoader.css";

const InitialPageLoader = () => {
  return (
    <section className="initial-loader" aria-live="polite" aria-busy="true">
      <header className="initial-loader__nav">
        <div className="initial-loader__nav-inner">
          <div className="initial-loader__brand">BlogHub</div>
          <div className="initial-loader__nav-links" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="initial-loader__nav-actions" aria-hidden="true">
            <span className="initial-loader__theme-toggle" />
            <span className="initial-loader__avatar" />
          </div>
        </div>
      </header>

      <div className="initial-loader__body">
        <div className="initial-loader__hero">
          <div>
            <h1>Loading your feed</h1>
            <p>Checking your session and preparing the latest posts.</p>
          </div>
          <div className="initial-loader__progress" aria-hidden="true">
            <span className="initial-loader__progress-bar" />
          </div>
        </div>

        <div className="initial-loader__toolbar" aria-hidden="true">
          <div className="initial-loader__search" />
          <div className="initial-loader__button" />
        </div>

        <div className="initial-loader__grid" aria-hidden="true">
          <article className="initial-loader__card">
            <div className="initial-loader__line initial-loader__line--title" />
            <div className="initial-loader__line initial-loader__line--body" />
            <div className="initial-loader__line initial-loader__line--short" />
            <div className="initial-loader__meta">
              <span className="initial-loader__avatar initial-loader__avatar--sm" />
              <div className="initial-loader__meta-text">
                <span className="initial-loader__line initial-loader__line--meta" />
                <span className="initial-loader__line initial-loader__line--tiny" />
              </div>
            </div>
          </article>

          <article className="initial-loader__card initial-loader__card--delay-1">
            <div className="initial-loader__line initial-loader__line--title" />
            <div className="initial-loader__line initial-loader__line--body" />
            <div className="initial-loader__line initial-loader__line--short" />
            <div className="initial-loader__meta">
              <span className="initial-loader__avatar initial-loader__avatar--sm" />
              <div className="initial-loader__meta-text">
                <span className="initial-loader__line initial-loader__line--meta" />
                <span className="initial-loader__line initial-loader__line--tiny" />
              </div>
            </div>
          </article>

          <article className="initial-loader__card initial-loader__card--delay-2">
            <div className="initial-loader__line initial-loader__line--title" />
            <div className="initial-loader__line initial-loader__line--body" />
            <div className="initial-loader__line initial-loader__line--short" />
            <div className="initial-loader__meta">
              <span className="initial-loader__avatar initial-loader__avatar--sm" />
              <div className="initial-loader__meta-text">
                <span className="initial-loader__line initial-loader__line--meta" />
                <span className="initial-loader__line initial-loader__line--tiny" />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default memo(InitialPageLoader);
