import PropTypes from "prop-types";

import Modal from "../../../Modal";
import { Button, Input, Spinner } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useUpdateUserMutation } from "../../../../slices/usersApiSlice";
import { setCredentials } from "../../../../slices/authSlice";
import { toast } from "react-toastify";

export function UpdateProfileInfo({ handleOpen, open, title = "Mettre à jour le profile", updateValue }) {
    const { userInfo } = useSelector((state) => state.auth);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();

    const [updateProfile, { isLoading }] = useUpdateUserMutation();

    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
    }, [userInfo.email, userInfo.name]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (updateValue === "password" && password !== confirmPassword) {
            toast.error('Les mots de passe ne correspondent pas');
        } else {
            try {
                const res = await updateProfile({
                    _id: userInfo._id,
                    name,
                    email,
                    password,
                }).unwrap();
                console.log(res);
                dispatch(setCredentials(res));
                handleOpen()
                toast.success('Mise à jour du profil réussie');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };
    return (
        <Modal handleOpen={handleOpen} open={open} title={title} >

            <form onSubmit={submitHandler}>
                {updateValue === "name"
                    ?
                    <Input type="text" className=" dark:text-slate-100" value={name} onChange={(e) => setName(e.target.value)} variant="static" color="blue" label="Nom" />
                    : updateValue === "email" ?
                        <Input type="email" className=" dark:text-slate-100" value={email} onChange={(e) => setEmail(e.target.value)} variant="static" color="blue" label="E-amil" />
                        :
                        <div className=" flex flex-col w-full gap-y-5">
                            <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className=" dark:text-slate-100" variant="static" color="blue" label="Nouveau Mot de passe" />
                            <Input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" className=" dark:text-slate-100" variant="static" color="blue" label="Confirmé Mot de passe" />
                        </div>
                }
                <div className=" flex justify-end mt-6">
                    <Button color='blue'
                        type='submit' className='flex gap-2 items-center'>
                        {isLoading ? "En cours..." : "Enrégistrer"}
                        {isLoading && <Spinner />}
                    </Button>

                </div>
            </form>
        </Modal>
    );
}

UpdateProfileInfo.propTypes = {
    handleOpen: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    title: PropTypes.string,
    updateValue: PropTypes.string,
}