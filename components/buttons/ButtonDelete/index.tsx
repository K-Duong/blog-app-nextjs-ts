"use client";

import { useState } from "react";
import { notFound, redirect } from "next/navigation";

import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";

import Modal from "@/components/modal";
import Button from "../ButtonWrapper";

import IconProvider from "@/components/IconProvider";
import { useBlogsList } from "@/components/context/blogsContext";

function ActionsModal({
  setIsOpenedModal,
  handleDelete,
}: {
  setIsOpenedModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
}) {
  return (
    <>
      <Button type="button" onClick={handleDelete}>
        <IconProvider>
          <MdOutlineDelete />
        </IconProvider>
        Delete{" "}
      </Button>
      <Button type="button" onClick={() => setIsOpenedModal(false)}>
        {" "}
        <IconProvider>
          <MdOutlineCancel /> 
        </IconProvider>
        Cancel{" "}
      </Button>
    </>
  );
}

export default function ButtonDeleteBlog({ blogId }: { blogId: number }) {

  const {blogsList, setBlogsList} = useBlogsList();

  const [isOpenedModal, setIsOpenedModal] = useState(false);

  const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpenedModal(true);
  };

  const handleDelete = async () => {
    // fetch to delete
    const result = await fetch(`/api/blogs/${blogId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ blogId }),
    });
    if (result.ok) {
      // close modal
      setIsOpenedModal(false);
      setBlogsList((prevBlogs) => {
        if (!prevBlogs) return null;
        return prevBlogs.filter(blog => blog.id !== blogId);
      });
      redirect('/blogs')
      
    } else {
      notFound();
    }
  };

  return (
    <>
      <Button type="button" onClick={handleOpenModal}>
        <MdOutlineDelete />
        Delete{" "}
      </Button>

      <Modal
        isOpen={isOpenedModal}
        setIsOpenedModal={setIsOpenedModal}
        actions={
          <ActionsModal
            setIsOpenedModal={setIsOpenedModal}
            handleDelete={handleDelete}
          />
        }
      >
        Do you really want to delete this blog?
      </Modal>
    </>
  );
}
