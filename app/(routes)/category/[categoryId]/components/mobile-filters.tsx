"use client"

import React, { useState } from 'react';

import { Color, Size } from '@/types';
import { Button, Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { Plus, X } from 'lucide-react';
import IconButton from '@/components/ui/icon-button';
import Filter from './filter';

interface MobileFiltersProps {
    sizes: Size[];
    colors: Color[];
}

const MobileFilters: React.FC<MobileFiltersProps> = ({
    sizes,
    colors
}) => {
    const [open, setOpen] = useState(false);
    
    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);


    return (
        <>
            <Button onClick={onOpen} className=" gap-x-2 lg:hidden inline-flex items-center gap-2 rounded-full bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700">
                Filters
                <Plus size={20}/>
            </Button>

            <Dialog open={open} as="div" onClose={onClose} className="relative z-40 lg:hidden" >
                {/* Background */}
                <DialogBackdrop className="fixed inset-0 bg-black/30" />

                <div className='fixed inset-0 z-40 fkex'>
                    <DialogPanel className="relative h-full w-full ml-auto max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                        {/* Close button */}
                        <div className='flex items-center justify-end px-4'>
                            <IconButton icon={<X size={15} />} onClick={onClose} />
                        </div>

                        {/* Filters */}
                        <div className='p-4'>
                            <Filter 
                                valueKey='sizeId'
                                data={sizes}
                                name="Sizes"
                            />
                            <Filter 
                                valueKey='colorId'
                                data={colors}
                                name="Colors"
                            />
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}

export default MobileFilters