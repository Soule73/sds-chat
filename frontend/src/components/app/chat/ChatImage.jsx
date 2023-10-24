import { ArrowDownCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import PropTypes from "prop-types";

const ChatImage = ({ content, name, caption }) => {
    const [show, setShow] = useState(false);
    const download = () => {
        const downladLink = document.createElement('a');
        downladLink.href = content;
        downladLink.download = name;

        downladLink.click();
    }

    return <div onMouseLeave={() => setShow(false)} onMouseEnter={() => setShow(true)}>
        {(show) && <ArrowDownCircleIcon onClick={download} className=" top-0 left-2 dark:fill-slate-700 dark:bg-white rounded-full absolute w-8 h-8 cursor-pointer" title="Enregistré" />}
        <img loading="lazy" onContextMenu={(e) => e.preventDefault()} src={content} className=" my-2 max-w-full md:max-w-sm max-h-[50rem] rounded-xl" alt={name} />
        {caption && <figcaption className=" border-t mt-1 border-t-gray-700/30">{caption} </figcaption>}
    </div>
}

export default ChatImage;

ChatImage.propTypes = {
    content: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
}