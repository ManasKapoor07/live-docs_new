const markers = Array.from({ length: 83 }, (_, i) => i)

import { useRef, useState } from 'react';
import { FaCaretDown } from 'react-icons/fa'
export const Ruler = () => {

    const [leftMarker, setleftMarker] = useState(56)
    const [rightMarker, setrightMarker] = useState(56)

    const [isDraggingLeft, setisDraggingLeft] = useState(false)
    const [isDraggingRight, setisDraggingRight] = useState(false)

    const rulerRef = useRef<HTMLDivElement>(null)


    const handleLeftMouseButton = () => {
        setisDraggingLeft(true);
    }

    const handlerRightMouseButton = () => {
        setisDraggingRight(true);
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        const PAGE_WIDTH = 816;
        const MINIMUM_SPACE = 100;
        if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
            const container = rulerRef?.current?.querySelector('#ruler-container')
            if (container) {
                const containerRect = container.getBoundingClientRect()
                const relativeX = e.clientX - containerRect.left;
                const rawPos = Math.max(0, Math.min(PAGE_WIDTH, relativeX))
                if (isDraggingLeft) {
                    const maxLeftpos = PAGE_WIDTH - rightMarker - MINIMUM_SPACE;
                    const newLeftPos = Math.min(rawPos, maxLeftpos)
                    setleftMarker(newLeftPos)
                }
                else if (isDraggingRight) {
                    const maxRightPos = PAGE_WIDTH - (leftMarker + MINIMUM_SPACE)
                    const newRightPos = Math.max(PAGE_WIDTH - rawPos, 0)
                    const constrainedRightPos = Math.min(newRightPos, maxRightPos);
                    setrightMarker(constrainedRightPos)
                }
            }
        }
    }

    const handleMouseUp = () => {
        setisDraggingLeft(false)
        setisDraggingRight(false)
    }

    const handleleftDoubleClick = () => {
        setleftMarker(56)
    }

    const handleRightDoubleClick = () => {
        setrightMarker(56)
    }

    return (
        <div
            ref={rulerRef}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="h-6 border-b border-gray-300 flex items-end relative select-none print:hidden">
            <div
                id="ruler-container"
                className="max-w-[816px] mx-auto w-full h-full relative"
            >
                <Marker
                    position={leftMarker}
                    isLeft={true}
                    isDragging={isDraggingLeft}
                    onDoubleClick={handleleftDoubleClick}
                    onMouseDown={handleLeftMouseButton}
                />
                <Marker
                    position={rightMarker}
                    isLeft={false}
                    isDragging={isDraggingRight}
                    onDoubleClick={handleRightDoubleClick}
                    onMouseDown={handlerRightMouseButton}
                />
                <div className="absolute inset-x-0 bottom-0 h-full">
                    <div className="relative h-full w-[816px]">
                        {markers.map((marker) => {
                            const position = (marker * 816) / 82;
                            return (
                                <div
                                    key={marker}
                                    className="absolute bottom-0"
                                    style={{ left: `${position}px` }}
                                >
                                    {marker % 10 === 0 && (
                                        <>
                                            <div className="absolute bottom-0 w-[1px] h-2 bg-neutral-200/80" />
                                            <span className="absolute bottom-2 text-[10px] text-neutral-500 transform -translate-x-1/2">
                                                {marker / 10 + 1}
                                            </span>

                                        </>
                                    )}
                                    {
                                        marker % 5 === 0 && marker % 10 !== 0 && (
                                            <div className="absolute bottom-0 w-[1px] h-2 bg-neutral-200/80" />
                                        )
                                    }

                                    {
                                        marker % 5 !== 0 && (
                                            <div className="absolute bottom-0 w-[1px] h-2 bg-neutral-200/80" />
                                        )
                                    }
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            </div>

        </div >
    )
};


interface MarkerProps {
    position: number;
    isLeft: boolean;
    isDragging: boolean;
    onMouseDown: () => void;
    onDoubleClick: () => void;
};

const Marker = ({
    position,
    isLeft,
    isDragging,
    onMouseDown,
    onDoubleClick,

}: MarkerProps) => {
    return (

        <div
            className="absolute top-0 w-4 h-full cursor-ew-resize z-[5] group -ml-2"
            style={{ [isLeft ? 'left' : 'right']: `${position}px` }}
            onMouseDown={onMouseDown}
            onDoubleClick={onDoubleClick}
        >
            <FaCaretDown className='absolute left-1/2 top-0 h-full fill-blue-500 transform -translate-x-1/2' />
            <div
            className='absolute left-1/2 top-4transform -translate-x-1/2 '
            style={{
                height: '100dvh',
                width : '1px',
                transform : 'scaleX(0.5)',
                backgroundColor : '#3b72f6',
                display : isDragging ? 'block' : 'none'
            }}
            >

            </div>
        </div>
    )
}