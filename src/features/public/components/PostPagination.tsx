import React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationComponentProps {
    count: number; // total de elementos
    pages: number; // elementos por página
    currentPage: number; // página actual
    onPageChange: (page: number) => void;
}

export function PaginationComponent({
    count,
    pages,
    currentPage,
    onPageChange,
}: PaginationComponentProps) {
    const totalPages = Math.ceil(count / pages);

    if (totalPages <= 1) return null; // No mostrar si no hace falta

    const generatePageNumbers = (): (number | string)[] => {
        const pageList: (number | string)[] = [];
        const delta = 1;

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - delta && i <= currentPage + delta)
            ) {
                pageList.push(i);
            } else if (pageList[pageList.length - 1] !== "...") {
                pageList.push("...");
            }
        }

        return pageList;
    };

    return (
        <Pagination>
            <PaginationContent>
                {/* Botón Anterior */}
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) onPageChange(currentPage - 1);
                        }}
                    />
                </PaginationItem>

                {/* Números y elipsis */}
                {generatePageNumbers().map((item, index) => (
                    <PaginationItem key={index}>
                        {item === "..." ? (
                            <PaginationEllipsis />
                        ) : (
                            <PaginationLink
                                href="#"
                                isActive={item === currentPage}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onPageChange(Number(item));
                                }}
                            >
                                {item}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}

                {/* Botón Siguiente */}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages)
                                onPageChange(currentPage + 1);
                        }}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
