'use client'

import { useState } from 'react';

import { MainMenu } from "@/features/menu/menu";

export const RptContext = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <MainMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    )
}
