import { ArrowDownCircleIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

const ChatDocument = ({ content, name, caption }) => {
    const download = () => {
        const downladLink = document.createElement('a');
        downladLink.href = content;
        downladLink.download = name;

        downladLink.click();
    }
    return <div>
        <div onContextMenu={(e) => e.preventDefault()} className=" min-w-max flex gap-2 justify-between items-center">
            <div className=" flex items-center gap-2">
                <DocumentTextIcon className=" w-10 h-10" />
                <span>
                    {name}
                </span>

            </div>
            <ArrowDownCircleIcon onClick={download} className=" w-10 h-10 dark:fill-slate-300 cursor-pointer" title="Enregistré" />
        </div>
        {caption && <div className=" border-t mt-1 border-t-gray-700/30">
            {caption}
        </div>}
    </div>
}

export default ChatDocument;

ChatDocument.propTypes = {
    content: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
}