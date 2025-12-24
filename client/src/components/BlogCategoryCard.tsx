type BlogCateogyCardProps = {
    category: string;
}

const BlogCategoryCard: React.FC<BlogCateogyCardProps> = ({ category }) => {
    return (
            <div
                role="button"
                className="category-card p-4 h-100 d-flex flex-column justify-content-between"
                tabIndex={0}
            >
                <div>
                    <div className="category-icon mb-3">🏷️</div>

                    <h5 className="category-title mb-1">{category || ""}</h5>

                    <p className="category-count">
                        {/* {
                            Categories.filter(
                              (b) =>
                                (((b as any).categories || []) as string[]).includes(c)
                            ).length */}
                        {/* }{" "} */}
                        0 posts
                    </p>
                </div>

                <div className="mt-3">
                    <span className="category-link">
                        View posts →
                    </span>
                </div>
            </div>
    )
}

export default BlogCategoryCard
