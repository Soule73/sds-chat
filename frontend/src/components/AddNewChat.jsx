/* eslint-disable react/prop-types */
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline"
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react"

export default function AddNewChat({ handleOpen, open }) {

    return <Dialog size="sm" open={open} handler={handleOpen} className=" w-full h-full md:w-auto md:h-auto !max-w-none dark:divide-gray-800/60 dark:bg-slate-800">
        <DialogHeader className=" flex gap-3 dark:text-slate-100">
            <ArrowLongLeftIcon onClick={handleOpen} className=" md:hidden w-8 h-auto cursor-pointer" />
            <span>Nouvelle discussion</span>
        </DialogHeader>
        <DialogBody divider className=" dark:text-blue-gray-300">
            The key to more success is to have a lot of pillows. Put it this way,
            it took me twenty five years to get these plants, twenty five years of
            blood sweat and tears, and I&apos;m never giving up, I&apos;m just
            getting started. I&apos;m up to something. Fan luv.
        </DialogBody>
        <DialogFooter>
            <Button
                variant="text"
                color="red"
                onClick={handleOpen}
                className="mr-1 hidden md:block"
            >
                <span>Cancel</span>
            </Button>
            {/* <Button variant="gradient" color="blue" onClick={handleOpen}>
                <span>Confirm</span>
            </Button> */}
        </DialogFooter>
    </Dialog>
}