import React from 'react'
import { Container, Pagination } from 'react-bootstrap'

interface PaginationSectionProps {
    pageCount: number;
    activePage: number;
    setActivePage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PaginationSection({ pageCount, activePage, setActivePage }: PaginationSectionProps) {

    const pages = Array.from({ length: pageCount });

    return (
        <Container className='d-flex justify-content-center'>
            <Pagination>
                {
                    pages.map((_, index) => (
                        <Pagination.Item key={index} active={index+1 === activePage} onClick={() => setActivePage(index + 1)}>
                            {index+1}
                        </Pagination.Item>
                    ))
                }

            </Pagination>
        </Container>
    )
}
