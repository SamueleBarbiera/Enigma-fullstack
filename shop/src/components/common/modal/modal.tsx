import React, { FC, useRef, useEffect } from 'react'
import { Portal } from '@reach/portal'
import { motion, AnimatePresence } from 'framer-motion'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import cn from 'classnames'
import { IoClose } from '@react-icons/all-files/io5/IoClose'
import { fadeInOut } from '@utils/motion/fade-in-out'
import { zoomOutIn } from '@utils/motion/zoom-out-in'
import { useUI } from '@contexts/ui.context'
import useOnClickOutside from '@utils/use-click-outside'

type ModalProps = {
    open?: boolean
    children?: React.ReactNode
    onClose: () => void
    rootClassName?: string
    useBlurBackdrop?: boolean
    containerClassName?: string
    variant?: 'default' | 'center' | 'bottom'
}
type DivElementRef = React.MutableRefObject<HTMLDivElement>

// variant based classes for modal root, container & close btn
const rootClasses = {
    center: 'p-4 md:p-5',
    default: 'p-4 md:p-5',
    bottom: 'p-5 pb-0',
}
const containerClasses = {
    center: 'h-auto max-h-full top-1/2 -translate-y-1/2 rounded-lg',
    default: 'h-auto max-h-full top-1/2 -translate-y-1/2 rounded-lg',
    bottom: 'h-full max-h-70vh bottom-0 ltr:rounded-tl-2xl rtl:rounded-tr-2xl ltr:rounded-tr-2xl rtl:rounded-tl-2xl',
}
const closeBtnClasses = {
    center: '-top-3.5 md:-top-4 ltr:-right-3.5 ltr:md:-right-4 rtl:-left-3.5 rtl:md:-left-4',
    default: '-top-3.5 md:-top-4 ltr:-right-3.5 ltr:md:-right-4 rtl:-left-3.5 rtl:md:-left-4',
    bottom: 'top-1/4 ltr:left-1/2 rtl:right-1/2 transform -translate-y-1/2 -translate-x-1/2',
}

const Modal = ({
    children,
    open,
    onClose,
    rootClassName,
    useBlurBackdrop,
    containerClassName,
    variant = 'center',
}: ModalProps) => {
    const { closeModal } = useUI()
    const modalRootRef = useRef() as DivElementRef
    const modalInnerRef = useRef() as DivElementRef
    useOnClickOutside(modalInnerRef, () => closeModal())

    useEffect(() => {
        if (modalInnerRef.current) {
            if (open) {
                disableBodyScroll(modalInnerRef.current)
            } else {
                enableBodyScroll(modalInnerRef.current)
            }
        }
        return () => {
            clearAllBodyScrollLocks()
        }
    }, [open])

    return (
        <Portal>
            <AnimatePresence>
                {open && (
                    <motion.div
                        ref={modalRootRef}
                        key="modal"
                        initial="from"
                        animate="to"
                        exit="from"
                        variants={fadeInOut(0.25)}
                        className={cn(
                            'modal-root fixed inset-0 z-50 bg-black bg-opacity-70',
                            useBlurBackdrop && 'backdrop-blur-sm backdrop-filter',
                            rootClasses[variant],
                            rootClassName
                        )}
                    >
                        <motion.div
                            initial="from"
                            animate="to"
                            exit="from"
                            variants={zoomOutIn()}
                            className="relative mx-auto h-full w-full"
                        >
                            <div
                                className={cn(
                                    'shadow-xl absolute left-1/2 w-full -translate-x-1/2 transform sm:w-auto',
                                    containerClasses[variant],
                                    containerClassName
                                )}
                            >
                                <button
                                    onClick={onClose}
                                    aria-label="Close panel"
                                    className={cn(
                                        'shadow focus:shadow-md hover:shadow-md fixed z-10 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-gray-600 transition duration-200 hover:text-gray-800 focus:text-gray-800 focus:outline-none md:h-8 md:w-8',
                                        closeBtnClasses[variant]
                                    )}
                                >
                                    <IoClose className="text-xl" />
                                </button>
                                <div
                                    ref={modalInnerRef}
                                    className={`h-full rounded-lg ${variant !== 'default' ? 'overflow-y-auto' : ' '}`}
                                    style={{ maxHeight: 'calc(100vh - 140px)' }}
                                >
                                    {children}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Portal>
    )
}

export default Modal
