import CloseBtn from './CloseBtn'
import DeleteBtn from './DeleteBtn'
import SaveBtn from './SaveBtn'

export interface BtnProps {
    onClick: () => void
    children: React.ReactNode
}

export { CloseBtn, DeleteBtn, SaveBtn }
