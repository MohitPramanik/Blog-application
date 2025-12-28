import { memo, useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import { PAGE_SIZE } from "../constants/constant";

type PaginationBtnsProps = {
    fetchBlogs: (page: number, limit?: number) => void;
    totalCount?: number;
    pageSize?: number;
};

const PaginationBtns: React.FC<PaginationBtnsProps> = ({
    fetchBlogs,
    totalCount=0,
    pageSize=PAGE_SIZE,
}) => {
    const [activeBtn, setActiveBtn] = useState<number>(1);
    const [totalBtnCount, setTotalBtnCount] = useState<number>(1);

    const DELTA = 2;              // current ± 2
    const JUMP_SIZE = 5;          // ellipsis jump size

    useEffect(() => {
        setTotalBtnCount(Math.ceil(totalCount / pageSize));
    }, [totalCount, pageSize]);

    const handleClick = (page: number) => {
        setActiveBtn(page);
        fetchBlogs(page, pageSize);
    };

    const handlePrev = () => {
        if (activeBtn > 1) handleClick(activeBtn - 1);
    };

    const handleNext = () => {
        if (activeBtn < totalBtnCount) handleClick(activeBtn + 1);
    };

    const handleEllipsisClick = (direction: "left" | "right") => {
        let target =
            direction === "left"
                ? activeBtn - JUMP_SIZE
                : activeBtn + JUMP_SIZE;

        target = Math.max(1, Math.min(totalBtnCount, target));
        handleClick(target);
    };

    const getVisiblePages = () => {
        const pages: (number | "dots-left" | "dots-right")[] = [];
        let lastPage: number | null = null;

        for (let i = 1; i <= totalBtnCount; i++) {
            if (
                i === 1 ||
                i === totalBtnCount ||
                (i >= activeBtn - DELTA && i <= activeBtn + DELTA)
            ) {
                if (lastPage !== null && i - lastPage > 1) {
                    pages.push(
                        i < activeBtn ? "dots-left" : "dots-right"
                    );
                }
                pages.push(i);
                lastPage = i;
            }
        }
        return pages;
    };

    if (totalBtnCount < 1) return null;

    const visiblePages = getVisiblePages();

    return (
        <Pagination className="d-flex justify-content-center flex-wrap">
            <Pagination.First
                onClick={() => handleClick(1)}
                disabled={activeBtn === 1}
            />
            <Pagination.Prev
                onClick={handlePrev}
                disabled={activeBtn === 1}
            />

            {visiblePages.map((page, index) => {
                if (page === "dots-left") {
                    return (
                        <Pagination.Ellipsis
                            key={`dots-left-${index}`}
                            onClick={() => handleEllipsisClick("left")}
                        />
                    );
                }

                if (page === "dots-right") {
                    return (
                        <Pagination.Ellipsis
                            key={`dots-right-${index}`}
                            onClick={() => handleEllipsisClick("right")}
                        />
                    );
                }

                return (
                    <Pagination.Item
                        key={page}
                        active={page === activeBtn}
                        onClick={() => handleClick(page)}
                    >
                        {page}
                    </Pagination.Item>
                );
            })}

            <Pagination.Next
                onClick={handleNext}
                disabled={activeBtn === totalBtnCount}
            />
            <Pagination.Last
                onClick={() => handleClick(totalBtnCount)}
                disabled={activeBtn === totalBtnCount}
            />
        </Pagination>
    );
};

export default memo(PaginationBtns);
