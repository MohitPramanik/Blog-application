import { memo } from "react";

type BlogCateogyCardProps = {
    category: {
        _id: string,
        name: string,
        categoryCount: number
    };
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

                <h5 className="category-title mb-1">{category.name || ""}</h5>

                <p className="category-count">
                    {category.categoryCount} posts
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

export default memo(BlogCategoryCard);
