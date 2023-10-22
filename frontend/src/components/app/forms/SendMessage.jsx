/* eslint-disable react/prop-types */
import { PaperAirplaneIcon, PaperClipIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import socket from "../../../socket";
import TextareaAutosize from 'react-textarea-autosize';
import { toast } from "react-toastify";
import { IconButton } from "@material-tailwind/react";

function bytesToMegabytes(bytes) {
    let size = 0;
    let type = "";

    if (bytes > (1024 * 1024)) {
        size = (bytes / (1024 * 1024)).toFixed(2);
        type = " Mb";
    } else {
        size = (bytes / (1024)).toFixed(2);
        type = " Ko";
    }
    return <span>
        Taille : {size + type}
    </span>;
}

export default function SendMessage({ chatId, parentId = null, openChat, placeholder = "Écrivez un commentaire" }) {

    const { userInfo } = useSelector((state) => state.auth);

    const [files, setFiles] = useState([]);
    const [height, setHeight] = useState('5px');
    const [filePreview, setFilePreview] = useState(0);
    const [onDrageEvent, setOnDrageEvent] = useState(false);
    const [fileCaption, setFileCaption] = useState("");

    const [form, setForm] = useState({
        content: "",
        type: "text"
    });


    // These methods will update the state properties.
    const updateForm = (value) => {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    const handleOnInput = (event) => {

        const lines = event.target.value.split('\n').length;
        setHeight(`${lines * 20}px`);
    };

    const fileRef = useRef();

    const selectFile = () => {
        fileRef.current.click();
    }

    const fileSelected = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if ((file.size / (1024 * 1024)).toFixed(2) < 16) {

            const reader = new FileReader();
            reader.onload = () => {
                const data = reader.result;

                const newFiles = {
                    name: file.name,
                    preview: data,
                    size: file.size,
                    type: file.type,
                }
                setFiles([...files, newFiles]);
                updateForm({ type: "file" })
                updateForm({ content: [...files, newFiles] })
            };
            reader.readAsDataURL(file);

        }
    }

    const handleRemoveFile = () => {
        const old = oldArray => {
            return oldArray.filter((value, i) => i !== filePreview)
        }

        setFiles(old)

        if (old(files)) {
            updateForm({ type: "text" })
            updateForm({ content: "" })
        }
    }

    const handleOnDrop = async (event) => {
        event.preventDefault();
        setOnDrageEvent(false)
        const newFiles = [...files];
        for (let i = 0; i < event.dataTransfer.files.length; i++) {
            const file = event.dataTransfer.files[i];
            if (file && (file.size / (1024 * 1024)).toFixed(2) < 16) {
                const reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onload = () => {

                    const data = reader.result;

                    newFiles.push({
                        name: file.name,
                        size: file.size,
                        type: file.type,
                        preview: data,
                        caption: ""
                    });
                }
            }

        }
        setFiles(newFiles);
        updateForm({ type: "file" })
        updateForm({ content: newFiles })
    }

    const handleCaption = (e) => {
        const file = files[filePreview];
        file.caption = e.target.value
        setFileCaption(e.target.value)

    }

    const onSubmit = async (e) => {

        e.preventDefault();
        if (form.content.length > 0 || files.length > 0) {
            let newComment = {};

            newComment = { ...form, userId: userInfo._id, parentId: parentId, chatId: chatId };

            socket.emit('sendMessage', newComment);
        }
        else {
            toast.warning("Un message vide n'est pas être envoyé")
        }

        setForm({ content: "", type: "text" });
        setFiles([])

    }


    const onDrag = {
        onDragOver: () => setOnDrageEvent(true),
        onDragLeave: () => setOnDrageEvent(false),
        onDragExit: () => setOnDrageEvent(false),
        onDragEnd: () => setOnDrageEvent(false)
    };

    return (
        <div
            onDrop={handleOnDrop}
            onDragOver={onDrag.onDragOver}
            onDragLeave={onDrag.onDragLeave}
            onDragExit={onDrag.onDragExit}
            onDragEnd={onDrag.onDragEnd}

            className={`${openChat ? "block" : "hidden lg:flex"} ${onDrageEvent ? " border-dashed border-orange-800" : "border-transparent border-b-white dark:border-b-slate-900"} pointer-events-none  border-2  flex-col h-max fixed w-full  xl:w-[calc(100%-20rem)] z-10  bottom-0`}>

            {files.length > 0 &&
                <div className=" flex justify-end">
                    <div className=" pointer-events-auto pt-2 items-center flex flex-col w-full md:max-w-sm bg-white dark:bg-slate-800">

                        <div className=" w-full">
                            <div className=" w-full flex px-3 justify-between items-center">
                                <span onClick={() => {
                                    setFiles([])
                                    updateForm({ content: "" })
                                    updateForm({ type: "text" })
                                }} className=" cursor-pointer text-red-800 text-xs">Fermé</span>
                                <XMarkIcon title="Supprimé cette fichier" onClick={handleRemoveFile} className=" stroke-2 stroke-red-800 cursor-pointer w-6 h-6 fill-red-800 rounded-full" />
                            </div>
                            {files[filePreview]?.type?.startsWith("image/") ? (
                                <img

                                    className="rounded-xl max-h-[55vh] object-cover max-w-[98%] mx-auto border  border-gray-100 dark:border-gray-700/30 "
                                    src={files[filePreview]?.preview}
                                    alt={files[filePreview]?.name}
                                />

                            ) : (
                                <div className=" px-1 h-44 items-center dark:text-slate-100 flex flex-col gap-2">
                                    <DocumentTextIcon className="w-16 h-16" />
                                    <span>
                                        {files[filePreview].name}
                                    </span>
                                    {bytesToMegabytes(files[filePreview].size)}
                                </div>
                            )}
                            <div className=" mt-2 px-2">

                                <TextareaAutosize value={fileCaption} onChange={handleCaption} placeholder="Legende(Facultatif)" className=" w-full focus:border-b-2 focus:border-b-orange-800 focus:outline-0 dark:bg-slate-700 custome-scroll-bar dark:text-slate-100 px-2 resize-none max-h-44 py-2 bg-slate-100 focus:border-0 focus:ring-0" />
                            </div>
                        </div>
                        <div className=" mt-2 items-center flex flex-wrap gap-2 p-2 bg-slate-100 w-full dark:bg-slate-900">
                            {files.map((file, id) => (
                                file.type.startsWith("image/") ?
                                    <img key={id}
                                        onClick={() => setFilePreview(id)}
                                        className={`rounded-lg cursor-pointer object-cover border ${id === filePreview && "border border-orange-800"} w-12 h-12 `}
                                        src={file?.preview}
                                        alt={file?.name}
                                    />
                                    :
                                    <DocumentTextIcon onClick={() => setFilePreview(id)} key={id}
                                        className={`w-12 bg-slate-50 dark:bg-slate-800 rounded-lg ${id === filePreview && "border border-orange-800"} dark:fill-slate-100 dark:stroke-slate-800 h-12 cursor-pointer`} />))
                            }
                        </div>
                    </div>

                </div>
            }

            <div className="md:px-3 pointer-events-auto  px-2 pb-2 pt-1 bg-white dark:bg-slate-800">
                <form onSubmit={onSubmit}
                    className={`${files.length > 0 ? "bg-transparent" : "bg-gray-100 dark:bg-slate-700"} py-1 w-full  items-center  dark:text-slate-50 rounded-3xl px-4 flex gap-x-1`}>
                    <div className="w-[96%] flex items-center">
                        {!(files.length > 0) &&
                            <TextareaAutosize
                                style={{ height }}
                                onInput={handleOnInput}
                                type="text"
                                className=" max-h-40 resize-none custome-scroll-bar py-1 bg-transparent focus:outline-0 w-full  "
                                id="content"
                                readOnly={files.length > 0}
                                value={form.content}
                                placeholder={files.length > 0 ? "" : placeholder}
                                onChange={(e) => updateForm({ content: e.target.value, type: "text" })}
                            />
                        }
                    </div>

                    <input onChange={fileSelected} ref={fileRef} type="file" name="" id="" className=" hidden " />
                    {
                        !(form.content) &&
                        <IconButton onClick={selectFile} variant="text" title="Ajouter un fichier" >
                            <PaperClipIcon className=" w-6 h-6 fill-orange-600" />
                        </IconButton>

                    }
                    {(form.content || files.length > 0) &&
                        <IconButton variant="text" id="submit" type="submit" title="Envoyé">
                            <PaperAirplaneIcon className=" w-8 h-8 fill-orange-600 " />
                        </IconButton>


                    }
                </form>
            </div>

        </div>
    );
}
