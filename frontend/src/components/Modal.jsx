import PropTypes from "prop-types";

import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react"
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { ToastContainer } from "react-toastify";

export default function Modal({ handleOpen, title, open, children }) {
    const { theme } = localStorage;

    return <Dialog size="sm" open={open} handler={handleOpen} className=" w-full h-full rounded-none md:rounded-lg md:w-auto md:h-auto !max-w-none divide-none dark:bg-slate-900">
        <DialogHeader className="dark:text-slate-100 bg-slate-100 shadow dark:bg-slate-800 md:rounded-t-lg py-1 flex gap-3 ">
            <ArrowLeftIcon onClick={handleOpen} className=" md:hidden w-6 h-6 stroke-[4] cursor-pointer" />
            <span>{title} </span>
        </DialogHeader>
        <DialogBody divider className=" dark:text-blue-gray-300">
            <ToastContainer
                theme={theme === "dark" ? "dark" : "light"} />
            {children}
        </DialogBody>
        <DialogFooter className=" py-1">
            <Button
                variant="text"
                color="red"
                onClick={handleOpen}
                className="mr-1 hidden md:block"
            >
                <span>Fermé</span>
            </Button>
        </DialogFooter>
    </Dialog>
}

Modal.propTypes = {
    handleOpen: PropTypes.func.isRequired,
    title: PropTypes.string,
    open: PropTypes.bool,
    children: PropTypes.any,

}