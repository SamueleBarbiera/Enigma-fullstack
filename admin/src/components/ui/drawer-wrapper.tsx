import Logo from '@components/ui/logo'
import { CloseIcon } from '@components/icons/close-icon'
import Scrollbar from './scrollbar'

type DrawerWrapperProps = {
    children: React.ReactElement
    onClose: () => void
}

const DrawerWrapper = ({ children, onClose }: DrawerWrapperProps) => {
    //console.log('🚀 - file: drawer-wrapper.tsx - line 11 - DrawerWrapper - children', children)
    return (
        <div className="relative flex h-full flex-col">
            <div className="absolute top-0 z-30 mb-4 flex h-16 w-full items-center justify-between border-b border-border-200 border-opacity-75 px-5 start-0 md:mb-6 md:py-5 md:px-8">
                <Logo className="w-24 md:w-auto" />
                <button
                    onClick={onClose}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 text-body transition-all duration-200 hover:bg-accent hover:text-light focus:bg-accent focus:text-light focus:outline-none"
                >
                    <CloseIcon className="h-2.5 w-2.5" />
                </button>
            </div>
            {/* End of header part */}
            <div className="h-full pt-16">
                <Scrollbar className="h-full w-full">{children}</Scrollbar>
            </div>
            {/* End of menu part */}
        </div>
    )
}

export default DrawerWrapper
