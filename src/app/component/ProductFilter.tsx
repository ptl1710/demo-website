"use client";

import { useLazyQuery, useQuery } from "@apollo/client/react";
import { useState } from "react";

import { GET_CATEGORIES, FILTER_PRODUCTS } from "@/app/queries/products";
import { Button } from "./UI/Button";

import style from "../../assets/styles/ProductFilter.module.css";

export default function ProductFilter({ onFilter }: { onFilter: (products: any[]) => void }) {
    const { data: catData } = useQuery(GET_CATEGORIES);
    const [categoryId, setCategoryId] = useState<string | undefined>();
    const [minPrice, setMinPrice] = useState<number | undefined>();
    const [maxPrice, setMaxPrice] = useState<number | undefined>();

    const [filterProducts, { loading }] = useLazyQuery(FILTER_PRODUCTS, {
        onCompleted: (data) => {
            onFilter(data.productsByFilter);
        },
    });

    const handleFilter = async () => {
        const { data } = await filterProducts({
            variables: { categoryId, minPrice, maxPrice },
        });
        onFilter(data.productsByFilter);
    };

    const handleReset = () => {
        setCategoryId(undefined);
        setMinPrice(undefined);
        setMaxPrice(undefined);
        onFilter(undefined);
    };

    return (
        <div className={style.containerProductFilter} >
            <select
                className={style.selectCategory}
                value={categoryId || ""}
                onChange={(e) => setCategoryId(e.target.value || undefined)}
            >
                <option value="">Tất cả loại sản phẩm</option>
                {catData?.categories.map((c: any) => (
                    <option key={c.id} value={c.id}>
                        {c.name}
                    </option>
                ))}
            </select>

            <input
                type="text"
                placeholder="Giá từ"
                value={minPrice ? new Intl.NumberFormat("vi-VN").format(minPrice) : ""}
                onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, "");
                    const num = raw ? Math.max(1000, Number(raw)) : undefined;
                    setMinPrice(num);
                }}
            />

            <input
                type="text"
                placeholder="Giá đến"
                value={maxPrice ? new Intl.NumberFormat("vi-VN").format(maxPrice) : ""}
                onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, "");
                    const num = raw ? Math.max(1000, Number(raw)) : undefined;
                    setMaxPrice(num);
                }}
            />

            <Button onClick={handleFilter} disabled={loading} className={style.buttonFilter}>
                {loading ? "Đang lọc..." : "Lọc"}
            </Button>
            <Button onClick={handleReset} variant="secondary" className={style.buttonReset}>
                Đặt lại
            </Button>
        </div>
    );
}
